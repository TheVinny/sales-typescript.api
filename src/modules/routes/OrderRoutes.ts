import { Router } from 'express';
import OrdersController from '@modules/controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddleware from '@modules/middlewares/AuthMiddleware';

const middlewares = {
  getById: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  create: celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
};

const ordersRouter: Router = Router();

ordersRouter.use(AuthMiddleware);

ordersRouter.get('/:id', middlewares.getById, new OrdersController().getOne);

ordersRouter.post('/', middlewares.create, new OrdersController().create);

export default ordersRouter;
