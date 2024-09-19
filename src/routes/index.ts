import { Router, Request, Response } from 'express'

import Paths from '../common/Paths';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

/* GET home page. */
apiRouter.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'Express' });
    });


// **** Export default **** //

export default apiRouter;
