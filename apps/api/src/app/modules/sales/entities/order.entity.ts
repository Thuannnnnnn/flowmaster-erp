import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity'
import { Employee } from '../../hrm/entities/employee.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  BANK = 'Bank',
  COD = 'COD',
}

export enum PaymentStatus {
  UNPAID = 'Unpaid',
  PARTIAL = 'Partial',
  PAID = 'Paid',
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPING = 'Shipping',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'uuid', nullable: true })
  sales_staff_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'sales_staff_id' })
  sales_staff: Employee;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  sub_total: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discount_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  tax_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  shipping_fee: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'enum', enum: PaymentMethod, nullable: true })
  payment_method: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.UNPAID })
  payment_status: PaymentStatus;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  order_status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  shipping_address: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
