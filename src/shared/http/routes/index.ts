import authRouter from '@modules/routes/AuthRoutes';
import passwordRouter from '@modules/routes/passwordRouter';
import productsRouter from '@modules/routes/Products';
import usersRouter from '@modules/routes/Users';
import { Router } from 'express';

const routes: Router = Router();

routes.use('/password', passwordRouter);
routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);

export default routes;
