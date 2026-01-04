/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import InvoiceStatusBadge from "./InvoicesStatus";
import { getAllInvoices } from "@/services/business/invoices/getAllInvoices";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { getSingleInvoice } from "@/services/business/invoices/getSingleInv";
import InvoiceViewModal from "./ViewInvoice";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
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

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await getAllInvoices();
      if (res.success) {
        setInvoices(res.data);
      }
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        <Badge className="gap-2">
          <Spinner />
          Loading invoices...
        </Badge>
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="rounded-xl border bg-background p-4 space-y-3"
          >
            <div className="space-y-1">
              <p className="font-medium truncate">{invoice.invoiceNumber}</p>
              <p className="text-sm text-muted-foreground truncate">
                {invoice.client.email}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">
                {Number(invoice.total ?? 0).toFixed(2)} BDT
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Due</span>
              <span>
                {invoice.dueDate
                  ? new Date(invoice.dueDate).toLocaleDateString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <InvoiceStatusBadge
                status={(invoice.status ?? "unpaid") as any}
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleViewInvoice(invoice.id)}
              >
                <Eye size={16} />
              </Button>
            </div>
          </div>
        ))}

        {invoices.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            No invoices found
          </div>
        )}
      </div>

      {/*  Tablet / Desktop */}
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left w-[18%]">Invoice #</th>
              <th className="p-4 text-left w-[26%]">Client</th>
              <th className="p-4 text-left w-[14%]">Amount</th>
              <th className="p-4 text-left w-[16%]">Due Date</th>
              <th className="p-4 text-left w-[12%]">Status</th>
              <th className="p-4 text-right w-[14%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="p-4 font-medium truncate">
                  {invoice.invoiceNumber}
                </td>

                <td className="p-4 truncate">{invoice.client.email}</td>

                <td className="p-4 font-medium">
                  {Number(invoice.total ?? 0).toFixed(2)}
                </td>

                <td className="p-4 text-muted-foreground">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  <InvoiceStatusBadge
                    status={(invoice.status ?? "unpaid") as any}
                  />
                </td>

                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewInvoice(invoice.id)}
                  >
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-muted-foreground"
                >
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal OUTSIDE table */}
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
