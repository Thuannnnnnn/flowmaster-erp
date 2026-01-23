import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { Product } from '../../inventory/entities/product.entity';

@Entity('po_items')
export class PoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  po_id: string;

  @ManyToOne(() => PurchaseOrder, (po) => po.items)
  @JoinColumn({ name: 'po_id' })
  purchaseOrder: PurchaseOrder;

  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  received_qty: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unit_price: number;
}
