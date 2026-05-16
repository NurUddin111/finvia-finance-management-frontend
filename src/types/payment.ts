import { IInvoice } from "./invoice";

export enum PaymentGateway {
  SSLCOMMERZ = "SSLCOMMERZ",
  STRRIPE = "STRRIPE",
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  ROCKET = "ROCKET",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  INITIATED = "INITIATED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  ONLINE = "ONLINE",
  CASH = "CASH",
}

export interface IPayment {
  id: string;
  invoiceId: string;
  method: PaymentMethod;
  provider: PaymentGateway | null;
  tran_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  rcpNumber: string | null;
  rcpPdfUrl: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  invoice?: IInvoice;
}
