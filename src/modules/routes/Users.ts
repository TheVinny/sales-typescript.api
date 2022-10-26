import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '@modules/controllers/Users';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AuthMiddleware from '@modules/middlewares/AuthMiddleware';

const usersRouter: Router = Router();
const upload = multer(uploadConfig);

const middleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

usersRouter.get('/', new UsersController().getAll);
usersRouter.post('/', middleware, new UsersController().create);
usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  new UsersController().updateAvatar,
);

export default usersRouter;
