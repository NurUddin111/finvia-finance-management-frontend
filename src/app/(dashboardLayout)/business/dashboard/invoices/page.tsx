import { Suspense } from "react";
import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
import InvoicesTable, {
  InvoicesTableSkeleton,
} from "@/components/modules/Business/Invoices/InvoicesTable";
import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";
import { getInvoiceStats } from "@/services/business/invoices/inoiceStats";
import { getAllInvoices } from "@/services/business/invoices/getAllInvoices";
import { Invoice, InvoiceStats } from "@/types/invoice";

async function InvoiceContent() {
  const [InvoiceStatsRes, AllInvoiceRes] = await Promise.all([
    getInvoiceStats(),
    getAllInvoices(),
  ]);

  const invoiceStats = InvoiceStatsRes.data as InvoiceStats;
  const allInvoices = AllInvoiceRes.data as Invoice[];

  return (
    <>
      <InvoicesStats invoiceStats={invoiceStats} />
      <InvoicesFilters />
      <InvoicesTable invoices={allInvoices} />
    </>
  );
}

const InvoicePage = () => {
  return (
    <div className="space-y-6">
      <InvoicesHeader />
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoiceContent />
      </Suspense>
    </div>
  );
};

export default InvoicePage;
