import { Router } from 'express';
import CustomersController from '@modules/controllers/Customer';
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
      email: Joi.string().email().required(),
    },
  }),
  update: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
};

const customersRouter: Router = Router();

customersRouter.use(AuthMiddleware);

customersRouter.get('/', new CustomersController().getAll);

customersRouter.get(
  '/:id',
  middlewares.getById,
  new CustomersController().getById,
);

customersRouter.post('/', middlewares.create, new CustomersController().create);

customersRouter.put(
  '/:id',
  middlewares.update,
  new CustomersController().updateById,
);

customersRouter.delete(
  '/:id',
  middlewares.getById,
  new CustomersController().deleteById,
);

export default customersRouter;
