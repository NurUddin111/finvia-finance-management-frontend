"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChangePasswordModal from "@/components/modules/Auth/ChangePasswordModal";

export default function PasswordPage() {
  const [openChangePassword, setOpenChangePassword] = useState(false);

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

            <Button
              variant="outline"
              onClick={() => setOpenChangePassword(true)}
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </div>
  );
}
