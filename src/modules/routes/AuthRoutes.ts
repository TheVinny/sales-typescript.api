import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from '@modules/controllers/AuthController';

const authRouter: Router = Router();

const middleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

authRouter.post('/', middleware, new AuthController().createAuth);

export default authRouter;
