import authRouter from '@modules/routes/AuthRoutes';
import costumersRouter from '@modules/routes/CostumerRoutes';
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
routes.use('/costumer', costumersRouter);

export default routes;
