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
      </div>
    </header>
  );
}
