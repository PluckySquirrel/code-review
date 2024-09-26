import { getListGenres } from '../services/genre.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'

// Display list of all genre.
export const genreList = asyncHandler(async (req: Request, res: Response) => {
    const genres = await getListGenres();
    res.render('genres/index', { 
        genres, 
        title: i18next.t('genres.list_title'),
        t: i18next.t.bind(i18next) 
    })
})

// Display detail page for a specific genre.
export const genreDetail = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre detail: ${req.params.id}`)
})

// Handle genre create on POST.
export const genreCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: genre create POST');
});

// Handle genre create on POST.
export const genreCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: genre create POST');
});

// Handle genre delete on GET.
export const genreDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre delete GET: ${req.params.id}`);
});

// Handle genre delete on POST.
export const genreDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre delete POST: ${req.params.id}`);
});

// Handle genre update on POST.
export const genreUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre update POST: ${req.params.id}`);
})
