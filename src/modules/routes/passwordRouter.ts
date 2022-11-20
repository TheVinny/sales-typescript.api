import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@modules/controllers/Users';

const passwordRouter: Router = Router();

const middleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

const resetMiddleware = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

passwordRouter.post(
  '/forgot',
  middleware,
  new UsersController().forgotPassword,
);

passwordRouter.post(
  '/reset',
  resetMiddleware,
  new UsersController().resetPassword,
);

export default passwordRouter;
