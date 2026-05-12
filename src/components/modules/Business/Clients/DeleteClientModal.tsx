"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteClient } from "@/services/business/clients/deleteClient";

import { toast } from "sonner";

export default function DeleteClientModal({
  open,
  onClose,
  clientName,
  clientId,
}: {
  open: boolean;
  onClose: () => void;
  clientName: string;
  clientId: string;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    deleteClient.bind(null, clientId),
    null,
  );

  useEffect(() => {
    if (state?.success) {
      onClose();

      router.refresh();

      toast.success("Client deleted successfully!");
    }

    if (state?.success === false) {
      toast.error(state.error ?? "Failed to delete client");
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "overflow-hidden rounded-3xl border border-red-500/10",
          "bg-linear-to-b from-[#0B1120] to-[#050816]",
          "w-[95vw] max-w-sm",
          "p-0 shadow-[0_25px_100px_rgba(0,0,0,0.55)]",
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Glow */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" />

        {/* Header */}
        <DialogHeader className="relative border-b border-white/6 px-5 pb-5 pt-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <AlertTriangle className="size-6 text-red-400" />
            </div>
          </div>

          <DialogTitle className="text-center text-2xl font-semibold tracking-tight text-white">
            Delete Client
          </DialogTitle>

          <p className="mt-3 text-center text-sm leading-relaxed text-slate-400">
            Are you sure you want to permanently remove{" "}
            <span className="font-medium text-white">{clientName}</span>?
          </p>

          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-[12px] text-red-400">
            This action cannot be undone.
          </div>
        </DialogHeader>

        {/* Error */}
        {!isPending && state?.success === false && (
          <div className="px-5 pt-4">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[12px] text-red-400">
              {state.error}
            </div>
          </div>
        )}

        {/* Actions */}
        <form action={formAction} className="flex items-center gap-3 px-5 py-5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded-2xl border border-white/10 bg-white/3 px-4 text-[13px] font-medium text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl",
              "border border-red-500/20 bg-red-500/10",
              "px-4 text-[13px] font-medium text-red-400",
              "transition-all duration-300",
              "hover:-translate-y-0.5",
              "hover:border-red-400/40",
              "hover:bg-red-500/15",
              "hover:text-red-300",
              "hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={14} />
                Delete
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
