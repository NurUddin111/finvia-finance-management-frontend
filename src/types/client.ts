export type ClientStatus = "ACTIVE" | "INACTIVE";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: ClientStatus;
  totalInvoices: number;
  totalSpent: number;
  isDeleted: false;
  createdAt: Date;
  updatedAt: Date;
  formattedDate: string;
}

export interface ClientsStats {
  totalClients: number;
  currentMonthClients: number;
  activeClients: number;
  activeClientPercentage: number;
  inactiveClients: number;
  neverBilledClients: number;
}
