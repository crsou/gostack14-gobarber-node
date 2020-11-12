/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
/**
 * route to show a static directory
 */
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

/**
 * Middleware to handle errors:
 * Handling errors must be done after routes,
 * so the middle has to be placed after them.
 * make sure to install express-async-errors
 */
/**
 * this middleware requires four arguments
 * the 4th argument is 'next', but it isn't being used here
 * it's named '_' so eslint will ignore it (no-unused-vars rule)
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  /**
   * Verify if error is an instance of AppError
   * If it is, then it was generated in the app, which means it is a known error.
   */
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  /**
   * If it's not a known error, return a generic 500 error
   * it's an unexpected error - probably happened somewhere between node and the database
   */

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('The server is ready! o((>ω< ))o');
});
