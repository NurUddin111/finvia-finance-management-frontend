"use client";

import { useState } from "react";

import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  BriefcaseBusiness,
  ImageIcon,
  Lock,
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

const demoBusinessForm = {
  name: "Finvia Demo",

  email: "demo@finvia.app",

  category: "SOFTWARE_COMPANY",

  phone: "01700-000001",

  address: "Dhaka, Bangladesh",

  website: "https://finvia.app",

  logoUrl: "",
};

export default function DemoBusinessPage() {
  const [showNudge, setShowNudge] = useState(false);

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
                Demo Business
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Business Details
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Explore how business profile management works in Finvia&apos;s
                dashboard experience.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="space-y-8">
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
                  value={demoBusinessForm.name}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
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
                  value={demoBusinessForm.email}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
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

                <Select value={demoBusinessForm.category} disabled>
                  <SelectTrigger className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400 opacity-70">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-[#050816] text-white">
                    <SelectItem value="SOFTWARE_COMPANY">
                      Software Company
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                  value={demoBusinessForm.phone}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
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
                  value={demoBusinessForm.address}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
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
                  value={demoBusinessForm.website}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
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
                  value={demoBusinessForm.logoUrl}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
                />
              </div>
            </div>

            {/* ACTION */}
            <div className="relative flex justify-end pt-2">
              <Button
                onClick={() => setShowNudge((v) => !v)}
                className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
              >
                <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                Save Changes
              </Button>

              {showNudge && (
                <div className="absolute -top-14 right-0 z-50 flex items-center gap-2 rounded-2xl border border-red-500/15 bg-[#140809] px-4 py-3 shadow-2xl">
                  <Lock className="size-3.5 shrink-0 text-red-400" />

                  <p className="text-xs font-medium text-red-300">
                    Sign up to edit your business
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
