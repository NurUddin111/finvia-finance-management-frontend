"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useActionState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Trash2, AlertTriangle } from "lucide-react";

import { toast } from "sonner";

import { deleteProduct } from "@/services/business/products/deleteProduct";

export default function DeleteProductModal({
  open,
  onClose,
  productId,
  productName,
}: {
  open: boolean;

  onClose: () => void;

  productId: string;

  productName: string;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    deleteProduct.bind(null, productId),
    null,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Product deleted successfully!");

      onClose();

      router.refresh();
    } else {
      toast.error("Failed to delete product!");
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="overflow-hidden border border-white/10 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-6">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/10 blur-3xl" />

          <DialogHeader className="relative">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <Trash2 className="size-6 text-red-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-semibold tracking-tight text-white">
              Delete Product
            </DialogTitle>

            <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
              This action will permanently remove the product and cannot be
              undone.
            </p>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="px-6 py-6">
          <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/10">
                <AlertTriangle className="size-4 text-red-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">Are you sure?</p>

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  You are about to delete{" "}
                  <span className="font-medium text-red-300">
                    {productName}
                  </span>
                  . This action cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {!isPending && state?.success === false && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center">
              <p className="text-sm text-red-400">{state.error}</p>
            </div>
          )}

          {/* ACTIONS */}
          <form action={formAction} className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
            >
              {isPending ? "Deleting..." : "Delete Product"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
