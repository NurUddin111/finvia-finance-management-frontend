"use client";

import { useState } from "react";

import {
  User2,
  Phone,
  ShieldCheck,
  MapPin,
  Camera,
  Sparkles,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const demoProfileForm = {
  name: "Demo User",

  phone: "01700-000000",

  avatar: "",

  role: "BUSINESS_OWNER",

  address: "Dhaka, Bangladesh",
};

export default function DemoProfilePage() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <User2 className="size-6 text-blue-400" />
            </div>

            <div>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                Demo Profile
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Profile Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Explore how profile management works in Finvia&apos;s business
                dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="space-y-8">
            {/* PROFILE CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 rounded-3xl border border-white/10">
                    <AvatarImage src={demoProfileForm.avatar} />

                    <AvatarFallback className="rounded-3xl bg-blue-500/10 text-2xl font-semibold text-blue-400">
                      D
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <Camera className="size-4 text-blue-400" />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Profile Picture URL
                  </p>

                  <Input
                    value={demoProfileForm.avatar}
                    disabled
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400 placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* NAME */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <User2 className="size-4 text-blue-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Full Name
                  </p>
                </div>

                <Input
                  value={demoProfileForm.name}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
                />
              </div>

              {/* PHONE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="size-4 text-emerald-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Phone
                  </p>
                </div>

                <Input
                  value={demoProfileForm.phone}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
                />
              </div>

              {/* ROLE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-violet-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Role
                  </p>
                </div>

                <Input
                  value={demoProfileForm.role}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400"
                />
              </div>

              {/* ADDRESS */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="size-4 text-amber-400" />

                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Address
                  </p>
                </div>

                <Input
                  value={demoProfileForm.address}
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
                    Sign up to edit your profile
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
