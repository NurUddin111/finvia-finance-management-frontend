// No "use client" — this stays a Server Component

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
  searchParams: Promise<Record<string, string>>;
}) => {
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
    <div className="min-h-screen bg-[#050816] rounded-2xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-400">
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
    </div>
  );
};

export default ClientsPage;
