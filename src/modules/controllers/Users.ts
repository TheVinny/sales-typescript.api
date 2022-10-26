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
}

export default UsersController;
