import ClientsHeader from "@/components/modules/Business/Clients/ClientHeader";
import ClientsFilters from "@/components/modules/Business/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Business/Clients/ClientsTable";
import React from "react";

const ClientsPage = () => {
  return (
    <div>
      <div className="space-y-6">
        <ClientsHeader />
        <ClientsFilters />
        <ClientsTable />
      </div>
    </div>
  );
};

export default ClientsPage;
