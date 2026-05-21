"use client";

import { useState } from "react";

import { Eye, FileX, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceStatusBadge from "./InvoicesStatus";
import InvoiceViewModal from "./ViewInvoice";

import { IInvoice } from "@/types/invoice";

import { cn } from "@/lib/utils";

import { getSingleInvoice } from "@/services/business/invoices.services";

interface InvoicesTableProps {
  invoices: IInvoice[];
}

/* ───────────────────────────────────────────── */
/* Skeleton */
/* ───────────────────────────────────────────── */

function SkeletonRow() {
  return (
    <tr className="border-b border-white/6">
      <td className="px-3 py-4 lg:px-6 lg:py-5">
        <div className="h-4 w-24 animate-pulse rounded bg-white/5 lg:w-28" />
      </td>

      <td className="px-3 py-4 lg:px-6 lg:py-5">
        <div className="space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-white/5 lg:w-32" />

          <div className="h-3 w-20 animate-pulse rounded bg-white/5 lg:w-24" />
        </div>
      </td>

      <td className="px-3 py-4 lg:px-6 lg:py-5">
        <div className="h-4 w-20 animate-pulse rounded bg-white/5 lg:w-24" />
      </td>

      <td className="px-3 py-4 lg:px-6 lg:py-5">
        <div className="h-4 w-20 animate-pulse rounded bg-white/5 lg:w-24" />
      </td>

      <td className="px-3 py-4 lg:px-6 lg:py-5">
        <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
      </td>

      <td className="px-3 py-4 text-right lg:px-6 lg:py-5">
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
      {/* MOBILE + TABLET */}
      <div className="space-y-3 lg:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] lg:block">
        <table className="min-w-237.5 w-full border-collapse">
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
                    "px-3 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]",
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

/* ───────────────────────────────────────────── */
/* TABLE */
/* ───────────────────────────────────────────── */

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [viewOpen, setViewOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);

  const [viewLoading, setViewLoading] = useState(false);

  const handleViewInvoice = async (invoiceId: string) => {
    setViewLoading(true);

    setViewOpen(true);

    const res = await getSingleInvoice(invoiceId);

    if (res.success && res.data) {
      setSelectedInvoice(res.data);
    }

    setViewLoading(false);
  };

  /* ──────────────────────────── */
  /* EMPTY */
  /* ──────────────────────────── */

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-14 text-center sm:py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/3 sm:h-16 sm:w-16">
          <FileX size={24} className="text-slate-500 sm:size-6.5" />
        </div>

        <div className="space-y-1">
          <p className="text-base font-semibold text-white sm:text-lg">
            No invoices found
          </p>

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
      <div className="space-y-4 lg:hidden">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2 sm:p-5"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 sm:h-10 sm:w-10">
                    <ReceiptText className="size-4 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white sm:text-base">
                      {invoice.invoiceNumber}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                      {invoice.client?.email}
                    </p>
                  </div>
                </div>
              </div>

              <InvoiceStatusBadge status={invoice.status} />
            </div>

            {/* STATS */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Amount
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  ৳{Number(invoice.total).toLocaleString("en-BD")}
                </p>
              </div>

              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
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

            {/* ACTIONS */}
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

      {/* DESKTOP */}
      <div className="hidden overflow-x-auto rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] lg:block">
        <table className="min-w-262.5 w-full border-collapse">
          <thead>
            <tr className="border-b border-white/6 bg-white/2">
              <th className="w-[18%] px-3 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
                Invoice #
              </th>

              <th className="w-[28%] px-3 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
                Client
              </th>

              <th className="w-[16%] px-3 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
                Amount
              </th>

              <th className="w-[16%] px-3 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
                Due Date
              </th>

              <th className="w-[12%] px-3 py-4 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
                Status
              </th>

              <th className="w-[10%] px-3 py-4 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
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
                {/* INVOICE */}
                <td className="px-3 py-4 lg:px-6 lg:py-5">
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

                {/* CLIENT */}
                <td className="px-3 py-4 lg:px-6 lg:py-5">
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
                <td className="px-3 py-4 lg:px-6 lg:py-5">
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
                <td className="px-3 py-4 lg:px-6 lg:py-5">
                  <p className="text-sm text-slate-300">
                    {invoice.dueDate
                      ? new Date(invoice.dueDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </td>

                {/* STATUS */}
                <td className="px-3 py-4 lg:px-6 lg:py-5">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>

                {/* ACTION */}
                <td className="px-3 py-4 text-right lg:px-6 lg:py-5">
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

      {/* MODAL */}
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
