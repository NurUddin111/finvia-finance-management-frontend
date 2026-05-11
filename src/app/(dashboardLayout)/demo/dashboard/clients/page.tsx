// src/app/(dashboardLayout)/demo/dashboard/clients/page.tsx
"use client";

import { useState } from "react";
import ClientStatCards from "@/components/modules/Business/Clients/ClientStatsCard";
import DemoClientsHeader from "@/components/modules/Demo/Clients/DemoClientsHeader";
import DemoClientsTable from "@/components/modules/Demo/Clients/DemoClientsTable";
import { demoClients, demoClientsStats } from "@/data/demodata";
import DemoClientToolbar from "@/components/modules/Demo/Clients/DemoClientsToolbar";
import DemoPagination from "@/components/modules/Demo/DemoPagination";

const PAGE_SIZE = 10;

export default function DemoClientsPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(demoClients.length / PAGE_SIZE);
  const paginatedClients = demoClients.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="p-7 min-h-screen">
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
  );
}
