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
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
        {/* Header */}
        <DemoProductsHeader />

        {/* Stats */}
        <ProductStatCards productStats={demoProductStats} />

        {/* Toolbar */}
        <DemoProductToolbar total={demoProducts.length} />

        {/* Table */}
        <DemoProductTable products={paginatedProducts} />

        {/* Pagination */}
        <DemoPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
