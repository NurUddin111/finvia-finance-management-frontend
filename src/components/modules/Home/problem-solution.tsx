"use client";

import { CheckCircle2, Sparkles, XCircle } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-70 w-70 rounded-full bg-red-500/6 blur-3xl" />

        <div className="absolute right-0 top-1/4 h-80 w-[320px] rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              The Problem & The Solution
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            From messy workflows
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              to organized business operations
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Most businesses still manage invoices, payments, and client records
            manually. Finvia brings everything together into one clean, modern
            workspace.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* PROBLEMS */}
          <div className="group relative overflow-hidden rounded-4xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6 transition-all duration-300 hover:border-red-500/20 hover:shadow-[0_0_50px_rgba(239,68,68,0.08)] sm:p-7 lg:p-8">
            {/* GLOW */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

            {/* TOP */}
            <div className="relative flex items-start gap-4">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <XCircle className="size-6 text-red-400" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-red-400">
                  Common Problems
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Business chaos
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Scattered invoices, manual calculations, and unclear payment
                  tracking slow down productivity and create unnecessary stress.
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="relative mt-8 space-y-4">
              <ProblemItem text="Invoices scattered across WhatsApp, Excel, and PDFs" />

              <ProblemItem text="No clear idea who has paid and who hasn’t" />

              <ProblemItem text="Clients repeatedly asking for invoice copies" />

              <ProblemItem text="Manual calculations causing mistakes and stress" />
            </div>
          </div>

          {/* SOLUTION */}
          <div className="group relative overflow-hidden rounded-4xl border border-blue-500/15 bg-linear-to-b from-[#0B1120] to-[#050816] p-6 transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] sm:p-7 lg:p-8">
            {/* GLOW */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/12 blur-3xl" />

            {/* TOP */}
            <div className="relative flex items-start gap-4">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <CheckCircle2 className="size-6 text-blue-400" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                  Finvia Solution
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Complete clarity
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  A modern workspace that helps you manage invoices, clients,
                  products, and payments with confidence and simplicity.
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="relative mt-8 space-y-4">
              <SolutionItem text="All invoices organized in one clean dashboard" />

              <SolutionItem text="Real-time payment status at a glance" />

              <SolutionItem text="Auto-generated, shareable invoices for clients" />

              <SolutionItem text="Accurate totals with zero manual calculations" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* HELPERS */
/* ---------------------------------- */

function ProblemItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-red-500/10 hover:bg-red-500/3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
        <XCircle className="size-3.5 text-red-400" />
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-blue-500/10 hover:bg-blue-500/3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
        <CheckCircle2 className="size-3.5 text-blue-400" />
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}
