"use client";

import { useState } from "react";

import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";

import DemoClientsHeader from "@/components/modules/Demo/Clients/DemoClientsHeader";

import DemoClientsTable from "@/components/modules/Demo/Clients/DemoClientsTable";

import DemoClientToolbar from "@/components/modules/Demo/Clients/DemoClientsToolbar";

import DemoPagination from "@/components/modules/Demo/DemoPagination";

import { demoClients, demoClientsStats } from "@/data/demodata";

const PAGE_SIZE = 10;

export default function DemoClientsPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(demoClients.length / PAGE_SIZE);

  const paginatedClients = demoClients.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-5 lg:gap-6">
        <DemoClientsHeader />

        <ClientStatCards clientsStats={demoClientsStats} />

        <DemoClientToolbar total={demoClients.length} />

        <DemoClientsTable clients={paginatedClients} />

        <DemoPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
