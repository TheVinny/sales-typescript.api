import ProductsService from '@modules/services/Products';
import { Request, Response } from 'express';

class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const product = await new ProductsService().create({
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  public async updateById(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const product = await new ProductsService().updateById({
      name,
      price,
      quantity,
      id,
    });

    return res.json(product);
  }
  public async getAll(req: Request, res: Response): Promise<Response> {
    const products = await new ProductsService().getAll();

    return res.json(products);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const products = await new ProductsService().getById(id);

    return res.json(products);
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new ProductsService().DeleteById(id);

    return res.json([]);
  }
}

export default ProductsController;
