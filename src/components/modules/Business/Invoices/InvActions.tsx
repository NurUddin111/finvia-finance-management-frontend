"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sendInvoice } from "@/services/business/invoices/sendInv";
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
  const router = useRouter();

  return (
    <Dialog open={open}>
      <DialogContent
        className=" w-full max-w-sm bg-black max-h-[90vh] overflow-y-auto px-5 sm:px-6"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Invoice created
          </DialogTitle>
        </DialogHeader>

        <p className="mt-2 text-sm text-center text-muted-foreground">
          What do you want to do with this invoice?
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              onClose();
              router.refresh();
            }}
          >
            Save as Draft
          </Button>

          <Button
            className="w-full sm:w-auto"
            onClick={async () => {
              await sendInvoice(invoiceId);
              onClose();
              router.refresh();
            }}
          >
            Send Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
