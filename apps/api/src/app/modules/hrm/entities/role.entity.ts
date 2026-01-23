import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  permissions: any; // Using any for JSONB content, or define a specific interface

  @Column({ default: false })
  is_system: boolean;
}
