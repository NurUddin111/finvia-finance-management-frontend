import { CircleAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "The payment process was cancelled before completion.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl border border-amber-500/20 bg-amber-500/10">
            <CircleAlert className="size-10 text-amber-400" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">
            Payment Cancelled
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Your payment process was cancelled before completion.
          </p>

          <div className="mt-6 rounded-2xl border border-amber-500/15 bg-amber-500/5 p-4">
            <p className="text-sm leading-relaxed text-slate-300">
              No payment was charged and your subscription remains unchanged.
              You can start the payment process again whenever you&apos;re
              ready.
            </p>
          </div>

          <p className="mt-5 text-xs text-slate-500">
            You may now close this page.
          </p>
        </div>
      </div>
    </main>
  );
}
