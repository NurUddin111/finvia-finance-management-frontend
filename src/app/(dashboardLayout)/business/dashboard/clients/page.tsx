// No "use client" — this stays a Server Component

import ClientsHeader from "@/components/modules/Business/Clients/ClientHeader";
import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";
import ClientToolbar from "@/components/modules/Business/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Business/Clients/ClientsTable";
import Pagination from "@/components/shared/Pagination";
import {
  getAllClients,
  getClientsStats,
} from "@/services/business/clients.services";
import { ClientsStats, IClient } from "@/types/client";

const ClientsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  const [clientsRes, clientsStatsRes] = await Promise.all([
    getAllClients({
      page: params.page,
      search: params.search,
      status: params.status,
      sortBy: params.sortBy,
      order: params.order,
    }),
    getClientsStats(),
  ]);

  // FIX: ?? [] handles the undefined case TS was complaining about
  const clients: IClient[] = clientsRes.data ?? [];
  const meta = clientsRes.meta;

  // FIX: ?? null guards against undefined assignment
  const clientsStats: ClientsStats | null = clientsStatsRes.data ?? null;

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
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
