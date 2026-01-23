import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { Product } from './product.entity';

@Entity('stocks')
export class Stock {
  @PrimaryColumn({ type: 'int' })
  warehouse_id: number;

  @PrimaryColumn({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  reserved_qty: number;

  @Column({ length: 50, nullable: true })
  batch_code: string;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ length: 50, nullable: true })
  bin_location: string;
}
