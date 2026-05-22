"use client";

import { useState } from "react";

import {
  ChevronLeft,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import ChangePasswordModal from "@/components/modules/Auth/ChangePasswordModal";

export default function PasswordPage() {
  const router = useRouter();

  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-350 flex-col gap-5 lg:gap-6">
        {/* BACK BUTTON */}
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
        <div className="rounded-3xl border border-blue-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-14 sm:w-14">
              <ShieldCheck className="size-5 text-blue-400 sm:size-6" />
            </div>

            <div className="min-w-0">
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
                Security Settings
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Password Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Protect your account by using a strong password and updating it
                regularly for better security.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-12 sm:w-12">
                <LockKeyhole className="size-4 text-blue-400 sm:size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-white sm:text-lg">
                  Change Password
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Make sure your new password is secure, unique, and not used
                  anywhere else. Regular password updates improve your account
                  safety.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <Button
              onClick={() => setOpenChangePassword(true)}
              className="group h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] sm:w-auto"
            >
              <KeyRound className="size-4 transition-transform duration-300 group-hover:rotate-12" />

              <span className="flex items-center gap-2">
                Change Password
                <Sparkles className="size-3.5 opacity-70" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </div>
  );
}
