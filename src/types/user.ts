import { IBusinessUser } from "./business";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  BUSINESS_OWNER = "BUSINESS_OWNER",
  BUSINESS_ADMIN = "BUSINESS_ADMIN",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Provider {
  google = "google",
  credentials = "credentials",
}

export interface IAuthProvider {
  id: string;
  provider: Provider;
  providerId: string;
  userId: string;
  createdAt: Date;

  // Relations
  user?: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isActive: IsActive;
  isDeleted: boolean;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  auths?: IAuthProvider[];
  businessUsers?: IBusinessUser[];
}
