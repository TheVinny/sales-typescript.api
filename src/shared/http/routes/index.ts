import authRouter from '@modules/routes/AuthRoutes';
import productsRouter from '@modules/routes/Products';
import usersRouter from '@modules/routes/Users';
import { Router } from 'express';

const routes: Router = Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);

export default routes;
