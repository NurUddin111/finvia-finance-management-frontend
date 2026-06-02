"use client";

import Link from "next/link";

import { useState } from "react";

import {
  Building2,
  ChevronRight,
  Lock,
  LogOut,
  Settings2,
  Shield,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const settingsItems = [
  {
    label: "Profile",
    slug: "profile",
    icon: User,
    color: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  {
    label: "Business",
    slug: "business",
    icon: Building2,
    color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    label: "Password",
    slug: "password",
    icon: Lock,
    color: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },

  {
    label: "Account",
    slug: "account",
    icon: Shield,
    color: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },
];

export default function DemoSettingsIndexPage() {
  const [openLogout, setOpenLogout] = useState(false);

  const [showNudge, setShowNudge] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#050816] px-3 py-4 lg:hidden">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-5">
          {/* HEADER */}
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-12 sm:w-12">
                <Settings2 className="size-4 text-blue-400 sm:size-5" />
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Settings
                </h1>

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Explore demo settings and account preferences.
                </p>
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-3">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.slug}
                  href={`/demo/dashboard/settings/${item.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/2 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${item.color}`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {item.label}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        Manage {item.label.toLowerCase()} settings
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="size-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-400" />
                </Link>
              );
            })}

            {/* LOGOUT */}
            <button
              onClick={() => setOpenLogout(true)}
              className="group flex w-full items-center justify-between gap-3 rounded-3xl border border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] p-4 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/6 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                  <LogOut className="size-4" />
                </div>

                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-medium text-red-400">
                    Logout
                  </p>

                  <p className="truncate text-xs text-red-300/60">
                    Exit demo dashboard session
                  </p>
                </div>
              </div>

              <ChevronRight className="size-4 shrink-0 text-red-400/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-sm">
          {/* HEADER */}
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-5 py-5 sm:px-6 sm:py-6">
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 sm:h-14 sm:w-14">
                  <LogOut className="size-5 text-red-400 sm:size-6" />
                </div>
              </div>

              <DialogTitle className="text-center text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Logout
              </DialogTitle>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                Are you sure you want to log out from your account?
              </p>
            </DialogHeader>
          </div>

          {/* BODY */}
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Demo mode does not allow logout functionality.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setOpenLogout(false)}
                className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-sm text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={() => setShowNudge((v) => !v)}
                className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                <LogOut className="size-4" />
                Logout
              </Button>

              {showNudge && (
                <div className="absolute -top-16 right-0 z-50 flex items-center gap-2 rounded-2xl border border-red-500/15 bg-[#140809] px-4 py-3 shadow-2xl">
                  <Lock className="size-3.5 shrink-0 text-red-400" />

                  <p className="whitespace-nowrap text-xs font-medium text-red-300">
                    Sign up to use this feature
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
