import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import ErrorMiddleware from '@modules/middlewares/ErrorMiddleware';
import '@shared/database';
import { errors } from 'celebrate';
import upload from '@config/upload';
import { pagination } from 'typeorm-pagination';
import SwaggerUI from 'swagger-ui-express';
import ratelimiter from '@modules/middlewares/rateLimiterMiddlerare';
import SwaggerJson from '../../swagger.json';

const app = express();

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerJson));

app.use(cors());

app.use(express.json());

app.use(ratelimiter);

app.use(pagination);

app.use(routes);

app.use('/images', express.static(upload.directory));

app.use(errors());

app.use(ErrorMiddleware);

app.listen(process.env.API_PORT || 3333, () => {
  console.log('Server started 👨‍💻', process.env.API_PORT);
});
