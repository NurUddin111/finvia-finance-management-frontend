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
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-80 w-[320px] rounded-full bg-blue-500/8 blur-3xl" />

        <div className="absolute right-0 top-0 h-80 w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* LEFT */}
        <div>
          {/* BADGE */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Why Finvia
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Focus on growth,
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              not paperwork
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Finvia helps modern businesses reduce manual work, organize
            operations, and manage invoices, clients, and payments from one
            powerful workspace.
          </p>

          {/* BENEFITS */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6 lg:p-7">
            {/* TOP */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Revenue Overview
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
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
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/3 p-4 transition-all duration-300 hover:border-blue-500/10 hover:bg-blue-500/3"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                      <div className="h-4 w-4 rounded-full bg-blue-400" />
                    </div>

                    <div>
                      <div className="h-3 w-28 rounded-full bg-white/10" />

                      <div className="mt-2 h-2 w-20 rounded-full bg-white/5" />
                    </div>
                  </div>

                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                    <span className="text-xs font-medium text-emerald-400">
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-6 rounded-3xl border border-white/5 bg-white/3 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Monthly Growth
                  </p>

                  <h4 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    32%
                  </h4>
                </div>

                {/* BARS */}
                <div className="flex items-end gap-2">
                  <div className="h-10 w-3 rounded-full bg-white/10" />

                  <div className="h-14 w-3 rounded-full bg-blue-500/40" />

                  <div className="h-20 w-3 rounded-full bg-blue-400" />

                  <div className="h-12 w-3 rounded-full bg-violet-500/50" />
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
    <div className="group rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${color}`}
      >
        <Icon className="size-5" />
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
