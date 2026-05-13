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
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-75 w-75 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Core Features
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              to run your business
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Powerful tools designed to simplify invoicing, payments, client
            management, and business operations — all inside one premium
            workspace.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)] sm:p-7">
      {/* GLOW */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${glow}`}
      />

      <div className="relative">
        {/* ICON */}
        <div
          className={`flex h-13 w-13 items-center justify-center rounded-2xl border ${iconStyle}`}
        >
          <Icon className="size-5" />
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-6 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />
      </div>
    </div>
  );
}
