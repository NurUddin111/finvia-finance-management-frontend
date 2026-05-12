"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AlertTriangle, Building2, ShieldAlert, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getMyBusiness } from "@/services/business/getMyBusiness";

import { getMyProfile } from "@/services/user/getMe";

import { deleteMyAccount } from "@/services/user/deleteAccount";

import { deleteMyBusiness } from "@/services/business/deleteBusiness";

export default function AccountPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");

  const [businessId, setBusinessId] = useState<string>("");

  const [openAccount, setOpenAccount] = useState(false);

  const [openBusiness, setOpenBusiness] = useState(false);

  const [loading, setLoading] = useState(false);

  /* FETCH IDS */

  useEffect(() => {
    const fetchIds = async () => {
      const profileRes = await getMyProfile();

      if (profileRes?.success) {
        setUserId(profileRes.data.id);
      }

      const businessRes = await getMyBusiness();

      if (businessRes?.success) {
        setBusinessId(businessRes.data.id);
      }
    };

    fetchIds();
  }, []);

  /* ACTIONS */

  const handleDeleteAccount = async () => {
    if (!userId) return;

    setLoading(true);

    const res = await deleteMyAccount(userId);

    setLoading(false);

    if (res?.success) {
      router.push("/login");
    }
  };

  const handleDeleteBusiness = async () => {
    if (!businessId) return;

    setLoading(true);

    const res = await deleteMyBusiness(businessId);

    setLoading(false);

    if (res?.success) {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-red-500/15 bg-linear-to-b from-[#140809] to-[#050816] p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <ShieldAlert className="size-6 text-red-400" />
            </div>

            <div>
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-red-400">
                Danger Zone
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Account Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                These actions are permanent and irreversible. Please proceed
                carefully before deleting your business or account.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-5">
          {/* DELETE BUSINESS */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10">
                  <Building2 className="size-5 text-red-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Delete Business
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    Permanently delete your business, invoices, products,
                    clients, and all related records. This action cannot be
                    undone.
                  </p>
                </div>
              </div>

              <Button
                disabled={!businessId}
                onClick={() => setOpenBusiness(true)}
                className="h-11 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
              >
                <Trash2 className="size-4" />
                Delete Business
              </Button>
            </div>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10">
                  <AlertTriangle className="size-5 text-red-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Delete Account
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    Permanently remove your account and all related data. You
                    will be logged out immediately after deletion.
                  </p>
                </div>
              </div>

              <Button
                disabled={!userId}
                onClick={() => setOpenAccount(true)}
                className="h-11 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
              >
                <Trash2 className="size-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE BUSINESS MODAL */}
      <Dialog open={openBusiness} onOpenChange={setOpenBusiness}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-md">
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-6 py-6">
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                  <Building2 className="size-6 text-red-400" />
                </div>
              </div>

              <DialogTitle className="text-center text-2xl font-semibold text-white">
                Delete Business
              </DialogTitle>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                This action is permanent and cannot be undone.
              </p>
            </DialogHeader>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Deleting your business will remove all invoices, clients,
                products, and related business records.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenBusiness(false)}
                className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                disabled={loading}
                onClick={handleDeleteBusiness}
                className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE ACCOUNT MODAL */}
      <Dialog open={openAccount} onOpenChange={setOpenAccount}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-md">
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-6 py-6">
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                  <AlertTriangle className="size-6 text-red-400" />
                </div>
              </div>

              <DialogTitle className="text-center text-2xl font-semibold text-white">
                Delete Account
              </DialogTitle>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                Your account and all data will be permanently removed.
              </p>
            </DialogHeader>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                This will permanently erase your account and log you out
                immediately from Finvia.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenAccount(false)}
                className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                disabled={loading}
                onClick={handleDeleteAccount}
                className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
