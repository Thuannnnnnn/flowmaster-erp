import { Employee } from './hrm.types';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number;
  parent?: Category;
  children?: Category[];
}

export interface Product {
  id: string;
  sku: string;
  barcode?: string;
  name: string;
  category_id?: number;
  category?: Category;
  cost_price: number;
  sell_price: number;
  min_stock_level: number;
  unit?: string;
  weight_kg?: number;
  is_active: boolean;
  created_at: Date;
  // Merged from Mongo ProductDetail if needed, or separate
  details?: ProductDetail;
}

export interface Warehouse {
  id: number;
  name: string;
  code?: string;
  address?: string;
  manager_id?: string;
  manager?: Employee;
  is_active: boolean;
}

export interface Stock {
  warehouse_id: number;
  warehouse?: Warehouse;
  product_id: string;
  product?: Product;
  quantity: number;
  reserved_qty: number;
  batch_code?: string;
  expiry_date?: Date;
  bin_location?: string;
}

export enum StockMovementType {
  IN = 'In',
  OUT = 'Out',
  ADJUSTMENT = 'Adjustment',
}

export enum ReferenceType {
  ORDER = 'Order',
  PO = 'PO',
  TRANSFER = 'Transfer',
}

export interface StockMovement {
  id: string;
  product_id: string;
  product?: Product;
  warehouse_id: number;
  warehouse?: Warehouse;
  qty_change: number;
  type: StockMovementType;
  reference_type?: ReferenceType;
  reference_id?: string;
  note?: string;
  created_at: Date;
}

export interface ProductDetail {
  product_id: string;
  brand?: string;
  attributes?: any;
  images?: string[];
  description_html?: string;
  seo_tags?: any;
}
