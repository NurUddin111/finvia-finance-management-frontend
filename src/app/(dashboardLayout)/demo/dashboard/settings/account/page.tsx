"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Building2,
  ShieldAlert,
  Trash2,
  Lock,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DemoAccountPage() {
  const [nudge, setNudge] = useState<"business" | "account" | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* BACK BUTTON */}
        <div className="lg:hidden">
          <button
            onClick={() => router.back()}
            className="group inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
          >
            <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>
        {/* HEADER */}
        <div className="rounded-3xl border border-red-500/15 bg-linear-to-b from-[#140809] to-[#050816] p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <ShieldAlert className="size-6 text-red-400" />
            </div>

            <div className="min-w-0">
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-red-400">
                Demo Danger Zone
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Account Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Explore how destructive account actions are handled in
                Finvia&apos;s business dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-5">
          {/* DELETE BUSINESS */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10">
                  <Building2 className="size-5 text-red-400" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-white">
                    Delete Business
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    Permanently delete your business, invoices, products,
                    clients, and all related records. This action cannot be
                    undone.
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col items-stretch gap-3 sm:items-end">
                <Button
                  onClick={() =>
                    setNudge((v) => (v === "business" ? null : "business"))
                  }
                  className="h-11 w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] sm:w-auto"
                >
                  <Trash2 className="size-4" />
                  Delete Business
                </Button>

                {nudge === "business" && (
                  <div className="absolute -top-18 right-0 left-0 z-50 mx-auto flex w-fit max-w-65 items-center gap-2 rounded-2xl border border-red-500/15 bg-[#140809] px-4 py-3 shadow-2xl sm:left-auto sm:mx-0">
                    <Lock className="size-3.5 shrink-0 text-red-400" />

                    <p className="text-xs font-medium text-red-300">
                      Sign up to manage your business
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10">
                  <AlertTriangle className="size-5 text-red-400" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-white">
                    Delete Account
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    Permanently remove your account and all related data. You
                    will be logged out immediately after deletion.
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col items-stretch gap-3 sm:items-end">
                <Button
                  onClick={() =>
                    setNudge((v) => (v === "account" ? null : "account"))
                  }
                  className="h-11 w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] sm:w-auto"
                >
                  <Trash2 className="size-4" />
                  Delete Account
                </Button>

                {nudge === "account" && (
                  <div className="absolute -top-18 right-0 left-0 z-50 mx-auto flex w-fit max-w-65 items-center gap-2 rounded-2xl border border-red-500/15 bg-[#140809] px-4 py-3 shadow-2xl sm:left-auto sm:mx-0">
                    <Lock className="size-3.5 shrink-0 text-red-400" />

                    <p className="text-xs font-medium text-red-300">
                      Sign up to manage your account
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
