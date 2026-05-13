"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useActionState } from "react";

import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ImageIcon,
} from "lucide-react";

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

        toast.success("Business workspace created successfully!");

        router.push("/business/dashboard", {
          scroll: false,
        });
      }

      if (!state?.success) {
        toast.error("Failed to create business workspace!");
      }
    }
  }, [state, router, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="custom-scrollbar overflow-y-auto border border-white/10 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-4xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-6 md:px-8">
          {/* GLOW */}
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <DialogHeader className="relative">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">
                <Building2 className="size-6 text-blue-400" />
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
                  <Sparkles className="size-3.5 text-blue-400" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-400">
                    Workspace Setup
                  </span>
                </div>

                <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
                  Create Your Business
                </DialogTitle>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Set up your workspace to manage invoices, clients, products,
                  and analytics in one place.
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* FORM */}
        <form
          action={formAction}
          className="custom-scrollbar max-h-[70vh] overflow-y-auto px-6 py-6 md:px-8"
        >
          <FieldGroup className="space-y-6">
            {/* BASIC INFO */}
            <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5">
              <div className="mb-5 flex items-center gap-2">
                <Building2 className="size-4 text-blue-400" />

                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                  Business Information
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* NAME */}
                <Field className="md:col-span-2">
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Business Name
                  </FieldLabel>

                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="name"
                      placeholder="Finvia Ltd"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>

                {/* EMAIL */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Business Email
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="email"
                      type="email"
                      placeholder="business@example.com"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>

                {/* CATEGORY */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Category
                  </FieldLabel>

                  <Select name="category">
                    <SelectTrigger className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white focus:ring-0">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent className="border-white/10 bg-[#0B1120] text-white">
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
            </div>

            {/* OPTIONAL INFO */}
            <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5">
              <div className="mb-5 flex items-center gap-2">
                <Globe className="size-4 text-violet-400" />

                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                  Additional Information
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* PHONE */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Phone
                  </FieldLabel>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="phone"
                      placeholder="+8801XXXXXXXXX"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>

                {/* WEBSITE */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Website
                  </FieldLabel>

                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="website"
                      placeholder="https://example.com"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>

                {/* ADDRESS */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Address
                  </FieldLabel>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="address"
                      placeholder="Dhaka, Bangladesh"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>

                {/* LOGO */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Logo URL
                  </FieldLabel>

                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                    <Input
                      name="logoUrl"
                      placeholder="https://logo.png"
                      className="h-12 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* ERROR */}
            {!isPending && state?.success === false && (
              <div className="rounded-2xl border border-red-500/15 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">{state.error}</p>
              </div>
            )}

            {/* FOOTER */}
            <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-white/10 bg-[#050816]/95 pt-5 backdrop-blur-xl sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={onClose}
                className="h-12 rounded-2xl border border-white/10 bg-white/3 px-6 text-sm text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="group h-12 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-7 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]"
              >
                <Building2 className="size-4 transition-transform duration-300 group-hover:scale-110" />

                {isPending ? "Creating Workspace..." : "Create Workspace"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
