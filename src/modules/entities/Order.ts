import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Costumer from './Customer';
import OrdersProduct from './OrdersProduct';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Costumer) //Muitas orders podem ter um cliente
  @JoinColumn({ name: 'customer_id' }) //Coluna que faz referencia ao costumer
  customer: Costumer;

  @OneToMany(() => OrdersProduct, ordersProduct => ordersProduct.order, {
    cascade: true,
  })
  order_products: OrdersProduct[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Order;
