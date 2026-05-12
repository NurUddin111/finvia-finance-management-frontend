import { URL } from "url";

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface Invoice {
  id: string;
  businessId: string;
  clientId: string;
  createdById: string;
  invoiceNumber: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED" | "FAILED";
  issueDate: string;
  dueDays: number;
  dueDate: string;
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  notes: string | null;
  invPdfUrl: URL;
  paymentToken: string | null;
  createdAt: string;
  updatedAt: string;
  client: {
    email: string;
    name: string;
  };
  items: InvoiceItem[];
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
