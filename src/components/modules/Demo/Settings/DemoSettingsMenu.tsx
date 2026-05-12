"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings, User, Building2, Shield, LogOut, Lock } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const settingsItems = [
  { label: "Profile", slug: "profile", icon: User },
  { label: "Business", slug: "business", icon: Building2 },
  { label: "Account", slug: "account", icon: Shield },
  { label: "Password", slug: "password", icon: Lock },
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
          <AccordionTrigger
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm no-underline hover:no-underline ${
              isSettingsRoute
                ? "bg-white/10 border border-white/20 text-white"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings size={18} className="shrink-0" />
              <span className="font-medium">Settings</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="mt-1 space-y-1 pl-9">
            {settingsItems.map((item) => {
              const isActive = pathname.endsWith(item.slug);
              const Icon = item.icon;

              return (
                <Link
                  key={item.slug}
                  href={`${basePath}/${item.slug}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => setOpenLogout(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
                You will be signed out from your current session and redirected
                to the login page.
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
