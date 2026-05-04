"use server";

import ProductsHeader from "@/components/modules/Business/Product/ProductHeader";
import ProductStatCards from "@/components/modules/Business/Product/ProductsStats";
import ProductToolbar from "@/components/modules/Business/Product/ProductToolbar";
import { getProductsStats } from "@/services/business/products/productsStats";
import { ProductStats } from "@/types/product";

const ClientsPage = async () => {
  const productsStatsRes = await getProductsStats();
  const productsStats = productsStatsRes.data as ProductStats;
  return (
    <div className="p-7 min-h-screen space-y-6">
      {/* Page header */}
      <ProductsHeader />

      {/* Stat summary cards */}
      <ProductStatCards productStats={productsStats} />

      {/* Search + filter toolbar */}
      <ProductToolbar />

      {/* Main table */}
    </div>
  );
};

export default ClientsPage;
