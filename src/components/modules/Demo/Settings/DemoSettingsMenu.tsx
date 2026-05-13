// src/components/modules/Demo/Settings/DemoSettingsMenu.tsx
"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Settings, User, Building2, Shield, LogOut, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const settingsItems = [
  {
    label: "Profile",
    slug: "profile",
    icon: User,
  },

  {
    label: "Business",
    slug: "business",
    icon: Building2,
  },

  {
    label: "Account",
    slug: "account",
    icon: Shield,
  },

  {
    label: "Password",
    slug: "password",
    icon: Lock,
  },
];

interface SettingsAccordionProps {
  basePath?: string;
}

export default function DemoSettingsAccordion({
  basePath = "/demo/dashboard/settings",
}: SettingsAccordionProps) {
  const pathname = usePathname();

  const isSettingsRoute = pathname.startsWith(basePath);

  const [openLogout, setOpenLogout] = useState(false);

  const [showNudge, setShowNudge] = useState(false);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue={isSettingsRoute ? "settings" : undefined}
      >
        <AccordionItem value="settings" className="border-none">
          {/* TRIGGER */}
          <AccordionTrigger
            className={cn(
              "group relative flex h-12 items-center rounded-2xl border px-4 text-sm font-medium no-underline transition-all duration-300 hover:no-underline",

              isSettingsRoute
                ? "border-blue-500/20 bg-blue-500/10 text-white shadow-[0_0_30px_rgba(59,130,246,0.12)]"
                : "border-transparent text-slate-400 hover:border-white/8 hover:bg-white/4 hover:text-white",
            )}
          >
            {/* ACTIVE BAR */}
            {isSettingsRoute && (
              <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-400" />
            )}

            <div className="flex items-center gap-3">
              {/* ICON */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300",

                  isSettingsRoute
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                    : "border-white/8 bg-white/4 text-slate-500 group-hover:text-slate-300",
                )}
              >
                <Settings size={16} />
              </div>

              <span className="truncate">Settings</span>
            </div>
          </AccordionTrigger>

          {/* CONTENT */}
          <AccordionContent className="mt-2 space-y-2 pl-5">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              const isActive = pathname.endsWith(item.slug);

              return (
                <Link
                  key={item.slug}
                  href={`${basePath}/${item.slug}`}
                  className={cn(
                    "group flex h-11 items-center gap-3 rounded-2xl border px-4 text-sm transition-all duration-300",

                    isActive
                      ? "border-blue-500/15 bg-blue-500/8 text-white"
                      : "border-transparent text-slate-500 hover:border-white/8 hover:bg-white/3 hover:text-slate-300",
                  )}
                >
                  {/* ICON */}
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-300",

                      isActive
                        ? "border-blue-500/15 bg-blue-500/10 text-blue-400"
                        : "border-white/8 bg-white/4 text-slate-500 group-hover:text-slate-300",
                    )}
                  >
                    <Icon size={14} />
                  </div>

                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            {/* LOGOUT */}
            <button
              onClick={() => setOpenLogout(true)}
              className="group flex h-11 w-full items-center gap-3 rounded-2xl border border-transparent px-4 text-sm text-red-400 transition-all duration-300 hover:border-red-500/15 hover:bg-red-500/8 hover:text-red-300"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/10">
                <LogOut size={14} />
              </div>

              <span>Logout</span>
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* LOGOUT MODAL */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-sm">
          {/* HEADER */}
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

          {/* BODY */}
          <div className="px-5 py-5">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Demo mode does not allow logout functionality.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="relative mt-5 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenLogout(false)}
                className="h-10 flex-1 rounded-xl border-white/10 bg-white/3 text-sm text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={() => setShowNudge((v) => !v)}
                className="h-10 flex-1 rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                <LogOut className="size-4" />
                Logout
              </Button>

              {showNudge && (
                <div className="absolute -top-14 right-0 z-50 flex items-center gap-2 rounded-2xl border border-red-500/15 bg-[#140809] px-4 py-3 shadow-2xl whitespace-nowrap">
                  <Lock className="size-3.5 shrink-0 text-red-400" />

                  <p className="text-xs font-medium text-red-300">
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
