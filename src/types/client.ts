export type ClientStatus = "active" | "inactive";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalInvoices: number;
  totalSpent: number;
  isDeleted: false;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessClient {
  id: string;
  businessId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalInvoices: number;
    totalSpent: number;
    isDeleted: false;
    createdAt: Date;
    updatedAt: Date;
  };
  formattedDate: string;
}
