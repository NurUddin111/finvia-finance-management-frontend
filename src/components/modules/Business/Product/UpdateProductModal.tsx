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

import { Input } from "@/components/ui/input";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Package2, PencilLine } from "lucide-react";

import { Product } from "@/types/product";

import { toast } from "sonner";

import { updateProduct } from "@/services/business/products/updateProduct";

export default function UpdateProductModal({
  open,
  onClose,
  product,
}: {
  open: boolean;

  onClose: () => void;

  product: Product;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    updateProduct.bind(null, product.id),
    null,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Product updated successfully!");

      onClose();

      router.refresh();
    } else {
      toast.error("Failed to update product!");
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
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

          <DialogHeader className="relative">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <Package2 className="size-6 text-blue-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-semibold tracking-tight text-white">
              Update Product
            </DialogTitle>

            <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
              Modify your product information and keep your inventory details up
              to date.
            </p>
          </DialogHeader>
        </div>

        {/* FORM */}
        <div className="px-6 py-6">
          <form action={formAction} className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Product Name
                </FieldLabel>

                <div className="relative">
                  <PencilLine className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                  <Input
                    name="name"
                    defaultValue={product.name}
                    placeholder="Enter product name..."
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                </div>
              </Field>

              {!isPending && state?.success === false && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center">
                  <p className="text-sm text-red-400">{state.error}</p>
                </div>
              )}
            </FieldGroup>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
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
                className="h-11 flex-1 rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
              >
                {isPending ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
