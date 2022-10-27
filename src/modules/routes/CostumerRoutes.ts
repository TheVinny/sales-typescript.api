import { Router } from 'express';
import CostumersController from '@modules/controllers/Costumers';
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

const costumersRouter: Router = Router();

costumersRouter.use(AuthMiddleware);

costumersRouter.get('/', new CostumersController().getAll);

costumersRouter.get(
  '/:id',
  middlewares.getById,
  new CostumersController().getById,
);

costumersRouter.post('/', middlewares.create, new CostumersController().create);

costumersRouter.put(
  '/:id',
  middlewares.update,
  new CostumersController().updateById,
);

costumersRouter.delete(
  '/:id',
  middlewares.getById,
  new CostumersController().deleteById,
);

export default costumersRouter;
