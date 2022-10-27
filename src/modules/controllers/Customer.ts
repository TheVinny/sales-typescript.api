import CustumersService from '@modules/services/Customer';
import { Request, Response } from 'express';

class CustomerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const costumer = await new CustumersService().create({
      name,
      email,
    });

    return res.json(costumer);
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const costumer = await new CustumersService().updateCustomer({
      name,
      email,
      id,
    });

    return res.json(costumer);
  }
  public async getAll(_req: Request, res: Response): Promise<Response> {
    const costumer = await new CustumersService().List();

    return res.json(costumer);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const products = await new CustumersService().getOne(id);

    return res.json(products);
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new CustumersService().deleteCustomer(id);

    return res.status(204).json([]);
  }
}

export default CustomerController;
