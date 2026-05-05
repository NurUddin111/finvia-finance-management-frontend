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
    if (state) {
      if (state?.success) {
        onClose();
        router.refresh();
        toast.success("Product updated successfully!");
      }
      if (!state?.success) {
        onClose();
        toast.error("Failed to update product!");
      }
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-sm bg-black px-5 sm:px-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Update product
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>Product name</FieldLabel>
              <Input name="name" defaultValue={product.name} />
            </Field>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 h-10"
              >
                {isPending ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
