"use client";

import {
  Clock3,
  LineChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function WhyFinviaSection() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl sm:h-72 sm:w-72" />

        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        {/* LEFT */}
        <div>
          {/* BADGE */}
          <div className="mb-2 flex justify-center lg:justify-start">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
              <Sparkles className="size-3.5 shrink-0 text-blue-400 sm:size-4" />

              <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
                Why Finvia
              </span>
            </div>
          </div>

          {/* HEADING */}
          <h2 className="text-center text-2xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-left lg:text-[2.3rem]">
            Focus on growth,
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              not paperwork
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base lg:mx-0 lg:text-left">
            Finvia helps modern businesses reduce manual work, organize
            operations, and manage invoices, clients, and payments from one
            powerful workspace.
          </p>

          {/* BENEFITS */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Benefit
              icon={Clock3}
              title="Save 10+ hours weekly"
              description="Automate invoicing, reminders, and repetitive admin tasks."
              color="border-blue-500/20 bg-blue-500/10 text-blue-400"
            />

            <Benefit
              icon={Zap}
              title="Get paid faster"
              description="Reduce overdue invoices with streamlined payment workflows."
              color="border-violet-500/20 bg-violet-500/10 text-violet-400"
            />

            <Benefit
              icon={ShieldCheck}
              title="Secure & reliable"
              description="Built with modern infrastructure and protected business data."
              color="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            />

            <Benefit
              icon={LineChart}
              title="Real-time insights"
              description="Track revenue, payments, and client performance instantly."
              color="border-amber-500/20 bg-amber-500/10 text-amber-400"
            />
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">
          {/* GLOW */}
          <div className="absolute inset-0 rounded-[36px] bg-blue-500/10 blur-3xl" />

          {/* CARD */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-5 lg:p-6">
            {/* TOP */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                  Revenue Overview
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:mt-2 sm:text-2xl">
                  $12,450.00
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                <TrendingUp className="size-4 text-emerald-400" />

                <span className="text-sm font-medium text-emerald-400">
                  +18.2%
                </span>
              </div>
            </div>

            {/* LIST */}
            <div className="mt-5 space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/3 p-3 transition-all duration-300 hover:border-blue-500/10 hover:bg-blue-500/3 sm:p-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-12 sm:w-12">
                      <div className="h-3 w-3 rounded-full bg-blue-400 sm:h-4 sm:w-4" />
                    </div>

                    <div>
                      <div className="h-3 w-24 rounded-full bg-white/10 sm:w-28" />

                      <div className="mt-2 h-2 w-16 rounded-full bg-white/5 sm:w-20" />
                    </div>
                  </div>

                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 sm:px-3">
                    <span className="text-[11px] font-medium text-emerald-400 sm:text-xs">
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-5 rounded-3xl border border-white/5 bg-white/3 p-4 sm:p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
                    Monthly Growth
                  </p>

                  <h4 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:mt-2 sm:text-3xl">
                    32%
                  </h4>
                </div>

                {/* BARS */}
                <div className="flex items-end gap-2">
                  <div className="h-8 w-3 rounded-full bg-white/10 sm:h-10" />

                  <div className="h-12 w-3 rounded-full bg-blue-500/40 sm:h-14" />

                  <div className="h-16 w-3 rounded-full bg-blue-400 sm:h-20" />

                  <div className="h-10 w-3 rounded-full bg-violet-500/50 sm:h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* BENEFIT */
/* ---------------------------------- */

function Benefit({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] sm:p-5">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${color}`}
      >
        <Icon className="size-5" />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
