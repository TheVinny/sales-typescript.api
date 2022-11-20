import Customer from '@modules/entities/Customer';
import Order from '@modules/entities/Order';
import { EntityRepository, Repository } from 'typeorm';

interface Iproduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IOrder {
  customer: Customer;
  products: Iproduct[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IOrder): Promise<Order> {
    const order = this.create({ customer, order_products: products });

    await this.save(order);

    return order;
  }
}
