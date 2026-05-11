// src/components/modules/Demo/Invoices/DemoInvoicesTable.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, FileX, Lock } from "lucide-react";
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

            <div className="flex justify-end relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs"
                onClick={() => handleViewClick(invoice.id)}
              >
                <Eye size={13} />
                View
              </Button>
              {nudgeId === invoice.id && (
                <div className="absolute right-0 bottom-10 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card bg-red-950 px-3 py-2 shadow-xl text-xs text-muted-foreground whitespace-nowrap">
                  <Lock size={11} className="text-primary shrink-0" />
                  Sign up to view invoice
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop table ── */}
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

                <td className="px-5 py-4 text-right relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleViewClick(invoice.id)}
                  >
                    <Eye size={15} />
                  </Button>
                  {nudgeId === invoice.id && (
                    <div className="absolute right-14 top-3 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card bg-red-950 px-3 py-2 shadow-xl text-xs text-muted-foreground whitespace-nowrap">
                      <Lock size={11} className="text-primary shrink-0" />
                      Sign up to view invoice
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
