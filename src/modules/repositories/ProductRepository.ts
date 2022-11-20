import { EntityRepository, In, Repository } from 'typeorm';

import Product from '../entities/Product';

interface IfindProducts {
  id: string;
}

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: [
        {
          name,
        },
      ],
    });
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: [
        {
          id,
        },
      ],
    });
    return product;
  }

  public async findAllById(products: IfindProducts[]): Promise<Product[]> {
    // procura produtos por product id em strings
    const productsId = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsId),
      },
    });

    return existsProducts;
  }
}
