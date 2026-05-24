"use client";

import { useState } from "react";

import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";

import DemoInvoicesTable from "@/components/modules/Demo/Invoices/DemoInvoicesTable";
import DemoInvoicesHeader from "@/components/modules/Demo/Invoices/DemoInvoiceHeader";
import DemoInvoicesFilters from "@/components/modules/Demo/Invoices/DemoInvoiceFilters";

import DemoPagination from "@/components/modules/Demo/DemoPagination";

import { demoInvoices, demoInvoiceStats } from "@/data/demodata";

const PAGE_SIZE = 10;

export default function DemoInvoicePage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(demoInvoices.length / PAGE_SIZE);

  const paginatedInvoices = demoInvoices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 sm:gap-6">
        {/* HEADER */}
        <DemoInvoicesHeader />

        {/* STATS */}
        <InvoicesStats invoiceStats={demoInvoiceStats} />

        {/* FILTERS */}
        <DemoInvoicesFilters
          total={demoInvoices.length}
          availableYears={[2026]}
        />

        {/* TABLE */}
        <DemoInvoicesTable invoices={paginatedInvoices} />

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
