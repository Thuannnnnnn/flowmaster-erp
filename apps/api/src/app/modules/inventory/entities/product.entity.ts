import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  sku: string;

  @Index()
  @Column({ length: 50, nullable: true })
  barcode: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int', nullable: true })
  category_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  cost_price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  sell_price: number;

  @Column({ type: 'int', default: 0 })
  min_stock_level: number;

  @Column({ length: 20, nullable: true })
  unit: string;

  @Column({ type: 'float', nullable: true })
  weight_kg: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
