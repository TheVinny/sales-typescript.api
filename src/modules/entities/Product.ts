import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrdersProduct from './OrdersProduct';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrdersProduct, ordersProduct => ordersProduct.product)
  order_products: OrdersProduct[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Product;
