"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  Globe,
  ImageIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFieldError from "@/components/shared/InputFieldError";
import {
  getMyBusiness,
  updateBusiness,
} from "@/services/business/business.services";
import Image from "next/image";

type BusinessForm = {
  name: string;
  email: string;
  category: string;
  phone: string;
  address: string;
  website: string;
  logoUrl: string; // existing logo URL from DB
};

export default function EditBusinessPage() {
  const router = useRouter();

  const [businessId, setBusinessId] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<BusinessForm>({
    name: "",
    email: "",
    category: "",
    phone: "",
    address: "",
    website: "",
    logoUrl: "",
  });

  // New logo file the user picks — separate from the existing URL
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(updateBusiness, null);

  /* FETCH BUSINESS */
  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await getMyBusiness();

      if (res?.success && res.data) {
        setBusinessId(res.data.id);
        setForm({
          name: res.data.name ?? "",
          email: res.data.email ?? "",
          category: res.data.category ?? "",
          phone: res.data.phone ?? "",
          address: res.data.address ?? "",
          website: res.data.website ?? "",
          logoUrl: res.data.logoUrl ?? "",
        });
      }

      setLoading(false);
    };

    fetchBusiness();
  }, []);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  // Revoke blob URL when it changes or component unmounts
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError("Image must be smaller than 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileError(null);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleLogoClear = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(null);
    setLogoPreview(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <div className="mx-auto flex w-full max-w-350 flex-col gap-5 lg:gap-6">
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 sm:p-6">
            <p className="text-sm text-slate-400">
              Loading business details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* UI */
  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-350 flex-col gap-5 lg:gap-6">
        <div className="lg:hidden">
          <button
            onClick={() => router.back()}
            className="group inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>

        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-14 sm:w-14">
              <Building2 className="size-5 text-blue-400 sm:size-6" />
            </div>

            <div className="min-w-0">
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
                Business Settings
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Business Details
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Manage your company information, branding, business profile, and
                contact details.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
          <form action={formAction} className="space-y-6 sm:space-y-8">
            <input type="hidden" name="businessId" value={businessId} />

            {/* GRID */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              {/* BUSINESS NAME */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Building2 className="size-4 text-blue-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Business Name
                  </p>
                </div>
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter business name"
                  className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0 sm:h-12"
                />
                <InputFieldError field="name" state={state} />
              </div>

              {/* EMAIL */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="size-4 text-emerald-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Business Email
                  </p>
                </div>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="business@email.com"
                  className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0 sm:h-12"
                />
                <InputFieldError field="email" state={state} />
              </div>

              {/* CATEGORY */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="size-4 text-violet-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Category
                  </p>
                </div>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white focus:ring-0 sm:h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#050816] text-white">
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
                <input type="hidden" name="category" value={form.category} />
                <InputFieldError field="category" state={state} />
              </div>

              {/* PHONE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="size-4 text-amber-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Phone
                  </p>
                </div>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+8801XXXXXXXXX"
                  className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0 sm:h-12"
                />
                <InputFieldError field="phone" state={state} />
              </div>

              {/* ADDRESS */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5 md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="size-4 text-red-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Address
                  </p>
                </div>
                <Input
                  name="address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Enter business address"
                  className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0 sm:h-12"
                />
                <InputFieldError field="address" state={state} />
              </div>

              {/* WEBSITE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="size-4 text-cyan-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Website
                  </p>
                </div>
                <Input
                  name="website"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  placeholder="https://yourwebsite.com"
                  className="h-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0 sm:h-12"
                />
                <InputFieldError field="website" state={state} />
              </div>

              {/* LOGO */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ImageIcon className="size-4 text-pink-400" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                    Business Logo
                  </p>
                </div>

                {/* Hidden real file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />

                {logoFile && logoPreview ? (
                  /* NEW FILE SELECTED */
                  <div className="flex h-11 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 sm:h-12">
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
                      aria-label="Remove selected logo"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : form.logoUrl ? (
                  /* EXISTING LOGO FROM DB */
                  <div className="flex h-11 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 sm:h-12">
                    <Image
                      src={form.logoUrl}
                      alt="Current business logo"
                      width={28}
                      height={28}
                      unoptimized
                      className="h-7 w-7 rounded-lg object-cover"
                    />
                    <span className="flex-1 truncate text-sm text-slate-400">
                      Current logo
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400 transition-colors duration-200 hover:border-blue-500/30 hover:text-blue-400"
                    >
                      Replace
                    </button>
                  </div>
                ) : (
                  /* NO LOGO YET */
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-11 w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/3 px-4 text-left transition-all duration-200 hover:border-pink-500/30 hover:bg-pink-500/5 sm:h-12"
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
              </div>

              {fileError && (
                <p className="mt-1.5 text-xs text-red-400">{fileError}</p>
              )}
            </div>

            {/* ERROR */}
            {!isPending && state?.success === false && !state.errors && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">
                  {state.error ?? "Failed to update business."}
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {state?.success && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-sm text-emerald-400">
                  Business updated successfully
                </p>
              </div>
            )}

            {/* ACTION */}
            <div className="flex justify-end pt-1 sm:pt-2">
              <Button
                type="submit"
                disabled={isPending || !businessId}
                className="group h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] sm:w-auto"
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
