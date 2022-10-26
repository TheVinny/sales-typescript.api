import UsersService from '@modules/services/Users';
import { Request, Response } from 'express';

class UsersController {
  public async getAll(_req: Request, res: Response): Promise<Response> {
    const users = await new UsersService().getAll();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = await new UsersService().create({ name, email, password });

    return res.json(user);
  }

  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const user = await new UsersService().updateAvatar({
      user_id: id,
      avatarFile: req.file?.filename as string,
    });

    return res.json(user);
  }

  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await new UsersService().sendForgotPasswordEmail(email);

    return res.status(204).json();
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    await new UsersService().resetPassword(password, token);

    return res.status(204).json();
  }
}

export default UsersController;
