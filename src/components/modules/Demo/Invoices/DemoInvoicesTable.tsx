"use client";

import { useState } from "react";

import { Eye, FileX, Lock, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceStatusBadge from "@/components/modules/Business/Invoices/InvoicesStatus";

import { Invoice } from "@/types/invoice";

import { cn } from "@/lib/utils";

interface DemoInvoicesTableProps {
  invoices: Invoice[];
}

export default function DemoInvoicesTable({
  invoices,
}: DemoInvoicesTableProps) {
  const [nudgeId, setNudgeId] = useState<string | null>(null);

  const handleViewClick = (id: string) => {
    setNudgeId((prev) => (prev === id ? null : id));
  };

  // ── Empty State ────────────────────────────

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/3">
          <FileX size={26} className="text-slate-500" />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold text-white">No invoices found</p>

          <p className="text-sm text-slate-400">
            Create your first invoice to start tracking business revenue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Mobile Cards ───────────────────── */}

      <div className="space-y-3 md:hidden">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <ReceiptText className="size-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="truncate text-sm font-semibold text-white">
                      {invoice.invoiceNumber}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {invoice.client.email}
                    </p>
                  </div>
                </div>
              </div>

              <InvoiceStatusBadge status={invoice.status} />
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                  Amount
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  ৳{Number(invoice.total).toLocaleString("en-BD")}
                </p>
              </div>

              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                  Due Date
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="relative mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-white/10 bg-white/3 px-4 text-xs text-slate-300 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                onClick={() => handleViewClick(invoice.id)}
              >
                <Eye size={13} className="mr-1.5" />
                View Invoice
              </Button>

              {nudgeId === invoice.id && (
                <div className="absolute bottom-11 right-0 z-50 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-[#0B1120]/95 px-3 py-2 text-xs text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <Lock size={11} />
                  </div>

                  <span className="whitespace-nowrap">
                    Sign up to view invoice
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table ──────────────────── */}

      <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] md:block">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/6 bg-white/2">
                {[
                  "Invoice #",
                  "Client",
                  "Amount",
                  "Due Date",
                  "Status",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500",
                      i === 5 ? "text-right" : "text-left",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group border-b border-white/4 transition-all duration-300 hover:bg-white/2"
                >
                  {/* Invoice */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                        <ReceiptText className="size-4 text-blue-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {invoice.invoiceNumber}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Invoice Record
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="px-6 py-5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {invoice.client.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {invoice.client.email}
                      </p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-semibold tabular-nums text-white">
                        ৳
                        {Number(invoice.total).toLocaleString("en-BD", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {invoice.currency}
                      </p>
                    </div>
                  </td>

                  {/* Due */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-300">
                      {invoice.dueDate
                        ? new Date(invoice.dueDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>

                  {/* Action */}
                  <td className="relative px-6 py-5 text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-white/10 bg-white/3 text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                      onClick={() => handleViewClick(invoice.id)}
                    >
                      <Eye size={15} />
                    </Button>

                    {nudgeId === invoice.id && (
                      <div className="absolute right-16 top-4 z-50 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-[#0B1120]/95 px-3 py-2 text-xs text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                          <Lock size={11} />
                        </div>

                        <span className="whitespace-nowrap">
                          Sign up to view invoice
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
