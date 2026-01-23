import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Supplier } from './supplier.entity';
import { PoItem } from './po-item.entity'
import { Employee } from '../../hrm/entities/employee.entity';

export enum PurchaseOrderStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  RECEIVED = 'Received',
  CANCELLED = 'Cancelled',
}

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ type: 'int' })
  supplier_id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseOrders)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'uuid' })
  creator_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'creator_id' })
  creator: Employee;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  sub_total: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  tax_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'enum', enum: PurchaseOrderStatus, default: PurchaseOrderStatus.DRAFT })
  status: PurchaseOrderStatus;

  @Column({ type: 'date', nullable: true })
  expected_date: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => PoItem, (item) => item.purchaseOrder)
  items: PoItem[];
}
