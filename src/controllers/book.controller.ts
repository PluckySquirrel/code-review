import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import i18next from '../i18n';
import { getListBooks, getNumBooks } from '../services/book.service'
import { getNumBookinstances } from '../services/bookinstance.service';
import { getNumAuthors } from '../services/author.service'
import { getNumGenres } from '../services/genre.service';

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

export const index = asyncHandler(
    async (req: Request, res: Response) => {
        const [numBooks, { numBookInstances, availableBookInstances }, numAuthors, numGenres] = await Promise.all([
            getNumBooks(),
            getNumBookinstances(),
            getNumAuthors(),
            getNumGenres()
        ]);

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
