"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { logoutUser } from "@/services/auth/logout";
import { useRouter } from "next/navigation";

export default function OnboardingNav() {
  const [openLogout, setOpenLogout] = useState(false);
  const router = useRouter();
  return (
    <header className="h-16 border-b border-border">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Finvia<span className="text-primary">•</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setOpenLogout(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
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
                  You will be signed out from your current session and
                  redirected to the login page.
                </p>
              </div>

              {/* ACTIONS */}
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
    </header>
  );
}
