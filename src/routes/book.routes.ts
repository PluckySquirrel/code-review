import { Router } from 'express'
import * as bookController from '../controllers/book.controller'

const router: Router = Router()

// GET request for displaying all books
router.get('', bookController.bookList)

// GET request for creating book. NOTE This must come before route for id (i.e. display book).
router.get('/create', bookController.bookCreateGet)

// GET request for displaying a specific page of a book
router.get('/:id', bookController.bookDetail)

// POST request for creating Book.
router.post('/create', bookController.bookCreatePost)

// GET request to delete Book.
router.get('/:id/delete', bookController.bookDeleteGet)

// POST request to delete Author. (Action after form submission)
router.post('/:id/delete', bookController.bookDeletePost); 

// GET request to update Book
router.get('/:id/update', bookController.bookUpdateGet)

// POST request to update Book
router.post('/:id/update', bookController.bookUpdatePost)

export default router;
