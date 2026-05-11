// src/app/(dashboardLayout)/demo/dashboard/settings/password/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function DemoPasswordPage() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="w-full max-w-5xl">
      <Card>
        <CardHeader className="border-b">
          <h2 className="text-lg font-semibold">Password</h2>
          <p className="text-sm text-muted-foreground">
            Update your account password. For security reasons, this action
            requires confirmation.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Make sure your new password is strong and not used anywhere
                else.
              </p>
            </div>

            <div className="relative">
              <Button variant="outline" onClick={() => setShowNudge((v) => !v)}>
                Change Password
              </Button>

              {showNudge && (
                <div className="absolute right-0 -top-12 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card bg-red-950 px-4 py-2.5 shadow-xl text-sm text-muted-foreground whitespace-nowrap">
                  <Lock size={13} className="text-primary shrink-0" />
                  Sign up to change your password
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
