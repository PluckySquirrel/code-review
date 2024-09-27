import { Router } from 'express'
import * as bookInstanceController from '../controllers/bookinstance.controller'

const router: Router = Router()

// GET request for displaying all book instances
router.get('', bookInstanceController.bookInstanceList)

// GET request for creating Book instance. NOTE This must come before route for id (i.e. display Book instance).
router.get('/create', bookInstanceController.bookInstanceCreateGet)

// GET request for displaying a specific page of a book instance
router.get('/:id', bookInstanceController.bookInstanceDetail)

// POST request for creating Book instance.
router.post('/create', bookInstanceController.bookInstanceCreatePost)

// GET request to delete Book instance.
router.get('/:id/delete', bookInstanceController.bookInstanceDeleteGet)

// POST request to delete Book instance. (Action after form submission)
router.post('/:id/delete', bookInstanceController.bookInstanceDeletePost); 

// POST request to update a book instance
router.post('/:id/update', bookInstanceController.bookInstanceUpdate)

export default router;
