import { Router } from 'express'
import * as genreController from '../controllers/genre.controller'

const router: Router = Router()

// GET request for displaying all genre
router.get('', genreController.genreList)

// GET request for creating genre. NOTE This must come before route for id (i.e. display genre).
router.get('/create', genreController.genreCreateGet)

// GET request for displaying a specific page of a genre
router.get('/:id', genreController.genreDetail)

// POST request for creating genre.
router.post('/create', genreController.genreCreatePost)

// GET request to delete genre.
router.get('/:id/delete', genreController.genreDeleteGet)

// POST request to delete a genre. (Action after form submission)
router.post('/:id/delete', genreController.genreDeletePost); 

// POST request to update a genre
router.post('/:id/update', genreController.genreUpdate)

export default router;
