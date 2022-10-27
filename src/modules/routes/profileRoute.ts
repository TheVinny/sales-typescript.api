import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddleware from '@modules/middlewares/AuthMiddleware';
import UsersController from '@modules/controllers/Users';

const profileRouter: Router = Router();

const midle = {
  update: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
};

profileRouter.use(AuthMiddleware);
profileRouter.get('/', new UsersController().showProfile);
profileRouter.put('/', midle.update, new UsersController().updateProfile);

export default profileRouter;
