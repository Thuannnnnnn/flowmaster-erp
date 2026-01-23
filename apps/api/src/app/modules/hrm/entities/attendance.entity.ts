import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

export enum AttendanceStatus {
  LATE = 'Late',
  ON_TIME = 'OnTime',
  ABSENT = 'Absent',
}

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @ManyToOne(() => Employee, (employee) => employee.attendances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out: Date;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @Column({ length: 255, nullable: true })
  note: string;
}
