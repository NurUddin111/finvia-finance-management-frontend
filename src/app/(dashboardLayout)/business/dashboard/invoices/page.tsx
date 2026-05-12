import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";
import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";

import Pagination from "@/components/shared/Pagination";

import { getAllInvoices } from "@/services/business/invoices/getAllInvoices";
import { getInvoiceStats } from "@/services/business/invoices/inoiceStats";
import { updateInvStatus } from "@/services/business/invoices/updateStatus";

import { Invoice, InvoiceStats } from "@/types/invoice";

const InvoicePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  // Run all requests together
  const [invoiceStatsRes, allInvoicesRes] = await Promise.all([
    getInvoiceStats(),

    getAllInvoices({
      page: params.page,
      search: params.search,
      status: params.status,
      sortBy: params.sortBy,
      order: params.order,
      year: params.year,
    }),

    updateInvStatus(),
  ]);

  const invoiceStats = invoiceStatsRes.data as InvoiceStats;

  const allInvoices = allInvoicesRes.data as Invoice[];

  const meta = allInvoicesRes.meta;

  return (
    <div className="min-h-screen bg-[#050816] rounded-2xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-6">
        {/* Header */}
        <InvoicesHeader />

        {/* Stats */}
        <InvoicesStats invoiceStats={invoiceStats} />

        {/* Filters */}
        <InvoicesFilters
          total={meta?.total ?? 0}
          availableYears={meta?.availableYears ?? []}
        />

        {/* Table */}
        <InvoicesTable invoices={allInvoices} />

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

export default InvoicePage;
