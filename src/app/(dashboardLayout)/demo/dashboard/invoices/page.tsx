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
    <div className="min-h-screen bg-[#050816] rounded-2xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-6">
        {/* Header */}
        <DemoInvoicesHeader />

        {/* Stats */}
        <InvoicesStats invoiceStats={demoInvoiceStats} />

        {/* Filters */}
        <DemoInvoicesFilters
          total={demoInvoices.length}
          availableYears={[2026]}
        />

        {/* Table */}
        <DemoInvoicesTable invoices={paginatedInvoices} />

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
