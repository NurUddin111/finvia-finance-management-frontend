"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  User,
  Building2,
  Shield,
  Lock,
  ChevronRight,
  Settings2,
} from "lucide-react";

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

export default function MobileSettingsIndexPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 md:hidden">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <Settings2 className="size-5 text-blue-400" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Settings
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Manage your account and business preferences.
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon;

            const active = pathname.includes(item.slug);

            return (
              <Link
                key={item.slug}
                href={`/business/dashboard/settings/${item.slug}`}
                className={`group flex items-center justify-between rounded-3xl border p-4 transition-all duration-300 ${
                  active
                    ? "border-blue-500/20 bg-blue-500/10"
                    : "border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] hover:border-white/15 hover:bg-white/2"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${item.color}`}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Manage {item.label.toLowerCase()} settings
                    </p>
                  </div>
                </div>

                <ChevronRight className="size-4 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
