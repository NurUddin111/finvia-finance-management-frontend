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
import { updateClient } from "@/services/business/clients/updateClient";

export default function UpdateClientModal({
  open,
  onClose,
  client,
}: {
  open: boolean;
  onClose: () => void;
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    updateClient.bind(null, client.id),
    null
  );

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
            Update client
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>Client Name</FieldLabel>
              <Input name="name" defaultValue={client.name} />
            </Field>

            <Field>
              <FieldLabel>Client Email</FieldLabel>
              <Input name="email" type="email" defaultValue={client.email} />
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input name="phone" defaultValue={client.phone ?? ""} />
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input name="address" defaultValue={client.address ?? ""} />
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
                {isPending ? "Updating..." : "Update Client"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
