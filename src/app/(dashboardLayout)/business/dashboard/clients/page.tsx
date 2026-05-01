"use server";

import ClientsHeader from "@/components/modules/Business/Clients/ClientHeader";
import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";
import ClientToolbar from "@/components/modules/Business/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Business/Clients/ClientsTable";
import { updateClientStatus } from "@/services/business/clients/clientStatus";
import { getClientsStats } from "@/services/business/clients/clientsStats";
import { getAllClients } from "@/services/business/clients/getAllClients";
import { Client, ClientsStats } from "@/types/client";

const ClientsPage = async () => {
  const clientsRes = await getAllClients();
  const clients: Client[] = clientsRes.success ? clientsRes.data : [];

  const clientsStatsRes = await getClientsStats();
  const clientsStats: ClientsStats = clientsStatsRes.data;

  const updateClientStatusRes = await updateClientStatus();
  const clientStatus = updateClientStatusRes.data;
  return (
    <div className="p-7 min-h-screen">
      {/* Page header */}
      <ClientsHeader />

      {/* Stat summary cards */}
      <ClientStatCards clientsStats={clientsStats} />

      {/* Search + filter toolbar */}
      <ClientToolbar />

      {/* Main table */}
      <ClientsTable clients={clients} />
    </div>
  );
};

export default ClientsPage;
