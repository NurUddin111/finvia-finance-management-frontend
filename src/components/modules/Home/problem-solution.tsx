"use client";

import { CheckCircle2, Sparkles, XCircle } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-52 w-52 rounded-full bg-red-500/6 blur-3xl sm:h-64 sm:w-64" />

        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
            <Sparkles className="size-3.5 shrink-0 text-blue-400 sm:size-4" />

            <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
              The Problem & The Solution
            </span>
          </div>

          <h2 className="text-2xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[2.3rem]">
            From messy workflows
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              to organized business operations
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
            Most businesses still manage invoices, payments, and client records
            manually. Finvia brings everything together into one clean, modern
            workspace.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-3 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-5">
          {/* PROBLEMS */}
          <div className="group relative overflow-hidden rounded-3xl border border-red-500/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-red-500/20 hover:shadow-[0_0_50px_rgba(239,68,68,0.08)] sm:p-5 lg:p-6">
            {/* GLOW */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" />

            {/* TOP */}
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <XCircle className="size-5 text-red-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-red-400 sm:text-xs sm:tracking-[0.18em]">
                  Common Problems
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-xl">
                  Business chaos
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Scattered invoices, manual calculations, and unclear payment
                  tracking slow down productivity and create unnecessary stress.
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="relative mt-5 space-y-2">
              <ProblemItem text="Invoices scattered across WhatsApp, Excel, and PDFs" />

              <ProblemItem text="No clear idea who has paid and who hasn’t" />

              <ProblemItem text="Clients repeatedly asking for invoice copies" />

              <ProblemItem text="Manual calculations causing mistakes and stress" />
            </div>
          </div>

          {/* SOLUTION */}
          <div className="group relative overflow-hidden rounded-3xl border border-blue-500/15 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] sm:p-5 lg:p-6">
            {/* GLOW */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/12 blur-3xl" />

            {/* TOP */}
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <CheckCircle2 className="size-5 text-blue-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-xs sm:tracking-[0.18em]">
                  Finvia Solution
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-xl">
                  Complete clarity
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  A modern workspace that helps you manage invoices, clients,
                  products, and payments with confidence and simplicity.
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="relative mt-5 space-y-2">
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
function ProblemItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/2 p-3 transition-all duration-300 hover:border-red-500/10 hover:bg-red-500/3 sm:p-3.5">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
        <XCircle className="size-3 text-red-400" />
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/2 p-3 transition-all duration-300 hover:border-blue-500/10 hover:bg-blue-500/3 sm:p-3.5">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
        <CheckCircle2 className="size-3 text-blue-400" />
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}
