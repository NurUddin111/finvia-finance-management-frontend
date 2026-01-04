"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { logoutUser } from "@/services/auth/logout";

const settingsItems = [
  { label: "Profile", slug: "profile", icon: User },
  { label: "Business", slug: "business", icon: Building2 },
  { label: "Account", slug: "account", icon: Shield },
  { label: "Password", slug: "password", icon: Lock },
];

export default function SettingsAccordion() {
  const pathname = usePathname();
  const isSettingsRoute = pathname.startsWith("/business/dashboard/settings");
  const [openLogout, setOpenLogout] = useState(false);
  const router = useRouter();

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
                  href={`/business/dashboard/settings/${item.slug}`}
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
        <DialogContent className="max-w-sm bg-black">
          <DialogHeader>
            <DialogTitle className="text-red-600">Logout</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out from your account?
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenLogout(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={async () => {
                await logoutUser();
                router.refresh(); 
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
