import { IBusiness } from "./business";
import { IInvoiceItem } from "./invoice";

export interface IProduct {
  id: string;
  businessId: string;
  name: string;
  totalSold: number;
  totalEarning: number;
  pendingOrder: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  business?: IBusiness;
  invoiceItems?: IInvoiceItem[];
}

export interface ITopProduct {
  name: string;
  totalSold: number;
}

export interface ProductStats {
  totalProducts: number;
  currentMonthProducts: number;
  totalEarning: number;
  topSellingProduct: { name: string; totalSold: number } | null;
  pendingOrders: number;
  pendingOrdersValue: number;
}

export interface GetAllProductsParams {
  page?: string;
  search?: string;
  sortBy?: string;
  order?: string;
}
