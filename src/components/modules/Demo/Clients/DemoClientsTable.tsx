"use client";

import { IClient, ClientStatus } from "@/types/client";

import ClientAvatar from "@/components/modules/Business/Clients/ClientAvatar";

import DemoClientActions from "./DemoClientsActions";

const TABLE_HEADERS = [
  "Client",
  "Contact",
  "Status",
  "Invoices",
  "Added",
  "Actions",
];

const statusConfig: Record<ClientStatus, { dot: string; badge: string }> = {
  ACTIVE: {
    dot: "bg-emerald-400",
    badge: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  INACTIVE: {
    dot: "bg-zinc-400",
    badge: "border border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
  },
};

const StatusBadge = ({ status }: { status: ClientStatus }) => {
  const { dot, badge } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-[11px] ${badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />

      {status}
    </span>
  );
};

const InvoicePill = ({ count }: { count: number }) => {
  if (!count || count === 0) {
    return (
      <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium text-slate-500 sm:px-3 sm:text-[11px]">
        0 invoices
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium text-blue-400 sm:px-3 sm:text-[11px]">
      {count} invoices
    </span>
  );
};

const EmptyState = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="py-20 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/3">
          <span className="text-xl">👥</span>
        </div>

        <p className="text-sm font-medium text-slate-300">No clients found</p>

        <p className="mt-1 text-xs text-slate-500">
          Client records will appear here
        </p>
      </div>
    </td>
  </tr>
);

export default function DemoClientsTable({ clients }: { clients: IClient[] }) {
  return (
    <>
      {/* MOBILE + TABLET */}
      <div className="space-y-4 xl:hidden">
        {clients.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/3">
                <span className="text-xl">👥</span>
              </div>

              <p className="text-sm font-medium text-slate-300">
                No clients found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Client records will appear here
              </p>
            </div>
          </div>
        ) : (
          clients.map((client, idx) => (
            <div
              key={client.id}
              className="rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-3 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2 sm:p-4"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                  <div className="relative shrink-0">
                    <ClientAvatar name={client.name} />

                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#050816] bg-blue-500 text-[9px] font-semibold text-white">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white sm:text-sm">
                      {client.name}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-400 sm:text-xs">
                      {client.email}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">
                      {client.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <StatusBadge status={client.status} />
                </div>
              </div>

              {/* META */}
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/2 p-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                    Invoices
                  </p>

                  <div className="mt-2">
                    <InvoicePill count={client.totalInvoices ?? 0} />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                    Added
                  </p>

                  <p className="mt-2 text-[11px] text-slate-300 sm:text-xs">
                    {client.formattedDate}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 border-t border-white/5 pt-4">
                <DemoClientActions />
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] xl:block">
        <table className="w-full border-collapse">
          <thead className="border-b border-white/10 bg-white/2">
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {clients.length === 0 ? (
              <EmptyState colSpan={TABLE_HEADERS.length} />
            ) : (
              clients.map((client, idx) => (
                <tr
                  key={client.id}
                  className="border-b border-white/4 transition-all duration-200 hover:bg-white/3 last:border-0"
                >
                  {/* CLIENT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <ClientAvatar name={client.name} />

                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#050816] bg-blue-500 text-[9px] font-semibold text-white">
                          {idx + 1}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          {client.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Client ID #{String(idx + 1).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-300">{client.email}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      {client.phone || "—"}
                    </p>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status} />
                  </td>

                  {/* INVOICES */}
                  <td className="px-6 py-4">
                    <InvoicePill count={client.totalInvoices ?? 0} />
                  </td>

                  {/* ADDED */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-400">
                      {client.formattedDate}
                    </p>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <DemoClientActions />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
