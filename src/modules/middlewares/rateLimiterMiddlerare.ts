import { Request, Response, NextFunction } from 'express';
import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

export default async function ratelimiter(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASS,
  });

  (async () => {
    redisClient.connect();
  })();

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 3, // Número de solicitações por duration
    duration: 1, // em segundos
  });

  try {
    await limiter.consume(req.ip);
    next();
  } catch (err) {
    console.log(err);
    throw new AppError('Too many requests', 429);
  }
}
