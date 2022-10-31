import authRouter from '@modules/routes/AuthRoutes';
import customersRouter from '@modules/routes/CostumerRoutes';
import ordersRouter from '@modules/routes/OrderRoutes';
import passwordRouter from '@modules/routes/passwordRouter';
import productsRouter from '@modules/routes/Products';
import profileRouter from '@modules/routes/profileRoute';
import usersRouter from '@modules/routes/Users';
import { Router } from 'express';

const routes: Router = Router();

routes.use('/password', passwordRouter);
routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customersRouter);
routes.use('/order', ordersRouter);

export default routes;
