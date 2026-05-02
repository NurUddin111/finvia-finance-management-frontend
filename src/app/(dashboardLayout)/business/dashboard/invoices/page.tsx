// import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
// import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
// import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";

// const InvoicePage = () => {
//   return (
//     <div className="space-y-6">
//       <InvoicesHeader />
//       <InvoicesFilters />
//       <InvoicesTable />
//     </div>
//   );
// };

// export default InvoicePage;

"use client";

import { useEffect, useState } from "react";
import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";
import InvoicesStats from "@/components/modules/Business/Invoices/InvoicesStats";
import { getAllInvoices } from "@/services/business/invoices/getAllInvoices";

/* eslint-disable @typescript-eslint/no-explicit-any */

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await getAllInvoices();
      if (res.success) setInvoices(res.data);
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  const filteredInvoices =
    statusFilter === "all"
      ? invoices
      : invoices.filter(
          (inv) => inv.status?.toLowerCase() === statusFilter.toLowerCase()
        );

  return (
    <div className="space-y-6">
      <InvoicesHeader />
      <InvoicesStats invoices={invoices} loading={loading} />
      <InvoicesFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <InvoicesTable invoices={filteredInvoices} loading={loading} />
    </div>
  );
};

export default InvoicePage;
