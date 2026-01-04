/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InvoiceStatusBadge from "./InvoicesStatus";
import InvoiceViewSkeleton from "./ViewInvSkeleton";
import { URL } from "url";
import { sendInvoice } from "@/services/business/invoices/sendInv";
import { useRouter } from "next/navigation";

type InvoiceItem = {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
};

type InvoiceData = {
  id: string;
  invoiceNumber: string;
  status: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  notes: string | null;
  invPdfUrl: URL;
  client: {
    email: string;
  };
  items: InvoiceItem[];
};

export default function InvoiceViewModal({
  open,
  onClose,
  invoice,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceData | null;
  loading: boolean;
}) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className=" w-[95vw] max-w-3xl max-h-[90vh] bg-black flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">View Invoice</DialogTitle>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
          {loading || !invoice ? (
            <InvoiceViewSkeleton />
          ) : (
            <>
              <DialogHeader className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold truncate">
                    Invoice {invoice.invoiceNumber}
                  </h2>
                  <InvoiceStatusBadge
                    status={(invoice.status ?? "unpaid") as any}
                  />
                </div>

                <p className="text-sm text-muted-foreground truncate">
                  Client: {invoice.client.email}
                </p>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6">
                <div>
                  <p className="text-muted-foreground">Issue Date</p>
                  <p>{new Date(invoice.issueDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-6 border rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-150 w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left">Item</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Rate</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3 truncate">{item.name}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-right">
                            {item.pricePerUnit}
                          </td>
                          <td className="p-3 text-right font-medium">
                            {item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm max-w-sm ml-auto">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{invoice.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{invoice.tax}</span>
                </div>

                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Total</span>
                  <span>
                    {invoice.total} {invoice.currency}
                  </span>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-6 text-sm">
                  <p className="text-muted-foreground">Notes</p>
                  <p>{invoice.notes}</p>
                </div>
              )}
            </>
          )}
        </div>

        {!loading && invoice && (
          <div className="shrink-0 border-t px-5 sm:px-6 py-4 flex justify-end gap-3">
            {invoice.invPdfUrl && (
              <Button
                variant="outline"
                onClick={() => window.open(invoice.invPdfUrl, "_blank")}
              >
                View PDF
              </Button>
            )}

            {invoice.status &&
              invoice.status !== "SENT" &&
              invoice.status !== "PAID" && (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={async () => {
                    await sendInvoice(invoice.id);
                    onClose();
                    router.refresh();
                  }}
                >
                  Send Invoice
                </Button>
              )}

            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
