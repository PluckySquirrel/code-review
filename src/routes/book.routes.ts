import { Router } from 'express'
import * as bookController from '../controllers/book.controller'

const router: Router = Router()

// GET request for displaying all books
router.get('', bookController.bookList)

// GET request for displaying a specific page of a book
router.get('/:id', bookController.bookDetail)

// GET request for creating book. NOTE This must come before route for id (i.e. display book).
router.get('/create', bookController.bookCreateGet)

// POST request for creating Book.
router.post('/create', bookController.bookCreatePost)

// GET request to delete Book.
router.get('/:id/delete', bookController.bookDeleteGet)

// POST request to delete Author. (Action after form submission)
router.post('/:id/delete', bookController.bookDeletePost); 

// POST request to update Book
router.post('/:id/update', bookController.bookUpdate)

export default router;
