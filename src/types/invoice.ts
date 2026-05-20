import { URL } from "url";
import { IBusiness } from "./business";
import { IClient } from "./client";
import { IProduct } from "./product";
import { IPayment } from "./payment";

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  OVERDUE = "OVERDUE",
}

export interface IInvoiceItem {
  id: string;
  invoiceId: string;
  productId: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  invoice?: IInvoice;
  product?: IProduct;
}

export interface IInvoice {
  id: string;
  businessId: string;
  clientId: string;
  createdById: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date | null;
  dueDays: number;
  dueDate: Date | null;
  totalItems: number;
  subtotal: number;
  tax: number | null;
  total: number;
  currency: string;
  notes: string | null;
  invPdfUrl: URL | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  business?: IBusiness;
  client?: IClient;
  items?: IInvoiceItem[];
  payments?: IPayment[];
}

export interface InvoiceStats {
  totalInvoices: number;
  draftedInvoices: number;
  totalRevenue: number;
  thisMonth: {
    earnings: number;
    paidCount: number;
  };
  outstanding: {
    amount: number;
    count: number;
  };
}

export interface GetAllInvoicesParams {
  page?: string;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: string;
  year?: string;
}

export interface IOverdueInvoice {
  client: { name: string };
  invoiceNumber: string;
  dueDate: string;
  total: number;
  formattedDueDate: string;
  daysAgo: number;
}

type TxnStatus = "SENT" | "FAILED" | "CANCELLED";

export interface IUpcomingOverdueInvoice {
  client: { name: string };
  invoiceNumber: string;
  status: TxnStatus;
  dueDate: string;
  total: number;
  formattedDueDate: string;
}
