import CostumersService from '@modules/services/Costumers';
import { Request, Response } from 'express';

class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const costumer = await new CostumersService().create({
      name,
      email,
    });

    return res.json(costumer);
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const costumer = await new CostumersService().updateCostumer({
      name,
      email,
      id,
    });

    return res.json(costumer);
  }
  public async getAll(_req: Request, res: Response): Promise<Response> {
    const costumer = await new CostumersService().List();

    return res.json(costumer);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const products = await new CostumersService().getOne(id);

    return res.json(products);
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new CostumersService().deleteCostumer(id);

    return res.status(204).json([]);
  }
}

export default ProductsController;
