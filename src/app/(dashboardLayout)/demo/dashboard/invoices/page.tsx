// src/app/(dashboardLayout)/demo/dashboard/invoices/page.tsx
"use client";

import { useState } from "react";
import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";
import DemoInvoicesTable from "@/components/modules/Demo/Invoices/DemoInvoicesTable";
import { demoInvoices, demoInvoiceStats } from "@/data/demodata";
import DemoInvoicesHeader from "@/components/modules/Demo/Invoices/DemoInvoiceHeader";
import DemoInvoicesFilters from "@/components/modules/Demo/Invoices/DemoInvoiceFilters";
import DemoPagination from "@/components/modules/Demo/DemoPagination";

const PAGE_SIZE = 10;

export default function DemoInvoicePage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(demoInvoices.length / PAGE_SIZE);
  const paginatedInvoices = demoInvoices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <DemoInvoicesHeader />
      <InvoicesStats invoiceStats={demoInvoiceStats} />
      <DemoInvoicesFilters
        total={demoInvoices.length}
        availableYears={[2026]}
      />
      <DemoInvoicesTable invoices={paginatedInvoices} />
      <DemoPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
