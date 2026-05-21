import ProductsHeader from "@/components/modules/Business/Product/ProductHeader";

import ProductStatCards from "@/components/modules/Business/Product/ProductsStats";

import ProductTable from "@/components/modules/Business/Product/ProductsTable";

import ProductToolbar from "@/components/modules/Business/Product/ProductToolbar";

import Pagination from "@/components/shared/Pagination";

import {
  getAllProducts,
  getProductsStats,
} from "@/services/business/product.services";

import { IProduct, ProductStats } from "@/types/product";

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

  const products: IProduct[] = allProductsRes.data ?? [];

  const productsStats: ProductStats | null = productsStatsRes.data ?? null;

  const meta = allProductsRes.meta;

  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-450 flex-col gap-5 lg:gap-6">
        <ProductsHeader />

        <ProductStatCards productStats={productsStats} />

        <ProductToolbar total={meta?.total ?? 0} />

        <ProductTable products={products} />

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
