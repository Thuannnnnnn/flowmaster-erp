import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

export enum StockMovementType {
  IN = 'In',
  OUT = 'Out',
  ADJUSTMENT = 'Adjustment',
}

export enum ReferenceType {
  ORDER = 'Order',
  PO = 'PO',
  TRANSFER = 'Transfer',
}

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  warehouse_id: number;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @Column({ type: 'int' })
  qty_change: number;

  @Column({ type: 'enum', enum: StockMovementType })
  type: StockMovementType;

  @Column({ type: 'enum', enum: ReferenceType, nullable: true })
  reference_type: ReferenceType;

  @Column({ type: 'uuid', nullable: true })
  reference_id: string;

  @Column({ length: 255, nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;
}
