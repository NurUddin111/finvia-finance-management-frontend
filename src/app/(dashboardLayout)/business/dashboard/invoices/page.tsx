import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";
import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";
import Pagination from "@/components/shared/Pagination";

import { IInvoice, InvoiceStats } from "@/types/invoice";

import {
  getAllInvoices,
  getInvoiceStats,
  updateInvStatus,
} from "@/services/business/invoices.services";

const InvoicePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  updateInvStatus().catch(() => {});

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
  ]);

  const invoiceStats: InvoiceStats | null = invoiceStatsRes.data ?? null;
  const allInvoices: IInvoice[] = allInvoicesRes.data ?? [];
  const meta = allInvoicesRes.meta;

  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:gap-6">
        <InvoicesHeader />
        <InvoicesStats invoiceStats={invoiceStats} />
        <InvoicesFilters
          total={meta?.total ?? 0}
          availableYears={meta?.availableYears ?? []}
        />
        <InvoicesTable invoices={allInvoices} />
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
