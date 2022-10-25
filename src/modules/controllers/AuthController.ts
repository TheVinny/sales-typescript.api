import UsersService from '@modules/services/Users';
import { Request, Response } from 'express';

export default class AuthController {
  public async createAuth(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const auth = await new UsersService().createAuth({ email, password });
    return res.json(auth);
  }
}
