import { Employee } from './hrm.types';

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

export enum TransactionPaymentMethod {
  CASH = 'Cash',
  BANK = 'Bank',
}

export interface Transaction {
  id: string;
  code: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  payment_method: TransactionPaymentMethod;
  reference_code?: string;
  description?: string;
  performer_id?: string;
  performer?: Employee;
  created_at: Date;
}

export enum PartnerType {
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier',
}

export enum DebtType {
  RECEIVABLE = 'Receivable',
  PAYABLE = 'Payable',
}

export interface Debt {
  id: string;
  partner_type: PartnerType;
  partner_id: string; // Could be Customer ID or Supplier ID
  amount: number;
  type: DebtType;
  due_date?: Date;
  is_paid: boolean;
}
