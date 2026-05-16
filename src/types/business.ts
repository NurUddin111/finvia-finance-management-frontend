import { IClient } from "./client";
import { IInvoice } from "./invoice";
import { IProduct } from "./product";
import { IUser } from "./user";

export enum BusinessCategory {
  AGENCY = "AGENCY",
  ECOMMERCE = "ECOMMERCE",
  RESTAURANT = "RESTAURANT",
  FREELANCER = "FREELANCER",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
  RETAIL = "RETAIL",
  SOFTWARE_COMPANY = "SOFTWARE_COMPANY",
  EDUCATION = "EDUCATION",
  HEALTHCARE = "HEALTHCARE",
  REAL_ESTATE = "REAL_ESTATE",
  OTHER = "OTHER",
}

export enum BusinessRole {
  BUSINESS_OWNER = "BUSINESS_OWNER",
  BUSINESS_ADMIN = "BUSINESS_ADMIN",
}

export enum MemberStatus {
  INVITED = "INVITED",
  ACTIVE = "ACTIVE",
  REMOVED = "REMOVED",
}

export interface IBusiness {
  id: string;
  name: string;
  category: BusinessCategory;
  email: string | null;
  phone: string | null;
  address: string | null;
  website: string | null;
  logoUrl: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  members?: IBusinessUser[];
  businessClients?: IBusinessClient[];
  invoices?: IInvoice[];
  products?: IProduct[];
}

export interface IBusinessUser {
  id: string;
  userId: string;
  businessId: string;
  role: BusinessRole;
  status: MemberStatus;
  createdAt: Date;

  user?: IUser;
  business?: IBusiness;
}

export interface IBusinessClient {
  id: string;
  businessId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  business?: IBusiness;
  client?: IClient;
}
