export interface Product {
  id: string;
  businessId: string;
  name: string;
  totalSold: number;
  totalEarning: number;
  pendingOrder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStats {
  totalProducts: number;
  currentMonthProducts: number;
  totalEarning: number;
  topSellingProduct: { name: string; totalSold: number } | null;
  pendingOrders: number;
  pendingOrdersValue: number;
}
