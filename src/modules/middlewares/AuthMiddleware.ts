import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import path from 'path';

interface TokenPayload {
  id: string;
  iat?: number;
  exp?: string;
}

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new AppError('Token not found', 401);

  const absPath = path.resolve('./', 'jwt.auth.key').toString();

  const secret = readFileSync(absPath, 'utf-8').split('=')[1];

  try {
    const decode = verify(token, secret);

    const { id } = decode as TokenPayload;

    req.user = { id };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
