import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

// Display list of all BookInstances.
export const bookInstanceList = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: BookInstance list')
})

// Display detail page for a specific BookInstance.
export const bookInstanceDetail = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
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
