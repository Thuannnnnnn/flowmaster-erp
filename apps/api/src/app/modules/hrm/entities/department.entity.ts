import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  manager_id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
