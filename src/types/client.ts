import { IBusiness } from "./business";
import { IInvoice } from "./invoice";

export type ClientStatus = "ACTIVE" | "INACTIVE";

export type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export type MonthlyClientCount = Partial<Record<Month, number>>;

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
  formattedDate: string;

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

export interface GetAllClientsParams {
  page?: string;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: string;
}

export interface IClientsPieChartData {
  newClientsThisMonth: number;
  newClientsDiff: number;
  oldClientsThisMonth: number;
  oldClientsDiff: number;
  newClientsPercentage: number;
  oldClientsPercentage: number;
}

export interface ITopClient {
  name: string;
  totalSpent: number;
  totalInvoices: number;
  status: string;
}
