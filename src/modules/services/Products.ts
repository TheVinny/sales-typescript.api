import Product from '@modules/entities/Product';
import ProductRepository from '@modules/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import redisCache from '@shared/cache/Redis';

interface IProducts {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

class ProductsService {
  public async create({ name, price, quantity }: IProducts): Promise<Product> {
    const repositoryProduct = getCustomRepository(ProductRepository);

    const hasProduct = await repositoryProduct.findByName(name);

    if (hasProduct) {
      throw new AppError('There is already a product with that name', 409);
    }

    const product = repositoryProduct.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-PRODUCT_LIST');

    await repositoryProduct.save(product);

    return product;
  }

  public async getAll(): Promise<Product[]> {
    const repositoryProduct = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>('api-PRODUCT_LIST');

    if (!products) {
      products = await repositoryProduct.find();
      await redisCache.save('api-PRODUCT_LIST', products);
    }

    return products;
  }

  public async getById(id: string): Promise<Product> {
    const repositoryProduct = getCustomRepository(ProductRepository);

    const product = await repositoryProduct.findById(id);

    if (!product) throw new AppError('Product not found', 404);
    return product;
  }

  public async updateById({
    id,
    name,
    price,
    quantity,
  }: IProducts): Promise<Product> {
    const repositoryProduct = getCustomRepository(ProductRepository);

    const product = await repositoryProduct.findById(id as string);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const hasProduct = await repositoryProduct.findByName(name);
    if (hasProduct && name !== product.name) {
      throw new AppError('There is already a product with that name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-PRODUCT_LIST');

    const productUpdated = await repositoryProduct.save(product);

    return productUpdated;
  }

  public async DeleteById(id: string) {
    const repositoryProduct = getCustomRepository(ProductRepository);

    const product = await repositoryProduct.findOne({
      where: [
        {
          id,
        },
      ],
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-PRODUCT_LIST');

    await repositoryProduct.remove(product);
  }
}

export default ProductsService;
