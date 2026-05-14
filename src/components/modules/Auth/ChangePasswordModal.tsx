"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { ShieldCheck, LockKeyhole, KeyRound, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";
import { changePassword, logoutUser } from "@/services/auth.services";

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;

  onClose: () => void;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (state?.success) {
      onClose();

      logoutUser();

      router.refresh();
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="overflow-hidden border border-blue-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <div className="border-b border-blue-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-5 py-5">
          <DialogHeader>
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <ShieldCheck className="size-5 text-blue-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-xl font-semibold tracking-tight text-white">
              Change Password
            </DialogTitle>

            <p className="mt-1 text-center text-xs leading-relaxed text-slate-400">
              Update your password to keep your account secure.
            </p>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="px-5 py-5">
          <form action={formAction} className="space-y-3">
            <FieldGroup className="space-y-3">
              {/* CURRENT PASSWORD */}
              <div className="rounded-2xl border border-white/10 bg-white/2 p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <LockKeyhole className="size-3.5 text-blue-400" />

                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    Current Password
                  </p>
                </div>

                <Field>
                  <Input
                    name="oldPass"
                    type="password"
                    placeholder="Current password"
                    className="h-10 rounded-xl border border-white/10 bg-white/3 px-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                </Field>
              </div>

              {/* NEW PASSWORD */}
              <div className="rounded-2xl border border-white/10 bg-white/2 p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <KeyRound className="size-3.5 text-emerald-400" />

                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    New Password
                  </p>
                </div>

                <Field>
                  <Input
                    name="newPass"
                    type="password"
                    placeholder="New password"
                    className="h-10 rounded-xl border border-white/10 bg-white/3 px-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                </Field>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="rounded-2xl border border-white/10 bg-white/2 p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-violet-400" />

                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    Confirm Password
                  </p>
                </div>

                <Field>
                  <Input
                    name="confirmNewPass"
                    type="password"
                    placeholder="Confirm password"
                    className="h-10 rounded-xl border border-white/10 bg-white/3 px-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                </Field>
              </div>

              {/* ERROR */}
              {!isPending && state?.success === false && (
                <div className="rounded-xl border border-red-500/15 bg-red-500/10 px-3 py-2">
                  <p className="text-xs text-red-400">{state.error}</p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-10 flex-1 rounded-xl border-white/10 bg-white/3 text-sm text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="group h-10 flex-1 rounded-xl border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300"
                >
                  <Sparkles className="size-3.5 transition-transform duration-300 group-hover:rotate-12" />

                  {isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
