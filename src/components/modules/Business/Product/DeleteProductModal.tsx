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
    if (state) {
      if (state?.success) {
        onClose();
        router.refresh();
        toast.success("Product deleted successfully!");
      }
      if (!state?.success) {
        onClose();
        toast.error("Failed to delete product!");
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
          <DialogTitle className="text-xl font-semibold text-center text-red-500">
            Delete product
          </DialogTitle>
        </DialogHeader>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-white">{productName}</span>?
          <br />
          This action cannot be undone.
        </p>

        {!isPending && state?.success === false && (
          <p className="mt-4 text-sm text-red-500 text-center">{state.error}</p>
        )}

        <form action={formAction} className="mt-6 flex gap-3">
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
            className="flex-1 h-10 bg-red-600 hover:bg-red-500"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
