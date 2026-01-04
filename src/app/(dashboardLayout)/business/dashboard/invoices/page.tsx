import InvoicesFilters from "@/components/modules/Business/Invoices/InvoicesFilter";
import InvoicesHeader from "@/components/modules/Business/Invoices/InvoicesHeader";
import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";
import React from "react";

const InvoicePage = () => {
  return (
    <div className="space-y-6">
      <InvoicesHeader />
      <InvoicesFilters />
      <InvoicesTable />
    </div>
  );
};

export default InvoicePage;
