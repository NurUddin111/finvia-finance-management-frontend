"use client";

import {
  BarChart3,
  Clock3,
  CreditCard,
  FileText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-52 w-52 rounded-full bg-blue-500/8 blur-3xl sm:h-64 sm:w-64" />

        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
            <Sparkles className="size-3.5 shrink-0 text-blue-400 sm:size-4" />

            <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
              Core Features
            </span>
          </div>

          <h2 className="text-2xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[2.3rem]">
            Everything you need
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              to run your business
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
            Powerful tools designed to simplify invoicing, payments, client
            management, and business operations — all inside one premium
            workspace.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          <FeatureCard
            icon={FileText}
            title="Smart Invoicing"
            description="Create, manage, and share professional invoices in seconds with a clean modern workflow."
            glow="bg-blue-500/10"
            iconStyle="border-blue-500/20 bg-blue-500/10 text-blue-400"
          />

          <FeatureCard
            icon={CreditCard}
            title="Payment Tracking"
            description="Monitor paid and unpaid invoices with real-time payment visibility and outstanding status tracking."
            glow="bg-emerald-500/10"
            iconStyle="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          />

          <FeatureCard
            icon={Users}
            title="Client Management"
            description="Keep all your clients, invoice history, and business relationships organized in one place."
            glow="bg-violet-500/10"
            iconStyle="border-violet-500/20 bg-violet-500/10 text-violet-400"
          />

          <FeatureCard
            icon={BarChart3}
            title="Business Insights"
            description="Understand revenue, payments, invoice trends, and business performance through visual analytics."
            glow="bg-amber-500/10"
            iconStyle="border-amber-500/20 bg-amber-500/10 text-amber-400"
          />

          <FeatureCard
            icon={Clock3}
            title="Time Saving"
            description="Automate repetitive tasks and reduce manual business management work across your workflow."
            glow="bg-cyan-500/10"
            iconStyle="border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
          />

          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Reliable"
            description="Built with modern standards to keep your business data protected, stable, and reliable."
            glow="bg-rose-500/10"
            iconStyle="border-rose-500/20 bg-rose-500/10 text-rose-400"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* FEATURE CARD */
/* ---------------------------------- */

function FeatureCard({
  icon: Icon,
  title,
  description,
  glow,
  iconStyle,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  glow: string;
  iconStyle: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)] sm:p-5">
      {/* GLOW */}
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${glow}`}
      />

      <div className="relative">
        {/* ICON */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${iconStyle}`}
        >
          <Icon className="size-5" />
        </div>

        {/* CONTENT */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-5 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />
      </div>
    </div>
  );
}
