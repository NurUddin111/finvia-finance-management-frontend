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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createBusiness } from "@/services/business/createBusiness";
import { toast } from "sonner";

export default function AddBusinessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createBusiness, null);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        onClose();
        toast.success("Business details added successfully!");
        router.push("/dashboard", { scroll: false });
      }
      if (!state?.success) {
        onClose();
        toast.error("Failed to add business details!");
      }
    }
  }, [state, router, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className=" w-full max-w-2xl bg-black max-h-[90vh] overflow-y-auto px-5 sm:px-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Add your business
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>
                Business Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input name="name" placeholder="Finvia Ltd" />
            </Field>

            {/* Email + Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field className="md:col-span-2">
                <FieldLabel>
                  Business Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="business@example.com"
                />
              </Field>

              <Field>
                <FieldLabel>
                  Category <span className="text-red-500">*</span>
                </FieldLabel>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black w-max">
                    <SelectItem value="AGENCY">Agency</SelectItem>
                    <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                    <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                    <SelectItem value="FREELANCER">Freelancer</SelectItem>
                    <SelectItem value="SERVICE_PROVIDER">
                      Service Provider
                    </SelectItem>
                    <SelectItem value="RETAIL">Retail</SelectItem>
                    <SelectItem value="SOFTWARE_COMPANY">
                      Software Company
                    </SelectItem>
                    <SelectItem value="EDUCATION">Education</SelectItem>
                    <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                    <SelectItem value="REAL_ESTATE">Real Estate</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input name="phone" placeholder="+8801XXXXXXXXX" />
              </Field>

              <Field>
                <FieldLabel>Website</FieldLabel>
                <Input name="website" placeholder="https://example.com" />
              </Field>

              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input name="address" placeholder="Dhaka, Bangladesh" />
              </Field>

              <Field>
                <FieldLabel>Logo URL</FieldLabel>
                <Input name="logoUrl" placeholder="https://logo.png" />
              </Field>
            </div>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className=" mt-6 w-full h-12 rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
            >
              {isPending ? "Creating business..." : "Create Business"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
