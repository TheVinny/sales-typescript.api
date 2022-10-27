import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Costumer from './Costumer';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Costumer) //Muitas orders podem ter um cliente
  @JoinColumn({ name: 'costumer_id' }) //Coluna que faz referencia ao costumer
  customer: Costumer;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Order;
