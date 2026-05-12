"use client";

import { useState } from "react";

import { KeyRound, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import ChangePasswordModal from "@/components/modules/Auth/ChangePasswordModal";

export default function PasswordPage() {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-blue-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <ShieldCheck className="size-6 text-blue-400" />
            </div>

            <div>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                Security Settings
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
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
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <LockKeyhole className="size-5 text-blue-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
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
              className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
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
