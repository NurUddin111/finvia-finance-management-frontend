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
import { addClient } from "@/services/business/clients/addClient";

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
      router.refresh();
    }
  }, [state, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className=" w-full max-w-lg md:max-w-2xl bg-black max-h-[90vh] overflow-y-auto px-5 sm:px-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Add new client
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>
                Client Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input name="name" placeholder="Finvia Ltd" />
            </Field>

            <Field>
              <FieldLabel>
                Client Email <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="business@example.com"
              />
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input name="phone" placeholder="+8801XXXXXXXXX" />
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input name="address" placeholder="Dhaka, Bangladesh" />
            </Field>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className=" mt-6 w-full h-11 rounded-full bg-primary text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.25)] md:hover:-translate-y-0.5 md:hover:shadow-[0_12px_45px_rgba(124,106,242,0.3)]"
            >
              {isPending ? "Adding Client..." : "Add Client"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
