"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, SendHorizonal, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { sendInvoice } from "@/services/business/invoices.services";
import { useRouter } from "next/navigation";

export default function InvoiceActionModal({
  open,
  invoiceId,
  onClose,
}: {
  open: boolean;
  invoiceId: string;
  onClose: () => void;
}) {
  const [isSending, setIsSending] = useState(false);
  const [internalOpen, setInternalOpen] = useState(open);
  const router = useRouter();

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const closeModal = () => {
    setInternalOpen(false);
    // Always refresh — covers both "Save as Draft" and "Send Invoice"
    router.refresh();
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleSend = async () => {
    setIsSending(true);
    const res = await sendInvoice(invoiceId);
    setIsSending(false);

    if (res.success) {
      toast.success("Invoice sent successfully!");
      closeModal(); // refresh is handled inside closeModal now
    } else {
      toast.error(res.error ?? "Failed to send invoice.");
    }
  };

  return (
    <Dialog open={internalOpen} onOpenChange={setInternalOpen}>
      <DialogContent
        className="overflow-hidden border border-white/10 bg-[#050816] p-0 shadow-[0_25px_120px_rgba(0,0,0,0.75)] sm:max-w-md [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* TOP GLOW */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-blue-500/10 to-transparent" />

        {/* HEADER */}
        <DialogHeader className="relative border-b border-white/10 px-6 pb-5 pt-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="size-8 text-emerald-400" />
          </div>
          <div className="mt-5 text-center">
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-white">
              Invoice Created
              <Sparkles className="size-5 text-amber-400" />
            </DialogTitle>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Your invoice has been generated successfully.
              <br />
              Choose what you would like to do next.
            </p>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="px-6 py-6">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Invoice Ready</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  You can save this invoice as a draft for later or instantly
                  send it to your client.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              disabled={isSending}
              onClick={closeModal}
              className="h-12 rounded-2xl border-white/10 bg-white/3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/6 hover:text-white"
            >
              Save as Draft
            </Button>

            <Button
              disabled={isSending}
              onClick={handleSend}
              className="h-12 rounded-2xl bg-blue-500 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-400"
            >
              {isSending ? (
                "Sending..."
              ) : (
                <>
                  <SendHorizonal size={15} className="mr-2" />
                  Send Invoice
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
