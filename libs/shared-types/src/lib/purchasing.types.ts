import { Employee } from './hrm.types';
import { Product } from './inventory.types';

export interface Supplier {
  id: number;
  name: string;
  tax_code?: string;
  phone?: string;
  email?: string;
  address?: string;
  debt_amount: number;
}

export enum PurchaseOrderStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  RECEIVED = 'Received',
  CANCELLED = 'Cancelled',
}

export interface PurchaseOrder {
  id: string;
  code: string;
  supplier_id: number;
  supplier?: Supplier;
  creator_id: string;
  creator?: Employee;
  sub_total: number;
  tax_amount: number;
  total_amount: number;
  status: PurchaseOrderStatus;
  expected_date?: Date;
  note?: string;
  created_at: Date;
  items?: PoItem[];
}

export interface PoItem {
  id: string;
  po_id: string;
  purchaseOrder?: PurchaseOrder;
  product_id: string;
  product?: Product;
  quantity: number;
  received_qty: number;
  unit_price: number;
}
