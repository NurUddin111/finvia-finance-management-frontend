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

  // Fire all independent requests at the same time
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
    updateInvStatus(), // doesn't return anything we need, just runs in parallel
  ]);

  const invoiceStats = invoiceStatsRes.data as InvoiceStats;
  const allInvoices = allInvoicesRes.data as Invoice[];
  const meta = allInvoicesRes.meta;

  return (
    <div className="space-y-6">
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
  );
};

export default InvoicePage;
