"use server";

import ClientsHeader from "@/components/modules/Business/Clients/ClientHeader";
import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";
import ClientToolbar from "@/components/modules/Business/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Business/Clients/ClientsTable";
import { getAllClients } from "@/services/business/clients/getAllClients";

const ClientsPage = async () => {
  const res = await getAllClients();
  const clients = res.success ? res.data : [];
  return (
    <div className="p-7 min-h-screen">
      {/* Page header */}
      <ClientsHeader />

      {/* Stat summary cards */}
      <ClientStatCards />

      {/* Search + filter toolbar */}
      <ClientToolbar />

      {/* Main table */}
      <ClientsTable clients={clients} />
    </div>
  );
};

export default ClientsPage;
