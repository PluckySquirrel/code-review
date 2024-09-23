import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

// Display list of all Books.
export const bookList = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Book list')
})

// Display detail page for a specific Book.
export const bookDetail = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})

// Handle Book create on GET.
export const bookCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Book create GET');
});

// Handle Book create on POST.
export const bookCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Book create POST');
});

// Handle Book delete on GET.
export const bookDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMEED: Book delete GET: ${req.params.id}`);
});

// Handle Book delete on POST.
export const bookDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Book delete POST: ${req.params.id}`);
});

// Handle Book update on POST.
export const bookUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Book update POST: ${req.params.id}`);
});
