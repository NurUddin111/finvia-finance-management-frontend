"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  Building2,
  ChevronLeft,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteMyAccount, getMe } from "@/services/auth.services";

import {
  deleteMyBusiness,
  getMyBusiness,
} from "@/services/business/business.services";

export default function AccountPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");

  const [businessId, setBusinessId] = useState("");

  const [openAccount, setOpenAccount] = useState(false);

  const [openBusiness, setOpenBusiness] = useState(false);

  const [loadingAccount, setLoadingAccount] = useState(false);

  const [loadingBusiness, setLoadingBusiness] = useState(false);

  /* FETCH IDS */
  useEffect(() => {
    const fetchIds = async () => {
      const profileRes = await getMe();

      if (profileRes?.data) {
        setUserId(profileRes.data.id);
      }

      const businessRes = await getMyBusiness();

      if (businessRes?.success && businessRes.data) {
        setBusinessId(businessRes.data.id);
      }
    };

    fetchIds();
  }, []);

  /* ACTIONS */
  const handleDeleteAccount = async () => {
    if (!userId) return;

    setLoadingAccount(true);

    const res = await deleteMyAccount(userId);

    setLoadingAccount(false);

    if (res?.success) {
      router.refresh();
    }
  };

  const handleDeleteBusiness = async () => {
    if (!businessId) return;

    setLoadingBusiness(true);

    const res = await deleteMyBusiness(businessId);

    setLoadingBusiness(false);

    if (res?.success) {
      setOpenBusiness(false);

      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-350 flex-col gap-5 lg:gap-6">
        {/* BACK BUTTON */}
        <div className="lg:hidden">
          <button
            onClick={() => router.back()}
            className="group inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
          >
            <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>

        {/* HEADER */}
        <div className="rounded-3xl border border-red-500/15 bg-linear-to-b from-[#140809] to-[#050816] p-4 sm:p-5 md:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 sm:h-14 sm:w-14">
              <ShieldAlert className="size-5 text-red-400 sm:size-6" />
            </div>

            <div className="min-w-0">
              <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-red-400 sm:text-[11.1px] sm:tracking-[0.18em]">
                Danger Zone
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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
        <div className="space-y-4 sm:space-y-5">
          {/* DELETE BUSINESS */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10 sm:h-12 sm:w-12">
                  <Building2 className="size-4 text-red-400 sm:size-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-white sm:text-lg">
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
                disabled={!businessId || loadingBusiness}
                onClick={() => setOpenBusiness(true)}
                className="h-11 w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] sm:w-auto"
              >
                <Trash2 className="size-4" />
                Delete Business
              </Button>
            </div>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10 sm:h-12 sm:w-12">
                  <AlertTriangle className="size-4 text-red-400 sm:size-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-white sm:text-lg">
                    Delete Account
                  </h2>

                  <div className="mt-3 space-y-3">
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
                      Permanently remove your account and all related data. You
                      will be logged out immediately after deletion.
                    </p>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                      <p className="text-sm font-medium text-amber-300">
                        ⚠️ Important: Before deleting your account, you must
                        delete all business data associated with your workspace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                disabled={!userId || loadingAccount}
                onClick={() => setOpenAccount(true)}
                className="h-11 w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] sm:w-auto"
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
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-5 py-5 sm:px-6 sm:py-6">
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 sm:h-14 sm:w-14">
                  <Building2 className="size-5 text-red-400 sm:size-6" />
                </div>
              </div>

              <DialogTitle className="text-center text-xl font-semibold text-white sm:text-2xl">
                Delete Business
              </DialogTitle>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                This action is permanent and cannot be undone.
              </p>
            </DialogHeader>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Deleting your business will remove all invoices, clients,
                products, and related business records.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setOpenBusiness(false)}
                disabled={loadingBusiness}
                className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                disabled={loadingBusiness}
                onClick={handleDeleteBusiness}
                className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                {loadingBusiness ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE ACCOUNT MODAL */}
      <Dialog open={openAccount} onOpenChange={setOpenAccount}>
        <DialogContent className="overflow-hidden border border-red-500/15 bg-[#050816] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:max-w-md">
          <div className="border-b border-red-500/10 bg-linear-to-b from-[#140809] to-[#050816] px-5 py-5 sm:px-6 sm:py-6">
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 sm:h-14 sm:w-14">
                  <AlertTriangle className="size-5 text-red-400 sm:size-6" />
                </div>
              </div>

              <DialogTitle className="text-center text-xl font-semibold text-white sm:text-2xl">
                Delete Account
              </DialogTitle>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                Your account and all data will be permanently removed.
              </p>
            </DialogHeader>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/8 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                This will permanently erase your account and log you out
                immediately from Finvia.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setOpenAccount(false)}
                disabled={loadingAccount}
                className="h-11 flex-1 rounded-2xl border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                disabled={loadingAccount}
                onClick={handleDeleteAccount}
                className="h-11 flex-1 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
              >
                {loadingAccount ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
