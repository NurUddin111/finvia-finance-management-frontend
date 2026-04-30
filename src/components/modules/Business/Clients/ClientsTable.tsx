"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientActions from "./ClientActions";
import ClientAvatar from "./ClientAvatar";
import { BusinessClient } from "@/types/client";

const TABLE_HEADERS = [
  "Client",
  "Contact",
  "Status",
  "Invoices",
  "Added",
  "Actions",
];

const StatusBadge = () => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-400/10 text-emerald-400">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    Active
  </span>
);

const InvoicePill = ({ count }: { count: number }) => {
  if (!count || count === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-semibold bg-white/5 text-white/20">
        0
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-semibold bg-indigo-500/15 text-indigo-300">
      {count}
    </span>
  );
};

const EmptyState = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="py-16 text-center">
      <p className="text-white/25 text-sm">No clients found!</p>
    </td>
  </tr>
);

export default function ClientsTable({
  clients,
}: {
  clients: BusinessClient[];
}) {
  return (
    <>
      {/* ── Mobile cards ── */}
      <div className="space-y-3 md:hidden">
        {clients.length === 0 ? (
          <div className="rounded-xl border border-white/[0.07] bg-[#16161E] p-6 text-center text-white/25 text-sm">
            No clients found!
          </div>
        ) : (
          clients.map((client: BusinessClient) => (
            <div
              key={client.id}
              className="w-full rounded-xl border border-white/[0.07] p-4 space-y-3"
            >
              {/* Client info */}
              <div className="flex items-center gap-3">
                <ClientAvatar name={client?.client.name} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">
                    {client?.client.name}
                  </p>
                  <p className="text-[12px] text-white/40 truncate">
                    {client?.client.email}
                  </p>
                  <p className="text-[11px] text-white/25">
                    {client?.client.phone || "—"}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex justify-between text-[12px] border-t border-white/5 pt-3">
                <div className="space-y-1.5">
                  <p className="text-white/30">Status</p>
                  <StatusBadge />
                </div>
                <div className="space-y-1.5">
                  <p className="text-white/30">Invoices</p>
                  <InvoicePill count={client.client.totalInvoices ?? 0} />
                </div>
                <div className="space-y-1.5 text-right">
                  <p className="text-white/30">Added</p>
                  <p className="text-white/50">{client.formattedDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/5 pt-3">
                <ClientActions client={client?.client} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden md:block w-full overflow-x-auto border border-white/[0.07] rounded-[14px]">
        <table className="w-full border-collapse">
          <thead className="border-b border-white/[0.07]">
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.5px] uppercase text-white/30"
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
              clients.map((client: any, idx: number) => (
                <tr
                  key={client.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors duration-150"
                >
                  {/* Client */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <ClientAvatar name={client?.client.name} />
                      <div>
                        <p className="text-[13px] font-medium text-white leading-none">
                          {client?.client.name}
                        </p>
                        <p className="text-[11px] text-white/25 mt-1">
                          #{String(idx + 1).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3.5">
                    <p className="text-[12px] text-white/60 truncate">
                      {client?.client.email}
                    </p>
                    <p className="text-[11px] text-white/30 mt-0.5">
                      {client?.client.phone || "—"}
                    </p>
                  </td>

                  {/* Status — hardcoded active until model is updated */}
                  <td className="px-4 py-3.5">
                    <StatusBadge />
                  </td>

                  {/* Invoices */}
                  <td className="px-4 py-3.5">
                    <InvoicePill count={client?.client.totalInvoices ?? 0} />
                  </td>

                  {/* Added */}
                  <td className="px-4 py-3.5">
                    <p className="text-[12px] text-white/40">
                      {client.formattedDate}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <ClientActions client={client?.client} />
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
