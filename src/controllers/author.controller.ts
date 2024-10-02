import { getAuthorList, getAuthorById, deleteAuthor, getAuthorByName, saveAuthor } from '../services/author.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator';
import { Author } from '../entity/author.entity';
import { validateAuthors } from '../util/validationFields';

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response) => {
    const authors = await getAuthorList();
    res.render('authors/index', { 
        authors, 
        title: i18next.t('author.list_title'),
        t: i18next.t.bind(i18next) 
    })
})

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("author_invalid_id")
            }
        })
    }
    const author = await getAuthorById(id);
    if (author === null) {
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("author_notfound")
            }
        })
    }
    res.render('authors/show', {
        author,
        books: author?.books
    })
})

// Handle Author create on GET.
export const authorCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.render('authors/form', {
        title: 'Create Author'
    })
});

// Handle Author create on POST.
export const authorCreatePost = [
    ...validateAuthors,
    asyncHandler(async (req: Request, res: Response) => {
        const errors = validationResult(req)
        const { firstName, familyName, dateOfBirth, dateOfDeath } = req.body;

        const author = new Author()
        author.firstName = firstName
        if (!author.firstName) {
            return res.render("./error", {
                error: {
                    status: 404,
                    message: i18next.t("author_notfound")
                }
            })
        }
        author.familyName = familyName
        author.dateOfBirth = dateOfBirth
        author.dateOfDeath = dateOfDeath

        if (!errors.isEmpty()) {
            res.render('authors/form', {
                title: 'Create Author',
                author: author,
                errors: errors.array()
            })
            return
        } else {
            const authorExists = await getAuthorByName(author.firstName, author.familyName)
            if (authorExists) {
                res.redirect(authorExists.getUrl) // Genre exists, redirect to its detail page
            } else {
                await saveAuthor(author)
                res.redirect(author.getUrl)// New genre saved. Redirect to the genre detail page
            }
        }
    })
]

// Handle Author delete on GET.
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    // get details of author and all their books
    const author = await getAuthorById(id)
    if (author === null) {
        res.redirect('/authors') // no results
    }
    const allBooksByAuthor = author?.books
    res.render('authors/author_delete', { title: 'Delete Author', author: author, authorBooks: allBooksByAuthor })
});

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    // get details of author and all their books
    const author = await getAuthorById(id)
    if (author === null) {
        res.redirect('/authors') // no results
    }
    const allBooksByAuthor = author?.books || []
    if (allBooksByAuthor.length > 0) {
        res.render('author_delete',{
            title: 'Delete Author',
            author: author,
            authorBooks: allBooksByAuthor
        })
        return
    } else {
        await deleteAuthor(id) // Author has no books. delete objects and redirect to the list of authors
        res.redirect('/authors');
    }
});

// Handle Author update on POST.
export const authorUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author update POST: ${req.params.id}`);
});
