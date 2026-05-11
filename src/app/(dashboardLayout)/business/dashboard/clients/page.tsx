// No "use client" — this stays a Server Component
// Server components receive searchParams as a prop automatically from Next.js

import ClientsHeader from "@/components/modules/Business/Clients/ClientHeader";
import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";
import ClientToolbar from "@/components/modules/Business/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Business/Clients/ClientsTable";
import Pagination from "@/components/shared/Pagination";
import { getClientsStats } from "@/services/business/clients/clientsStats";
import { getAllClients } from "@/services/business/clients/getAllClients";
import { Client, ClientsStats } from "@/types/client";

const ClientsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>; // ← type is now Promise
}) => {
  // Resolve the Promise BEFORE touching any values
  const params = await searchParams;

  const clientsRes = await getAllClients({
    page: params.page,
    search: params.search,
    status: params.status,
    sortBy: params.sortBy,
    order: params.order,
  });

  const clients: Client[] = clientsRes.success ? clientsRes.data : [];
  const meta = clientsRes.meta;

  const clientsStatsRes = await getClientsStats();
  const clientsStats: ClientsStats = clientsStatsRes.data;

  return (
    <div className="p-7 min-h-screen">
      <ClientsHeader />
      <ClientStatCards clientsStats={clientsStats} />
      <ClientToolbar total={meta?.total ?? 0} />
      <ClientsTable clients={clients} />
      <Pagination
        page={meta?.page ?? 1}
        totalPages={meta?.totalPages ?? 1}
        hasNextPage={meta?.hasNextPage ?? false}
        hasPrevPage={meta?.hasPrevPage ?? false}
      />
    </div>
  );
};

export default ClientsPage;
