import { Employee } from './hrm.types';
import { Product } from './inventory.types';

export enum CustomerRank {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  tax_code?: string;
  address?: string;
  city?: string;
  rank: CustomerRank;
  loyalty_points: number;
  debt_amount: number;
}

export enum PaymentMethod {
  CASH = 'Cash',
  BANK = 'Bank',
  COD = 'COD',
}

export enum PaymentStatus {
  UNPAID = 'Unpaid',
  PARTIAL = 'Partial',
  PAID = 'Paid',
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPING = 'Shipping',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  code: string;
  customer_id: string;
  customer?: Customer;
  sales_staff_id?: string;
  sales_staff?: Employee;
  sub_total: number;
  discount_amount: number;
  tax_amount: number;
  shipping_fee: number;
  total_amount: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  shipping_address?: string;
  note?: string;
  created_at: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  order?: Order;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
}
