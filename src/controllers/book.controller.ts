import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import i18next from '../i18n';
import { body, validationResult } from 'express-validator';
import { 
    getBookById, 
    getListBooks, 
    getNumBooks, 
    saveBook, 
    getBookByName,
    deleteBook } from '../services/book.service'
import { getNumBookinstances } from '../services/bookinstance.service';
import { getAuthorById, getAuthorList, getNumAuthors } from '../services/author.service'
import { getGenresByIds, getListGenres, getNumGenres } from '../services/genre.service';
import { Book } from '../entity/book.entity';
import { validateBooks } from '../util/validationFields';

// Display list of all Books.
export const bookList = asyncHandler(async (req: Request, res: Response) => {
    const books = await getListBooks();
    res.render('books/index', { 
        books, 
        title: i18next.t('books.list_title'),
        t: i18next.t.bind(i18next) 
    })
})

// Display detail page for a specific Book.
export const bookDetail = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("book_invalid_id")
            }
        })
    }
    const book = await getBookById(id);
    if (book === null) {
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("book_notfound")
            }
        })
    }
    res.render('books/show', {
        book,
        bookInstances: book?.bookinstances,
        bookGenres: book?.genres,
        bookInstanceStatuses: book?.bookinstances,
    })
})

// Handle Book create on GET.
export const bookCreateGet = asyncHandler(async (req: Request, res: Response) => {
    const authors = await getAuthorList()
    const genres = await getListGenres()
    res.render('books/form', { 
        title: 'Create Book',
        authors,
        genres })
});

// Handle Book create on POST.
export const bookCreatePost = [
    ...validateBooks,
    asyncHandler(async (req: Request, res: Response) => {    
        const errors = validationResult(req)

        const { title, author, summary, isbn, genre } = req.body;

        const genreArray = Array.isArray(genre) ? genre : typeof genre === 'undefined' ? [] : [genre];

        const book = new Book()
        book.title = title;
        book.summary = summary;
        book.isbn = isbn;

        const bookAuthor = await getAuthorById(parseInt(author))
        if (bookAuthor === null) {
            return res.render("./error", {
                error: {
                    status: 404,
                    message: i18next.t("book_notfound")
                }
            })
        }
        book.author = bookAuthor;
        
        book.genres = await getGenresByIds(genreArray)

        if (!errors.isEmpty()) {
            const allAuthors = getAuthorList()
            const allGenres = getListGenres()

            res.render('books/form', {
                title: 'Create Book', // i18n this later
                authors: allAuthors,
                genres: allGenres,
                book,
                errors: errors.array()
            })
            return 
        } else {
            const bookExists = await getBookByName(req.body.title)
            if (bookExists) {
                res.redirect(bookExists.getUrl) // Genre exists, redirect to its detail page
            } else {
                await saveBook(book)
                res.redirect(book.getUrl)// New genre saved. Redirect to the genre detail page
            }
        }
    })
]

// Handle Book delete on GET.
export const bookDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const book = await getBookById(id)
    if (book === null) {
        res.redirect('/books') // no results
    }
    const allBookInstances = book?.bookinstances
    res.render('books/delete', { title: 'Delete Book', book: book, bookInstances: allBookInstances })

});

// Handle Book delete on POST.
export const bookDeletePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const book = await getBookById(id)
    if (book === null) {
        res.redirect('/books') // no results
    }
    const allBookInstances = book?.bookinstances || []
    if (allBookInstances.length > 0) {
        res.render('delete',{
            title: 'Delete Book',
            book: book,
            bookInstances: allBookInstances
        })
        return
    } else {
        await deleteBook(id) 
        res.redirect('/authors');
    }
});

// Handle Book update on GET.
export const bookUpdateGet = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        // log 404 Invalid book ID param
    }
    const [book, allAuthors, allGenres] = await Promise.all([
        getBookById(id),
        getAuthorList(),
        getListGenres()
    ])

    res.render('form', { title: 'Update Book', authors: allAuthors, genres: allGenres, book: book })
});

// Handle Book update on POST.
export const bookUpdatePost = [
    (req: Request, res: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.genre)) { 
            req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre]
            next()
        }
    },
    // Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author' , 'Author must not be empty.' ).trim().isLength ({ min: 1 }).escape(),
    body('summary' , 'Summary must not be empty.' ).trim().isLength ({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty' ).trim().isLength ({ min: 1 }).escape(),
    body('genre.*' ).escape(),
    asyncHandler (async (req: Request, res: Response ) => {
        // Extract the validation errors from a request.
        const id = parseInt (req.params.id)
        const errors = validationResult (req)
        // ... Handle book record not found. Do the same with detail method
        // Handle create new Book object and assign attribute value
        // Handle create new Book object and assign attribute value
        const book = new Book()
        book.id = id
        book.title = req.body.title
        book.author = req.body.author
        book.summary = req.body.summary
        book.isbn = req.body.isbn
        
        // Handle find updating book genres
        book.genres = await getGenresByIds(req.body.genre)
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // Get all authors and genres for form
            const [allAuthors, allGenres] = await Promise.all([getAuthorList, getListGenres])

            res.render('books/form', {
                title: 'Update Book',
                authors: allAuthors,
                genres: allGenres,
                book: book,
                errors: errors.array()
            })
            return
        }
        // Data from form is valid. Update the record and relations corresponding
        const updatedBook = await saveBook(book)
        // Redirect to book detail page.
        res.redirect(updatedBook.getUrl)
    })
]

export const index = asyncHandler(
    async (req: Request, res: Response) => {
        const numBooks = await getNumBooks();
        const { numBookInstances, availableBookInstances } = await getNumBookinstances();
        const numAuthors = await getNumAuthors();
        const numGenres = await getNumGenres();

        res.render('index', {
            title: i18next.t('home.welcome'),
            t: i18next.t.bind(i18next),
            book_count: numBooks || 0,
            book_instance_count: numBookInstances || 0,
            book_instance_available_count: availableBookInstances || 0, // count available bookInstance
            author_count: numAuthors || 0,
            genre_count: numGenres || 0
        })
    }
)
