import { Router } from 'express';
import * as authorController from '../controllers/author.controller';

const router: Router = Router();

// GET request for displaying the list of all Authors.
router.get('/', authorController.authorList);

// GET request for creating Author. (Form display)
router.get('/create', authorController.authorCreateGet);

// GET request for displaying detail page for a specific Author.
router.get('/:id', authorController.authorDetail);

// POST request for creating Author. (Form submission)
router.post('/create', authorController.authorCreatePost);

// GET request to delete Author. (Form display)
router.get('/:id/delete', authorController.authorDeleteGet);

// POST request to delete Author. (Action after form submission)
router.post('/:id/delete', authorController.authorDeletePost); 

// POST request to update Author.
router.post('/:id/update', authorController.authorUpdate);

export default router;
