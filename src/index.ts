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

import indexRouter from './routes/index';   // Assuming your index router is in the routes/index.js or routes/index.ts
import authorRouter from './routes/author.routes';
import bookRouter from './routes/book.routes';
import bookInstanceRouter from './routes/bookinstance.routes';
import genreRouter from './routes/genre.routes';

import { AppDataSource } from "./config/data-source"
import i18next from './i18n';
import i18nextMiddleware from 'i18next-http-middleware'; 

// **** Run **** //

const app = express();

// use middlewares
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use(express.static(path.join(__dirname, "public")));

app.use(i18nextMiddleware.handle(i18next));

app.use("/", indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/bookinstances', bookInstanceRouter);
app.use('/genres', genreRouter);

// Error handling example with http-errors
app.use((req, res, next) => {
  next(createError(404)); // Creates a 404 Not Found error if the route is not found
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(500) // err.status
  res.render('error')
  })

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../src/views'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.t = req.t; // This makes t available in views
  next();
});

// Error handling
app.use((req, res, next) => {
  next(createError(404));  // Handle 404 errors
});

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
