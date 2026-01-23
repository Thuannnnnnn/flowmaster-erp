import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

export enum CustomerRank {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  tax_code: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ type: 'enum', enum: CustomerRank, default: CustomerRank.BRONZE })
  rank: CustomerRank;

  @Column({ type: 'int', default: 0 })
  loyalty_points: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  debt_amount: number;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
