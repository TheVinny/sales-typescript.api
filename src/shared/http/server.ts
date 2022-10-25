import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import ErrorMiddleware from '@modules/middlewares/ErrorMiddleware';
import '@shared/database';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(ErrorMiddleware);

app.listen(3333, () => {
  console.log('Server started 👨‍💻');
});
