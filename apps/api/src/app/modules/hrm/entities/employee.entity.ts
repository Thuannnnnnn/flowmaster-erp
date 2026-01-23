import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Department } from './department.entity';
import { User } from './user.entity'
import { Attendance } from './attendance.entity';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  department_id: number;

  @ManyToOne(() => Department, (dept) => dept.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  hire_date: Date;

  @Column({ length: 50, nullable: true })
  bank_account: string;

  @Column({ length: 100, nullable: true })
  bank_name: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  base_salary: number;

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances: Attendance[];
}
