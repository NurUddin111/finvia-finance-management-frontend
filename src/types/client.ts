import { IBusiness } from "./business";
import { IInvoice } from "./invoice";

export type ClientStatus = "ACTIVE" | "INACTIVE";

export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  totalInvoices: number;
  totalSpent: number;
  status: ClientStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  links?: IBusinessClient[];
  invoices?: IInvoice[];
}

export interface IBusinessClient {
  id: string;
  businessId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;

  business?: IBusiness;
  client?: IClient;
}

export interface ClientsStats {
  totalClients: number;
  currentMonthClients: number;
  activeClients: number;
  activeClientPercentage: number;
  inactiveClients: number;
  neverBilledClients: number;
}
