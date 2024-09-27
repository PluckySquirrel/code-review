import { Router } from 'express'
import { index } from '../controllers/book.controller'
import i18next from 'i18next';
import i18nextMiddleware from "i18next-http-middleware"
import setLocaleMiddleware from '../middlewares/setLocaleMiddleware';

// **** Variables **** //
const router = Router();

/* GET home page. */
router.use(i18nextMiddleware.handle(i18next))

router.use(setLocaleMiddleware);

router.get('/', index);

// **** Export default **** //
export default router;
