import OrderService from '@modules/services/Order';

import { Request, Response } from 'express';

class OrdersController {
  public async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const order = await new OrderService().showOrder(id);

    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const order = await new OrderService().create({
      customer_id,
      products,
    });

    return res.json(order);
  }
}

export default OrdersController;
