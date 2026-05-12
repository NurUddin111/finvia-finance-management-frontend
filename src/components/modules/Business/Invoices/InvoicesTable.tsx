"use client";

import { useState } from "react";

import { Eye, FileX, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceStatusBadge from "./InvoicesStatus";

import { getSingleInvoice } from "@/services/business/invoices/getSingleInv";

import InvoiceViewModal from "./ViewInvoice";

import { Invoice } from "@/types/invoice";

import { cn } from "@/lib/utils";

interface InvoicesTableProps {
  invoices: Invoice[];
}

// ── Skeleton ─────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-white/6">
      <td className="px-6 py-5">
        <div className="h-4 w-28 animate-pulse rounded bg-white/5" />
      </td>

      <td className="px-6 py-5">
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
          <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
      </td>

      <td className="px-6 py-5">
        <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
      </td>

      <td className="px-6 py-5">
        <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
      </td>

      <td className="px-6 py-5 text-right">
        <div className="ml-auto h-9 w-9 animate-pulse rounded-xl bg-white/5" />
      </td>
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
          </div>

          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 animate-pulse rounded-xl bg-white/5" />
          <div className="h-12 animate-pulse rounded-xl bg-white/5" />
        </div>

        <div className="flex justify-end">
          <div className="h-9 w-20 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <>
      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] md:block">
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
            {Array.from({
              length: 6,
            }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Table ─────────────────────────────────────────────

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [viewOpen, setViewOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [viewLoading, setViewLoading] = useState(false);

  const handleViewInvoice = async (invoiceId: string) => {
    setViewLoading(true);

    setViewOpen(true);

    const res = await getSingleInvoice(invoiceId);

    if (res.success) {
      setSelectedInvoice(res.data);
    }

    setViewLoading(false);
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
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-white/10 bg-white/3 px-4 text-xs text-slate-300 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                onClick={() => handleViewInvoice(invoice.id)}
              >
                <Eye size={13} className="mr-1.5" />
                View Invoice
              </Button>
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
                <th className="w-[18%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Invoice #
                </th>

                <th className="w-[28%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Client
                </th>

                <th className="w-[16%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Amount
                </th>

                <th className="w-[16%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Due Date
                </th>

                <th className="w-[12%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Status
                </th>

                <th className="w-[10%] px-6 py-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Actions
                </th>
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
                  <td className="px-6 py-5 text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-white/10 bg-white/3 text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                      onClick={() => handleViewInvoice(invoice.id)}
                    >
                      <Eye size={15} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <InvoiceViewModal
        open={viewOpen}
        loading={viewLoading}
        invoice={selectedInvoice}
        onClose={() => {
          setViewOpen(false);

          setSelectedInvoice(null);
        }}
      />
    </>
  );
}
