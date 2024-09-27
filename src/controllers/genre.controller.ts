import { getListGenres, getGenreById, getGenreByName, saveGenre, deleteGenre } from '../services/genre.service'
import { Request, Response } from 'express'
import i18next from '../i18n';
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import { Genre } from '../entity/genre.entity'
import { validateGenres } from '../util/validationFields';

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
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("genre_invalid_id")
            }
        })
    }
    const genre = await getGenreById(id);
    if (genre === null) {
        return res.render("./error", {
            error: {
                status: 404,
                message: i18next.t("genre_notfound")
            }
        })
    }
    res.render('genres/show', {
        genre,
        books: genre?.books
    })
})

// Handle genre create on POST.
export const genreCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.render('genres/form', { title: 'Create new genre' })
});

// Handle genre create on POST.
export const genreCreatePost = [
    ...validateGenres,
    asyncHandler(async (req: Request, res: Response) => {    
        const errors = validationResult(req)

        const genre = new Genre()
        genre.name = req.body.name
        // to be continued

        if (!errors.isEmpty()) {
            // There are errors, Render the form again with sanitized values/error messages.
            res.render('genres/form', {
                title: 'Create new genre',
                genre: genre,
                errors: errors.array()
            })
            return 
        } else { // Data from form is valid 
            // Check if genre with the same name already exists.
            const genreExists = await getGenreByName(req.body.name)
            if (genreExists) {
                res.redirect(genreExists.getUrl) // Genre exists, redirect to its detail page
            } else {
                await saveGenre(genre)
                res.redirect(genre.getUrl)// New genre saved. Redirect to the genre detail page
            }
        }
    })
]

// Handle genre delete on GET.
export const genreDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const genre = await getGenreById(id)
    if (genre === null) {
        res.redirect('/genres') // no results
    }
    res.render('genres/delete', { title: 'Delete Genre', genre: genre })
});

// Handle genre delete on POST.
export const genreDeletePost = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        // log 404
    }
    const genre = await getGenreById(id)
    if (genre === null) {
        res.redirect('/genres') // no results
    }
    await deleteGenre(id)
    res.redirect('/genres')
});

// Handle genre update on POST.
export const genreUpdate = asyncHandler(async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre update POST: ${req.params.id}`);
})
