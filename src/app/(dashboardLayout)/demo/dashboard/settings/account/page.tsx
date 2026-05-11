// src/app/(dashboardLayout)/demo/dashboard/settings/account/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, Lock } from "lucide-react";

export default function DemoAccountPage() {
  const [nudge, setNudge] = useState<"business" | "account" | null>(null);

  return (
    <div className="w-full max-w-5xl">
      <Card className="border-red-500/30">
        <CardHeader className="border-b bg-red-500/5">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={18} />
            <h2 className="text-lg font-semibold">Danger Zone</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Irreversible actions for your account.
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {/* Delete Business */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-medium">Delete Business</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Permanently delete your business, clients and invoices. This
                action cannot be undone.
              </p>
            </div>

            <div className="relative">
              <Button
                variant="destructive"
                onClick={() =>
                  setNudge((v) => (v === "business" ? null : "business"))
                }
              >
                Delete Business
              </Button>

              {nudge === "business" && (
                <div className="absolute right-0 -top-12 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card  bg-red-950 px-4 py-2.5 shadow-xl text-sm text-muted-foreground whitespace-nowrap">
                  <Lock size={13} className="text-primary shrink-0" />
                  Sign up to manage your business
                </div>
              )}
            </div>
          </div>

          <div className="border-t" />

          {/* Delete Account */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Permanently remove your account and all related data. You will
                be logged out immediately.
              </p>
            </div>

            <div className="relative">
              <Button
                variant="destructive"
                onClick={() =>
                  setNudge((v) => (v === "account" ? null : "account"))
                }
              >
                Delete Account
              </Button>

              {nudge === "account" && (
                <div className="absolute right-0 -top-12 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card  bg-red-950 px-4 py-2.5 shadow-xl text-sm text-muted-foreground whitespace-nowrap">
                  <Lock size={13} className="text-primary shrink-0" />
                  Sign up to manage your account
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
