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
    <div className="min-h-screen rounded-2xl bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-5 lg:gap-6">
        {/* HEADER */}
        <DemoProductsHeader />

        {/* STATS */}
        <ProductStatCards productStats={demoProductStats} />

        {/* TOOLBAR */}
        <DemoProductToolbar total={demoProducts.length} />

        {/* TABLE */}
        <DemoProductTable products={paginatedProducts} />

        {/* PAGINATION */}
        <DemoPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
