import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

const ErrorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default ErrorMiddleware;
