import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@modules/controllers/Users';

const passwordRouter: Router = Router();

const middleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

passwordRouter.post(
  '/forgot',
  middleware,
  new UsersController().forgotPassword,
);

export default passwordRouter;
