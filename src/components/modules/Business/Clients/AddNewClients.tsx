"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Loader2, User, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addClient } from "@/services/business/clients/addClient";
import { toast } from "sonner";

// ── Styled input with leading icon ──────────────────────────────────────────
function FormField({
  label,
  required,
  icon: Icon,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  required?: boolean;
  icon: React.ElementType;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-medium text-white/50 tracking-wide uppercase flex items-center gap-1">
        {label}
        {required && <span className="text-red-400 text-[10px]">*</span>}
      </label>
      <div className="relative">
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/[0.04] border border-white/[0.08] rounded-[9px]",
            "pl-9 pr-3 py-2.5 text-[13px] text-white",
            "placeholder:text-white/20",
            "outline-none focus:border-indigo-500/50 focus:bg-white/[0.06]",
            "transition-all duration-150",
          )}
        />
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
export default function AddNewClientModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addClient, null);

  useEffect(() => {
    if (state?.success) {
      onClose();
      toast.success("Client added successfully!");
      router.refresh();
    }
    if (state && !state.success) {
      toast.error(state.error ?? "Failed to add client");
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "w-full max-w-md",
          "border border-indigo-500/20",
          "shadow-[0_0_0_1px_rgba(99,102,241,0.1),0_24px_80px_rgba(99,102,241,0.15),0_0_120px_rgba(99,102,241,0.08)]",
          "max-h-[90vh] overflow-y-auto",
          "px-5 py-6 sm:px-6",
          "bg-black",
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="mb-5">
          <DialogTitle className="text-[17px] font-semibold text-white text-center tracking-tight">
            Add New Client
          </DialogTitle>
          <p className="text-[12px] text-white/30 text-center mt-1">
            Required fields are marked with an asterisk
          </p>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          {/* Required section */}
          <div className="space-y-3">
            <FormField
              label="Client Name"
              required
              icon={User}
              name="name"
              placeholder="Finvia Ltd"
            />
            <FormField
              label="Client Email"
              required
              icon={Mail}
              name="email"
              type="email"
              placeholder="business@example.com"
            />
            <FormField
              label="Phone"
              icon={Phone}
              name="phone"
              placeholder="+8801XXXXXXXXX"
            />
            <FormField
              label="Address"
              icon={MapPin}
              name="address"
              placeholder="Dhaka, Bangladesh"
            />
          </div>

          {/* Error */}
          {state?.success === false && (
            <p className="text-[12px] text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
              {state.error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full h-11 rounded-full mt-1",
              "bg-indigo-600 text-white text-[13px] font-medium",
              "flex items-center justify-center gap-2",
              "shadow-[0_0_0_1px_rgba(99,102,241,0.3)]",
              "transition-all duration-300",
              "md:hover:-translate-y-0.5",
              "md:hover:bg-indigo-500",
              "md:hover:shadow-[0_0_0_1px_rgba(99,102,241,0.5),0_12px_45px_rgba(99,102,241,0.3)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
            )}
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Adding Client...
              </>
            ) : (
              "Add Client"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
