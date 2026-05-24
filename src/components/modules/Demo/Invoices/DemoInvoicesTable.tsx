"use client";

import { useState } from "react";

import { Eye, FileX, Lock, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceStatusBadge from "@/components/modules/Business/Invoices/InvoicesStatus";

import { IInvoice } from "@/types/invoice";

import { cn } from "@/lib/utils";

interface DemoInvoicesTableProps {
  invoices: IInvoice[];
}

export default function DemoInvoicesTable({
  invoices,
}: DemoInvoicesTableProps) {
  const [nudgeId, setNudgeId] = useState<string | null>(null);

  const handleViewClick = (id: string) => {
    setNudgeId((prev) => (prev === id ? null : id));
  };

  // EMPTY STATE

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
      {/* MOBILE + TABLET */}
      <div className="space-y-4 xl:hidden">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-3 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2 sm:p-4"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <ReceiptText className="size-4 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {invoice.invoiceNumber}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-xs">
                      {invoice.client?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <InvoiceStatusBadge status={invoice.status} />
              </div>
            </div>

            {/* META */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/2 p-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                  Amount
                </p>

                <p className="mt-2 truncate text-sm font-semibold text-white">
                  ৳{Number(invoice.total).toLocaleString("en-BD")}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                  Due Date
                </p>

                <p className="mt-2 text-[11px] text-slate-300 sm:text-xs">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            {/* CLIENT */}
            <div className="mt-3 rounded-2xl border border-white/5 bg-white/2 p-3">
              <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                Client
              </p>

              <p className="mt-2 truncate text-sm font-medium text-white">
                {invoice.client?.name}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="relative mt-4 border-t border-white/5 pt-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-xl border-white/10 bg-white/3 px-4 text-xs text-slate-300 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                  onClick={() => handleViewClick(invoice.id)}
                >
                  <Eye size={13} className="mr-1.5" />
                  View Invoice
                </Button>
              </div>

              {nudgeId === invoice.id && (
                <div className="absolute right-0 top-14 z-50 flex w-60 items-start gap-2 rounded-2xl border border-red-500/20 bg-[#0B1120]/95 px-3 py-2 text-xs text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:w-auto sm:items-center">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <Lock size={11} />
                  </div>

                  <span className="leading-relaxed sm:whitespace-nowrap">
                    Sign up to view invoice
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] xl:block">
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
                  {/* INVOICE */}
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

                  {/* CLIENT */}
                  <td className="px-6 py-5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {invoice.client?.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {invoice.client?.email}
                      </p>
                    </div>
                  </td>

                  {/* AMOUNT */}
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

                  {/* DUE */}
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

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>

                  {/* ACTION */}
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
