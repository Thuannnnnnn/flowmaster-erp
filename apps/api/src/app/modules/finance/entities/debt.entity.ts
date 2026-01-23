import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PartnerType {
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier',
}

export enum DebtType {
  RECEIVABLE = 'Receivable',
  PAYABLE = 'Payable',
}

@Entity('debts')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PartnerType })
  partner_type: PartnerType;

  @Column({ type: 'uuid' })
  partner_id: string;

  // Polymorphic relationship handling in TypeORM isn't straightforward with just decorators.
  // Usually we store ID and Type, and fetch manually or use Single Table Inheritance if they share a base class.
  // Here they are distinct entities (Customer, Supplier).
  // So we just store partner_id and partner_type.

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: DebtType })
  type: DebtType;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column({ default: false })
  is_paid: boolean;
}
