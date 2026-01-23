import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Index()
  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ type: 'int', nullable: true })
  parent_id: number;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
