"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InvoiceStatusBadge from "./InvoicesStatus";
import InvoiceViewSkeleton from "./ViewInvSkeleton";
import { useRouter } from "next/navigation";
import { IInvoice } from "@/types/invoice";
import {
  CalendarDays,
  FileText,
  ReceiptText,
  SendHorizonal,
  Download,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";
import { sendInvoice } from "@/services/business/invoices.services";

export default function InvoiceViewModal({
  open,
  onClose,
  invoice,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  invoice: IInvoice | null;
  loading: boolean;
}) {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!invoice) return;
    setIsSending(true);
    const res = await sendInvoice(invoice.id);
    setIsSending(false);

    if (res.success) {
      toast.success("Invoice sent successfully!");
      onClose();
      router.refresh();
    } else {
      toast.error(res.error ?? "Failed to send invoice.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="flex h-[92vh] w-[96vw] max-w-5xl flex-col overflow-hidden rounded-4xl border border-white/10 bg-[#050816] p-0 shadow-[0_25px_120px_rgba(0,0,0,0.75)]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">View Invoice</DialogTitle>

        {/* HEADER */}
        <DialogHeader className="shrink-0 border-b border-white/10 bg-[#081120] px-6 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <ReceiptText className="size-6 text-blue-400" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-3xl font-semibold tracking-tight text-white">
                  {loading || !invoice
                    ? "Loading Invoice..."
                    : invoice.invoiceNumber}
                </h2>

                {!loading && invoice && (
                  <p className="mt-1 truncate text-sm text-slate-400">
                    Client: {invoice.client?.email}
                  </p>
                )}
              </div>
            </div>

            {!loading && invoice && (
              <InvoiceStatusBadge status={invoice.status} />
            )}
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6 xl:px-7">
          {loading || !invoice ? (
            <InvoiceViewSkeleton />
          ) : (
            <div className="space-y-6">
              {/* META */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <CalendarDays className="size-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Invoice Dates
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Issue Date</span>
                      {/* FIX: issueDate is nullable */}
                      <span className="font-medium text-white">
                        {invoice.issueDate
                          ? new Date(invoice.issueDate).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Due Date</span>
                      {/* FIX: dueDate is nullable */}
                      <span className="font-medium text-white">
                        {invoice.dueDate
                          ? new Date(invoice.dueDate).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FileText className="size-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Invoice Summary
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Items</span>
                      <span className="font-medium text-white">
                        {invoice.items?.length ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Currency</span>
                      <span className="font-medium text-white">
                        {invoice.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120]">
                <div className="border-b border-white/10 px-5 py-4">
                  <h3 className="text-sm font-semibold text-white">
                    Invoice Items
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Products and pricing breakdown
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="border-b border-white/10 bg-white/3">
                      <tr>
                        <th className="px-5 py-4 text-left font-medium text-slate-400">
                          Item
                        </th>
                        <th className="px-5 py-4 text-center font-medium text-slate-400">
                          Qty
                        </th>
                        <th className="px-5 py-4 text-right font-medium text-slate-400">
                          Rate
                        </th>
                        <th className="px-5 py-4 text-right font-medium text-slate-400">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoice.items?.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-white/5 transition-colors hover:bg-white/2"
                        >
                          <td className="px-5 py-4 font-medium text-white">
                            {item.name}
                          </td>
                          <td className="px-5 py-4 text-center text-slate-300">
                            {item.quantity}
                          </td>
                          <td className="px-5 py-4 text-right text-slate-300">
                            {item.pricePerUnit}
                          </td>
                          <td className="px-5 py-4 text-right font-semibold text-white">
                            {item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOTALS */}
              <div className="ml-auto w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1120] p-5">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-white">
                      {invoice.subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tax</span>
                    <span className="font-medium text-white">
                      {invoice.tax}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-slate-300">
                        Total
                      </span>
                      <span className="text-3xl font-semibold tracking-tight text-white">
                        {invoice.total} {invoice.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NOTES */}
              {invoice.notes && (
                <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <StickyNote className="size-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white">Notes</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {invoice.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!loading && invoice && (
          <div className="shrink-0 border-t border-white/10 bg-[#081120] px-5 py-4 md:px-6 xl:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              {invoice.invPdfUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(invoice.invPdfUrl!, "_blank")}
                  className="h-12 rounded-2xl border-white/10 bg-white/3 px-5 text-slate-300 hover:bg-white/5"
                >
                  <Download size={15} className="mr-2" />
                  View PDF
                </Button>
              )}

              {invoice.status &&
                invoice.status !== "SENT" &&
                invoice.status !== "PAID" && (
                  <Button
                    disabled={isSending}
                    onClick={handleSend}
                    className="h-12 rounded-2xl bg-blue-500 px-6 font-semibold text-white hover:bg-blue-400"
                  >
                    <SendHorizonal size={15} className="mr-2" />
                    {isSending ? "Sending..." : "Send Invoice"}
                  </Button>
                )}

              <Button
                variant="outline"
                onClick={onClose}
                className="h-12 rounded-2xl border-white/10 bg-white/3 px-6 text-slate-300 hover:bg-white/5"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
