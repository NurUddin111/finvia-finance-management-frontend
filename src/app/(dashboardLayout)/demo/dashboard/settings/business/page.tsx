// src/app/(dashboardLayout)/demo/dashboard/settings/business/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";

const demoBusinessForm = {
  name: "Finvia Demo",
  email: "demo@finvia.app",
  category: "SOFTWARE_COMPANY",
  phone: "01700-000001",
  address: "Dhaka, Bangladesh",
  website: "https://finvia.app",
  logoUrl: "",
};

export default function DemoBusinessPage() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="w-full max-w-5xl">
      <Card>
        <CardHeader className="border-b">
          <h2 className="text-lg font-semibold">Business Details</h2>
          <p className="text-sm text-muted-foreground">
            Manage your company information and public business profile.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input value={demoBusinessForm.name} disabled />
              </div>

              <div className="space-y-2">
                <Label>Business Email</Label>
                <Input value={demoBusinessForm.email} disabled />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={demoBusinessForm.category} disabled>
                  <SelectTrigger className="w-full opacity-50 cursor-not-allowed">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black">
                    <SelectItem value="SOFTWARE_COMPANY">
                      Software Company
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={demoBusinessForm.phone} disabled />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Input value={demoBusinessForm.address} disabled />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={demoBusinessForm.website} disabled />
              </div>

              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input value={demoBusinessForm.logoUrl} disabled />
              </div>
            </div>

            <div className="flex justify-end pt-4 relative">
              <Button
                className="rounded-full px-6"
                onClick={() => setShowNudge((v) => !v)}
              >
                Save Changes
              </Button>

              {showNudge && (
                <div className="absolute right-0 -top-10 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card bg-red-950 px-4 py-2.5 shadow-xl text-sm text-muted-foreground whitespace-nowrap">
                  <Lock size={13} className="text-primary shrink-0" />
                  Sign up to edit your business
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
