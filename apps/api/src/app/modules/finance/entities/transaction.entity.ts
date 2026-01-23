import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Employee } from '../../hrm/entities/employee.entity';

export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export enum TransactionCategory {
  SALE = 'Sale',
  PURCHASE = 'Purchase',
  SALARY = 'Salary',
  OPERATING = 'Operating',
}

export enum PaymentMethod {
  CASH = 'Cash',
  BANK = 'Bank',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  code: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'enum', enum: TransactionCategory })
  category: TransactionCategory;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @Column({ length: 50, nullable: true })
  reference_code: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  performer_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'performer_id' })
  performer: Employee;

  @CreateDateColumn()
  created_at: Date;
}
