// src/app/(dashboardLayout)/demo/dashboard/products/page.tsx
"use client";

import { useState } from "react";
import ProductStatCards from "@/components/modules/Business/Product/ProductsStats";
import { demoProducts, demoProductStats } from "@/data/demodata";
import DemoProductsHeader from "@/components/modules/Demo/Products/DemoProductHeader";
import DemoProductToolbar from "@/components/modules/Demo/Products/DemoProductToolbar";
import DemoProductTable from "@/components/modules/Demo/Products/DemoProductsTable";
import DemoPagination from "@/components/modules/Demo/DemoPagination";

const PAGE_SIZE = 10;

export default function DemoProductsPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(demoProducts.length / PAGE_SIZE);
  const paginatedProducts = demoProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="p-7 min-h-screen space-y-6">
      <DemoProductsHeader />
      <ProductStatCards productStats={demoProductStats} />
      <DemoProductToolbar total={demoProducts.length} />
      <DemoProductTable products={paginatedProducts} />
      <DemoPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
