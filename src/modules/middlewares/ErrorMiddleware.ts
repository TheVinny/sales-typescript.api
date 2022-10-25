import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

const ErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  next();
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default ErrorMiddleware;
