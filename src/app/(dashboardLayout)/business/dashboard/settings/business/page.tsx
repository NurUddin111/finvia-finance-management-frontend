"use client";

import { useEffect, useState } from "react";

import { useActionState } from "react";

import { useRouter } from "next/navigation";

import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  BriefcaseBusiness,
  ImageIcon,
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

import { getMyBusiness } from "@/services/business/getMyBusiness";

import { updateBusiness } from "@/services/business/updateBusiness";

type BusinessForm = {
  name: string;

  email: string;

  category: string;

  phone: string;

  address: string;

  website: string;

  logoUrl: string;
};

export default function EditBusinessPage() {
  const router = useRouter();

  const [businessId, setBusinessId] = useState<string>("");

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

  const [state, formAction, isPending] = useActionState(
    updateBusiness.bind(null, businessId),
    null,
  );

  /* FETCH BUSINESS */

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await getMyBusiness();

      if (res?.success) {
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

  /* LOADING */

  if (loading) {
    return (
      <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6">
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
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <Building2 className="size-6 text-blue-400" />
            </div>

            <div>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                Business Settings
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
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
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <form action={formAction} className="space-y-8">
            {/* GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* BUSINESS NAME */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Building2 className="size-4 text-blue-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Business Name
                  </p>
                </div>

                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      name: e.target.value,
                    })
                  }
                  placeholder="Enter business name"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>

              {/* EMAIL */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="size-4 text-emerald-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Business Email
                  </p>
                </div>

                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      email: e.target.value,
                    })
                  }
                  placeholder="business@email.com"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>

              {/* CATEGORY */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="size-4 text-violet-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Category
                  </p>
                </div>

                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm({
                      ...form,

                      category: v,
                    })
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white focus:ring-0">
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
              </div>

              {/* PHONE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="size-4 text-amber-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Phone
                  </p>
                </div>

                <Input
                  name="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      phone: e.target.value,
                    })
                  }
                  placeholder="+8801XXXXXXXXX"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>

              {/* ADDRESS */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5 md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="size-4 text-red-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Address
                  </p>
                </div>

                <Input
                  name="address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      address: e.target.value,
                    })
                  }
                  placeholder="Enter business address"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>

              {/* WEBSITE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="size-4 text-cyan-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Website
                  </p>
                </div>

                <Input
                  name="website"
                  value={form.website}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      website: e.target.value,
                    })
                  }
                  placeholder="https://yourwebsite.com"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>

              {/* LOGO */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ImageIcon className="size-4 text-pink-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Logo URL
                  </p>
                </div>

                <Input
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      logoUrl: e.target.value,
                    })
                  }
                  placeholder="https://logo.png"
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* STATE */}
            {state?.success === false && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">{state.error}</p>
              </div>
            )}

            {state?.success && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-sm text-emerald-400">
                  Business updated successfully
                </p>
              </div>
            )}

            {/* ACTION */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
              >
                <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />

                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
