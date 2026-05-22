"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth.services";

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
    label: "Account",
    slug: "account",
    icon: Shield,
    color: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },
  {
    label: "Password",
    slug: "password",
    icon: Lock,
    color: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
];

const BASE = "/business/dashboard/settings";

export default function MobileSettingsIndexPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);

  return (
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
                Manage your account and business preferences.
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            // FIX: match only the specific settings sub-route
            const active = pathname === `${BASE}/${item.slug}`;

            return (
              <Link
                key={item.slug}
                href={`${BASE}/${item.slug}`}
                className={`group flex items-center justify-between gap-3 rounded-3xl border p-4 transition-all duration-300 sm:p-5 ${active ? "border-blue-500/20 bg-blue-500/10" : "border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] hover:border-white/15 hover:bg-white/2"}`}
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
            className="group flex w-full items-center justify-between gap-3 rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/5 sm:p-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <LogOut className="size-4 text-red-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm text-left font-medium text-red-400">
                  Logout
                </p>
                <p className="truncate text-xs text-slate-500">
                  Sign out of your account
                </p>
              </div>
            </div>

            <ChevronRight className="size-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-sm">
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-5 py-5">
            <DialogHeader>
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                  <LogOut className="size-5 text-red-400" />
                </div>
              </div>

              <DialogTitle className="text-center text-xl font-semibold tracking-tight text-white">
                Logout
              </DialogTitle>

              <p className="mt-1 text-center text-xs leading-relaxed text-slate-400">
                Are you sure you want to log out from your account?
              </p>
            </DialogHeader>
          </div>

          <div className="px-5 py-5">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                You will be signed out from your current session and redirected
                to the login page.
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenLogout(false)}
                className="h-10 flex-1 rounded-xl border-white/10 bg-white/3 text-sm text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={async () => {
                  await logoutUser();
                  router.refresh();
                }}
                className="h-10 flex-1 rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
