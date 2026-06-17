"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loader2, LogOut, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { logoutUser } from "@/services/auth.services";
import Image from "next/image";

export default function OnboardingNav() {
  const [openLogout, setOpenLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* LEFT */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/15 sm:h-11 sm:w-11">
              <Image
                src="/favicon.ico"
                alt="Finvia"
                width={20}
                height={20}
                className="size-11"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight text-white">
                  Finvia
                </h1>

                <Sparkles className="size-3.5 text-blue-400" />
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Business Workspace
              </p>
            </div>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setOpenLogout(true)}
              className="group h-11 rounded-2xl border border-red-500/15 bg-red-500/8 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/12 hover:text-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.12)]"
            >
              <LogOut className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

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
                disabled={isLoggingOut}
                onClick={() => setOpenLogout(false)}
                className="h-10 flex-1 rounded-xl border-white/10 bg-white/3 text-sm text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                disabled={isLoggingOut}
                onClick={async () => {
                  try {
                    setIsLoggingOut(true);
                    await logoutUser();
                    router.push("/");
                  } finally {
                    setIsLoggingOut(false);
                  }
                }}
                className="h-10 flex-1 rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="size-4" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
