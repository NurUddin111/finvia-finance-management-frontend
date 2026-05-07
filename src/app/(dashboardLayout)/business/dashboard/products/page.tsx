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
    <div className="p-7 min-h-screen space-y-6">
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
  );
};

export default ProductsPage;
