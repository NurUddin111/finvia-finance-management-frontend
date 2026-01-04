"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

import { getMyProfile } from "@/services/user/getMe";
import { deleteMyAccount } from "@/services/user/deleteAccount";

export default function AccountPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  console.log(userId);

  const [openAccount, setOpenAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH IDS ================= */

  useEffect(() => {
    const fetchIds = async () => {
      const profileRes = await getMyProfile();
      if (profileRes?.success) {
        setUserId(profileRes.data.id);
      }
    };

    fetchIds();
  }, []);

  /* ================= ACTIONS ================= */

  const handleDeleteAccount = async () => {
    if (!userId) return;
    setLoading(true);

    const res = await deleteMyAccount(userId);

    if (res?.success) {
      router.refresh();
    }
    setLoading(false);
  };

  /* ================= UI ================= */

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
          {/* Delete Account */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Permanently remove your account and all related data. You will
                be logged out immediately.
              </p>
            </div>

            <Button
              variant="destructive"
              disabled={!userId}
              onClick={() => setOpenAccount(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= Delete Account Modal ================= */}
      <Dialog open={openAccount} onOpenChange={setOpenAccount}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This will permanently delete your account and all its data.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenAccount(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={loading}
              onClick={handleDeleteAccount}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
