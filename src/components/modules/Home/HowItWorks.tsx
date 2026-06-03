import {
  ArrowRight,
  Building2,
  CreditCard,
  Sparkles,
  UserPlus,
} from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
            <Sparkles className="size-3.5 shrink-0 text-blue-400 sm:size-4" />

            <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
              How It Works
            </span>
          </div>

          <h2
            id="how-it-works-heading"
            className="text-2xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[2.3rem]"
          >
            Get started
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              in just a few minutes
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
            Finvia is designed to be simple from day one — no complicated setup,
            no overwhelming workflows, and no learning curve.
          </p>
        </div>

        {/* STEPS */}
        <div className="relative mt-6 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {/* CONNECTOR */}
          <div className="pointer-events-none absolute left-1/2 top-16 hidden h-px w-[62%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent lg:block" />

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
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)] sm:p-5 lg:p-6">
      {/* STEP NUMBER */}
      <div className="absolute right-4 top-4 text-4xl font-semibold tracking-tight text-white/3 sm:right-5 sm:top-5 sm:text-5xl">
        {step}
      </div>

      {/* ICON */}
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border ${color} sm:h-14 sm:w-14`}
      >
        <Icon className="size-5 sm:size-6" />
      </div>

      {/* CONTENT */}
      <div className="relative mt-5">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.18em]">
          Step {step}
          <ArrowRight className="size-3" />
        </span>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
