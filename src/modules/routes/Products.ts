import { Router } from 'express';
import ProductsController from '@modules/controllers/Products';
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
      name: Joi.string().required(),
      price: Joi.number().min(1).required(),
      quantity: Joi.number().required(),
    },
  }),
};

const productsRouter: Router = Router();

productsRouter.get('/', AuthMiddleware, new ProductsController().getAll);

productsRouter.get(
  '/:id',
  middlewares.getById,
  new ProductsController().getById,
);

productsRouter.post('/', middlewares.create, new ProductsController().create);

productsRouter.put(
  '/:id',
  middlewares.create,
  new ProductsController().updateById,
);

productsRouter.delete(
  '/:id',
  middlewares.getById,
  new ProductsController().deleteById,
);

export default productsRouter;
