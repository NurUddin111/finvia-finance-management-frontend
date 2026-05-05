"use server";

import ProductsHeader from "@/components/modules/Business/Product/ProductHeader";
import ProductStatCards from "@/components/modules/Business/Product/ProductsStats";
import ProductTable from "@/components/modules/Business/Product/ProductsTable";
import ProductToolbar from "@/components/modules/Business/Product/ProductToolbar";
import { getAllProducts } from "@/services/business/products/allProducts";
import { getProductsStats } from "@/services/business/products/productsStats";
import { Product, ProductStats } from "@/types/product";

const ClientsPage = async () => {
  const allProductsRes = await getAllProducts();
  const products = allProductsRes.data as Product[];
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
      <ProductTable
        products={products}
        // onEdit={(product) => openEditModal(product)}
        // onDelete={(product) => openDeleteDialog(product)}
      />
    </div>
  );
};

export default ClientsPage;
