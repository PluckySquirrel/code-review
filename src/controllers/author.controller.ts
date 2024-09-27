import { getAuthorList } from '../services/author.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'

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
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`)
})

// Handle Author create on GET.
export const authorCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Author create GET');
});

// Handle Author create on POST.
export const authorCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Author create POST');
});

// Handle Author delete on GET.
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author delete GET: ${req.params.id}`);
});

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author delete POST: ${req.params.id}`);
});

// Handle Author update on POST.
export const authorUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author update POST: ${req.params.id}`);
});
