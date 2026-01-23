import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
// Cross-module import. Note: Product will be created in Inventory module.
// Importing it even before it exists would cause error.
// I will just use ID for now or create a placeholder.
// The user request is to create "skeleton for ALL database". 
// I should rely on the fact that I will create Product later. 
// BUT, imports must exist for compilation. 
// I will assume I will create `Product` soon. 
// However, I can't import what doesn't exist yet in the filesystem during this single turn? 
// Actually I can, because I am writing all files. 
// But if I want to be safe, I should create the files in order or use forwardRef/strings if TypeORM supports it well without import (it doesn't, needs class usually).
// I will create a basic Product class first or just comment out the import/relation and create it properly.
// OR, I can create all empty entity files first then fill them.
// Let's rely on standard creation order. I'll create `Product` later, so importing it here `../../inventory/entities/product.entity` will work IF the file exists when TypeScript compiles/user runs. 
// I'll create the file path usage here.

import { Product } from '../../inventory/entities/product.entity'

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unit_price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;
}
