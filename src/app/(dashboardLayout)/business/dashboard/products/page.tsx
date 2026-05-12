import ProductsHeader from "@/components/modules/Business/Product/ProductHeader";
import ProductStatCards from "@/components/modules/Business/Product/ProductsStats";
import ProductTable from "@/components/modules/Business/Product/ProductsTable";
import ProductToolbar from "@/components/modules/Business/Product/ProductToolbar";
import Pagination from "@/components/shared/Pagination";

import { getAllProducts } from "@/services/business/products/allProducts";
import { getProductsStats } from "@/services/business/products/productsStats";

import { Product, ProductStats } from "@/types/product";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  const [allProductsRes, productsStatsRes] = await Promise.all([
    getAllProducts({
      page: params.page,
      search: params.search,
      sortBy: params.sortBy,
      order: params.order,
    }),

    getProductsStats(),
  ]);

  const products = allProductsRes.data as Product[];

  const productsStats = productsStatsRes.data as ProductStats;

  const meta = allProductsRes.meta;

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
        {/* Header */}
        <ProductsHeader />

        {/* Stats */}
        <ProductStatCards productStats={productsStats} />

        {/* Toolbar */}
        <ProductToolbar total={meta?.total ?? 0} />

        {/* Table */}
        <ProductTable products={products} />

        {/* Pagination */}
        <Pagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          hasNextPage={meta?.hasNextPage ?? false}
          hasPrevPage={meta?.hasPrevPage ?? false}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
