// import './pre-start'; // Must be the first import
// import logger from 'jet-logger';

// import EnvVars from '@src/common/EnvVars';
// import server from './server';

import 'reflect-metadata';

import express from "express"
import { Request, Response, NextFunction } from 'express';
import http from 'http'

import createError from 'http-errors';  // Properly import http-errors
import morgan from 'morgan';            // Properly import morgan
import cookieParser from 'cookie-parser'; // Properly import cookie-parser
import path from 'path'

//import indexRouter from './routes/index';   // Assuming your index router is in the routes/index.js or routes/index.ts
import tutorial from "./routes/tutorial";

import { AppDataSource } from "./config/data-source"


// **** Run **** //

const app = express();

// use middlewares
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
app.use('/tutorial', tutorial);

// Error handling example with http-errors
app.use((req, res, next) => {
  next(createError(404));               // Creates a 404 Not Found error if the route is not found
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(500) // err.status
  res.render('error')
  })

//

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//

const server = http.createServer(app);

server.listen(Number(process.env.PORT) || 3000, () => {
  console.log('Server is running on port', process.env.PORT || 3000);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Datasource has been initialized')
  })
  .catch((err) => {
    console.error('Error during Datasource initialization: ', err)
  })

/*
const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG)); 
*/
