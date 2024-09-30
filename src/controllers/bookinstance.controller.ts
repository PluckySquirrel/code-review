import { getListBookInstances, getBookInstanceById } from '../services/bookinstance.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'
import { BookInstanceStatus } from '../constants';

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
    res.send('NOT IMPLEMENTED: BookInstance create GET');
})

// Handle BookInstance create on POST.
export const bookInstanceCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
});

// Handle BookInstance delete on GET.
export const bookInstanceDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: BookInstance delete GET: ${req.params.id}`);
});

// Handle BookInstance delete on POST.
export const bookInstanceDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: BookInstance delete POST: ${req.params.id}`);
});

// Handle BookInstance update on POST.
export const bookInstanceUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: BookInstance update POST: ${req.params.id}`);
});
