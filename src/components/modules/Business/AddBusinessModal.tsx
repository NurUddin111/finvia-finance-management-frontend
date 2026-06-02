"use client";

import { useEffect, useRef, useState } from "react";
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
  Upload,
  X,
  LoaderCircle,
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
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import { createBusiness } from "@/services/business/business.services";
import Image from "next/image";

export default function AddBusinessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createBusiness, null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      onClose();
      toast.success("Business workspace created successfully!");
      router.push("/business/dashboard");
      return;
    }

    if (!state.errors) {
      toast.error(state.error ?? "Failed to create business workspace!");
    }
  }, [state, router, onClose]);

  // Revoke the object URL when it's no longer needed to free memory
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (logoPreview) URL.revokeObjectURL(logoPreview);

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleLogoClear = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="custom-scrollbar overflow-y-auto border border-white/10 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-4xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-6 md:px-8">
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
                  <InputFieldError field="name" state={state} />
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
                  <InputFieldError field="email" state={state} />
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
                  <InputFieldError field="category" state={state} />
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
                  <InputFieldError field="phone" state={state} />
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
                  <InputFieldError field="website" state={state} />
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
                  <InputFieldError field="address" state={state} />
                </Field>

                {/* LOGO UPLOAD */}
                <Field>
                  <FieldLabel className="mb-2 text-sm text-slate-300">
                    Business Logo
                  </FieldLabel>

                  {/* Hidden real file input — always in the DOM so FormData picks it up */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  {logoPreview && logoFile ? (
                    /* PREVIEW STATE */
                    <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        width={28}
                        height={28}
                        unoptimized
                        className="h-7 w-7 rounded-lg object-cover"
                      />
                      <span className="flex-1 truncate text-sm text-slate-300">
                        {logoFile.name}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {(logoFile.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button"
                        onClick={handleLogoClear}
                        className="shrink-0 rounded-lg p-1 text-slate-500 transition-colors duration-200 hover:text-red-400"
                        aria-label="Remove logo"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    /* UPLOAD TRIGGER */
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-12 w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/3 px-4 text-left transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <ImageIcon className="size-3.5 text-slate-500" />
                      </div>
                      <span className="flex-1 text-sm text-slate-500">
                        Click to upload logo
                      </span>
                      <Upload className="size-3.5 shrink-0 text-slate-600" />
                    </button>
                  )}
                </Field>
              </div>
            </div>

            {/* GLOBAL ERROR */}
            {!isPending && state?.success === false && !state.errors && (
              <div className="rounded-2xl border border-red-500/15 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">
                  {state.error ?? "Failed to create business workspace."}
                </p>
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
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Creating Workspace...
                  </>
                ) : (
                  <>
                    <Building2 className="size-4 transition-transform duration-300 group-hover:scale-110" />
                    Create Workspace
                  </>
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
