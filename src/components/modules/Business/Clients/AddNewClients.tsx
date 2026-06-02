"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Loader2, User, Mail, Phone, MapPin, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputFieldError from "@/components/shared/InputFieldError";
import { ActionResult } from "@/types/actions";
import { toast } from "sonner";
import { addClient } from "@/services/business/clients.services";

// ── Styled Input ──────────────────────────────────────────────
function FormField({
  label,
  required,
  icon: Icon,
  name,
  type = "text",
  placeholder,
  state,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  icon: React.ElementType;
  name: string;
  type?: string;
  placeholder?: string;
  state: ActionResult<unknown> | null;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>

      <div className="relative">
        <Icon
          size={14}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-2xl border border-white/10 bg-white/3",
            "pl-10 pr-4 text-[13px] text-white",
            "placeholder:text-slate-500",
            "outline-none transition-all duration-300",
            "focus:border-blue-500/30",
            "focus:bg-white/5",
            "focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]",
          )}
        />
      </div>

      {/* Zod field error */}
      <InputFieldError field={name} state={state} />
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
export default function AddNewClientModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addClient, null);

  const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      onClose();
      toast.success("Client added successfully!");
      router.refresh();
      return;
    }

    if (!state.errors) {
      toast.error(state.error ?? "Failed to add client");
    }
  }, [state, onClose, router]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setForm(EMPTY_FORM);
          onClose();
        }
      }}
    >
      <DialogContent
        className={cn(
          "overflow-hidden rounded-3xl border border-white/10",
          "bg-linear-to-b from-[#0B1120] to-[#050816]",
          "w-[95vw] max-w-md",
          "p-0 shadow-[0_25px_100px_rgba(0,0,0,0.55)]",
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Glow */}
        <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Header */}
        <DialogHeader className="relative border-b border-white/6 px-5 pb-4 pt-5">
          <div className="mb-3 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <Users2 className="size-5 text-blue-400" />
            </div>
          </div>

          <DialogTitle className="text-center text-xl font-semibold tracking-tight text-white">
            Add New Client
          </DialogTitle>

          <p className="mt-1 text-center text-[12px] leading-relaxed text-slate-400">
            Create and manage a new client profile.
          </p>
        </DialogHeader>

        {/* Form */}
        <form action={formAction} className="relative space-y-4 px-5 py-5">
          <FormField
            label="Client Name"
            required
            icon={User}
            name="name"
            placeholder="Finvia Ltd"
            state={state}
            value={form.name}
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          />

          <FormField
            label="Client Email"
            required
            icon={Mail}
            name="email"
            type="email"
            placeholder="business@example.com"
            state={state}
            value={form.email}
            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          />

          <FormField
            label="Phone"
            icon={Phone}
            name="phone"
            placeholder="+8801XXXXXXXXX"
            state={state}
            value={form.phone}
            onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
          />

          <FormField
            label="Address"
            icon={MapPin}
            name="address"
            placeholder="Dhaka, Bangladesh"
            state={state}
            value={form.address}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, address: value }))
            }
          />

          {/* GLOBAL ERROR — API failure only */}
          {!isPending && state?.success === false && !state.errors && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[12px] text-red-400">
              {state.error ?? "Failed to add client."}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY_FORM);
                onClose();
              }}
              className="h-10 flex-1 rounded-2xl border border-white/10 bg-white/3 px-4 text-[13px] font-medium text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl",
                "border border-blue-500/20 bg-blue-500/10",
                "px-4 text-[13px] font-medium text-blue-400",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:border-blue-400/40",
                "hover:bg-blue-500/15",
                "hover:text-blue-300",
                "hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]",
                "disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Client"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
