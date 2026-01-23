import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 20, nullable: true })
  tax_code: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  debt_amount: number;

  @OneToMany(() => PurchaseOrder, (po) => po.supplier)
  purchaseOrders: PurchaseOrder[];
}
