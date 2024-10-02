import { getListBookInstances, getBookInstanceById, saveBookInstance, deleteBookInstance } from '../services/bookinstance.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import { BookInstanceStatus } from '../constants';
import { BookInstance } from '../entity/bookinstance.entity';
import { getListBooks } from '../services/book.service';
import { validateBookInstances } from '../util/validationFields';

// Display list of all BookInstances.
export const bookInstanceList = asyncHandler(async (req: Request, res: Response) => {
    const bookinstances = await getListBookInstances();
    res.render('bookinstances/index', { 
        bookinstances, 
        title: i18next.t('bookinstances.list_title'),
        t: i18next.t.bind(i18next),
        BookInstanceStatus
    })
})

// Display detail page for a specific BookInstance.
export const bookInstanceDetail = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("bookinstance_invalid_id")
            }
        })
    }
    const bookInstance = await getBookInstanceById(id);
    if (bookInstance === null) {
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("bookinstance_notfound")
            }
        })
    }
    res.render('bookinstances/show', {
        bookInstance,
        book: bookInstance?.book
    })
})

// Handle BookInstance create on GET.
export const bookInstanceCreateGet = asyncHandler(async (req: Request, res: Response) => {
    const books = await getListBooks()
    const statuses = BookInstanceStatus
    res.render('bookinstances/form', { title: 'Create new book instance', books, statuses})
})

// Handle BookInstance create on POST.
export const bookInstanceCreatePost = [
    ...validateBookInstances,
    asyncHandler(async (req: Request, res: Response) => {    
        const errors = validationResult(req)

        const { book, imprint, date_available, status } = req.body

        const bookInstance = new BookInstance()
        bookInstance.imprint = imprint
        bookInstance.due_back = date_available
        bookInstance.status = status
        bookInstance.book = book
        
        if (!errors.isEmpty()) {
            const allBooks = getListBooks()
            const statuses = BookInstanceStatus
            res.render('bookinstances/form', {
                title: 'Create new book instance',
                bookInstance: bookInstance,
                book: allBooks,
                status: statuses,
                errors: errors.array()
            })
            return 
        } else { 
            await saveBookInstance(bookInstance)
            res.redirect(bookInstance.getUrl)
        }
    })
]

// Handle BookInstance delete on GET.
export const bookInstanceDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const bookInstance = await getBookInstanceById(id)
    if (bookInstance === null) {
        res.redirect('/bookinstances') // no results
    }
    res.render('bookinstances/delete', { title: 'Delete Book Instance', bookInstance: bookInstance })
});

// Handle BookInstance delete on POST.
export const bookInstanceDeletePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const bookinstance = await getBookInstanceById(id)
    if (bookinstance === null) {
        res.redirect('/bookinstances') // no results
    }
    await deleteBookInstance(id)
    res.redirect('/bookinstances')
});

// Handle BookInstance update on POST.
export const bookInstanceUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: BookInstance update POST: ${req.params.id}`);
});
