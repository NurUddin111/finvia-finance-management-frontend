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
import { changePassword } from "@/services/auth/changePasssword";
import { logoutUser } from "@/services/auth/logout";

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
        className=" w-full max-w-md bg-black max-h-[90vh] overflow-y-auto px-5 sm:px-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-4">
            {/* Current Password */}
            <Field>
              <FieldLabel>
                Current Password <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="oldPass"
                type="password"
                placeholder="Enter current password"
              />
            </Field>

            {/* New Password */}
            <Field>
              <FieldLabel>
                New Password <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="newPass"
                type="password"
                placeholder="Enter new password"
              />
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel>
                Confirm New Password <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="confirmNewPass"
                type="password"
                placeholder="Re-enter new password"
              />
            </Field>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="
                mt-6
                w-full
                h-11
                rounded-full
                bg-primary
                text-primary-foreground
                transition-all duration-300
                shadow-[0_0_0_1px_rgba(124,106,242,0.25)]
                md:hover:-translate-y-0.5
                md:hover:shadow-[0_12px_45px_rgba(124,106,242,0.3)]
              "
            >
              {isPending ? "Updating Password..." : "Update Password"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
