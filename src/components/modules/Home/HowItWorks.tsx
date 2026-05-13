"use client";

import {
  ArrowRight,
  Building2,
  CreditCard,
  Sparkles,
  UserPlus,
} from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-80 w-[320px] -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get started
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              in just a few minutes
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Finvia is designed to be simple from day one — no complicated setup,
            no overwhelming workflows, and no learning curve.
          </p>
        </div>

        {/* STEPS */}
        <div className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {/* CONNECTOR */}
          <div className="pointer-events-none absolute left-1/2 top-18 hidden h-px w-[65%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent lg:block" />

          <StepCard
            step="01"
            icon={UserPlus}
            title="Create your account"
            description="Sign up and access your personalized Finvia workspace within seconds."
            color="border-blue-500/20 bg-blue-500/10 text-blue-400"
          />

          <StepCard
            step="02"
            icon={Building2}
            title="Set up your business"
            description="Add your business information to unlock invoices, clients, and analytics."
            color="border-violet-500/20 bg-violet-500/10 text-violet-400"
          />

          <StepCard
            step="03"
            icon={CreditCard}
            title="Manage & grow"
            description="Create invoices, track payments, manage clients, and monitor business growth."
            color="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* STEP CARD */
/* ---------------------------------- */

function StepCard({
  step,
  icon: Icon,
  title,
  description,
  color,
}: {
  step: string;

  icon: React.ElementType;

  title: string;

  description: string;

  color: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)] sm:p-7 lg:p-8">
      {/* STEP NUMBER */}
      <div className="absolute right-5 top-5 text-5xl font-semibold tracking-tight text-white/3">
        {step}
      </div>

      {/* ICON */}
      <div
        className={`mx-auto flex h-15 w-15 items-center justify-center rounded-3xl border ${color}`}
      >
        <Icon className="size-6" />
      </div>

      {/* CONTENT */}
      <div className="relative mt-7">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          Step {step}
          <ArrowRight className="size-3" />
        </span>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
