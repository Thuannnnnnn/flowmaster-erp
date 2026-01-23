import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// Assuming employee reference
import { Employee } from '../../hrm/entities/employee.entity';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, nullable: true })
  code: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ type: 'uuid', nullable: true })
  manager_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @Column({ default: true })
  is_active: boolean;
}
