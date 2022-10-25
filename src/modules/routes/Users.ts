import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@modules/controllers/Users';

const usersRouter: Router = Router();

const middleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

usersRouter.get('/', new UsersController().getAll);
usersRouter.post('/', middleware, new UsersController().create);

export default usersRouter;
