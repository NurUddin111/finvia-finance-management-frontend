"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, FileX } from "lucide-react";
import InvoiceStatusBadge from "./InvoicesStatus";
import { getSingleInvoice } from "@/services/business/invoices/getSingleInv";
import InvoiceViewModal from "./ViewInvoice";
import { Invoice } from "@/types/invoice";
import { cn } from "@/lib/utils";

interface InvoicesTableProps {
  invoices: Invoice[];
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b">
      <td className="px-5 py-4">
        <div className="h-4 w-28 rounded bg-muted animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="space-y-1.5">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-3 w-24 rounded bg-muted animate-pulse" />
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
      </td>
      <td className="px-5 py-4 flex justify-end">
        <div className="h-8 w-8 rounded-md bg-muted animate-pulse" />
      </td>
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-3 w-24 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-6 w-14 rounded-full bg-muted animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 rounded bg-muted animate-pulse" />
        <div className="h-8 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex justify-end">
        <div className="h-8 w-16 rounded-md bg-muted animate-pulse" />
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
      <div className="hidden md:block w-full overflow-x-auto rounded-xl border">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {[
                "Invoice #",
                "Client",
                "Amount (BDT)",
                "Due Date",
                "Status",
                "Actions",
              ].map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "px-5 py-3.5 text-xs font-medium text-muted-foreground uppercase tracking-wider",
                    i === 5 ? "text-right" : "text-left",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const handleViewInvoice = async (invoiceId: string) => {
    setViewLoading(true);
    setViewOpen(true);
    const res = await getSingleInvoice(invoiceId);
    if (res.success) setSelectedInvoice(res.data);
    setViewLoading(false);
  };

  if (invoices.length === 0) {
    return (
      <div className="rounded-xl border p-12 flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
          <FileX size={20} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">No invoices found</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create your first invoice to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Mobile cards ── */}
      <div className="space-y-3 md:hidden">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="rounded-xl border bg-card p-4 space-y-3 transition-colors hover:bg-muted/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {invoice.invoiceNumber}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {invoice.client.email}
                </p>
              </div>
              <InvoiceStatusBadge status={invoice.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
                <p className="font-medium">
                  {Number(invoice.total).toFixed(2)}{" "}
                  <span className="text-muted-foreground text-xs">
                    {invoice.currency}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Due</p>
                <p>
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs"
                onClick={() => handleViewInvoice(invoice.id)}
              >
                <Eye size={13} />
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden md:block w-full overflow-x-auto rounded-xl border">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[18%]">
                Invoice #
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[24%]">
                Client
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[16%]">
                Amount (BDT)
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[16%]">
                Due Date
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[14%]">
                Status
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-[12%]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="group transition-colors hover:bg-muted/25"
              >
                <td className="px-5 py-4 font-medium truncate">
                  {invoice.invoiceNumber}
                </td>

                <td className="px-5 py-4">
                  <p className="text-xs text-muted-foreground truncate">
                    {invoice.client.email}
                  </p>
                </td>

                <td className="px-5 py-4 font-medium tabular-nums">
                  {Number(invoice.total).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                <td className="px-5 py-4">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>

                <td className="px-5 py-4 text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
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
