"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addProduct } from "@/services/business/product.services";

export default function AddProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addProduct, null);
  const [productNames, setProductNames] = useState<string[]>([""]);

  const addRow = () => setProductNames([...productNames, ""]);
  const removeRow = (i: number) =>
    setProductNames(productNames.filter((_, idx) => idx !== i));
  const updateRow = (i: number, value: string) => {
    const copy = [...productNames];
    copy[i] = value;
    setProductNames(copy);
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Product(s) added successfully!");
      onClose();
      router.refresh();
      return;
    }

    if (!state.errors) {
      toast.error(state.error ?? "Failed to add product(s)!");
    }
  }, [state, onClose, router]);

  const productsPayload = productNames
    .map((name) => ({ name: name.trim() }))
    .filter((p) => p.name.length > 0);

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
              Add Products
            </DialogTitle>

            <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
              Add one or more products to your business inventory.
            </p>
          </DialogHeader>
        </div>

        {/* FORM */}
        <div className="px-6 py-6">
          <form action={formAction} className="space-y-5">
            <input
              type="hidden"
              name="productsName"
              value={JSON.stringify(productsPayload)}
            />

            <div className="space-y-3">
              {productNames.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Package2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      value={name}
                      onChange={(e) => updateRow(i, e.target.value)}
                      placeholder={`Product name ${i + 1}`}
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={productNames.length === 1}
                    onClick={() => removeRow(i)}
                    className="h-12 w-12 shrink-0 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-30"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addRow}
              className="h-10 w-full rounded-2xl border border-dashed border-white/10 bg-white/2 text-sm text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-400"
            >
              <Plus size={14} className="mr-2" />
              Add Another Product
            </Button>

            {!isPending && state?.success === false && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center">
                <p className="text-sm text-red-400">
                  {state.errors?.[0]?.message ??
                    state.error ??
                    "Failed to add products."}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
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
                disabled={isPending || productsPayload.length === 0}
                className="h-11 flex-1 rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
              >
                {isPending
                  ? "Adding..."
                  : `Add ${productsPayload.length || ""} Product${productsPayload.length !== 1 ? "s" : ""}`}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
