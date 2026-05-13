"use client";

import { BadgeCheck, Lock, Server, ShieldCheck, Sparkles } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-75 w-75 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="absolute right-0 top-0 h-80 w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Trusted & Secure
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for reliability,
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              security & peace of mind
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Finvia follows modern security practices and reliable infrastructure
            standards to keep your business data protected, private, and always
            accessible.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <TrustCard
            icon={ShieldCheck}
            title="Data encryption"
            description="Sensitive business data is encrypted both in transit and at rest."
            color="border-blue-500/20 bg-blue-500/10 text-blue-400"
            glow="bg-blue-500/10"
          />

          <TrustCard
            icon={Lock}
            title="Privacy first"
            description="Your business information remains private and never shared externally."
            color="border-violet-500/20 bg-violet-500/10 text-violet-400"
            glow="bg-violet-500/10"
          />

          <TrustCard
            icon={BadgeCheck}
            title="Reliable systems"
            description="Built on scalable infrastructure designed for stability and performance."
            color="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            glow="bg-emerald-500/10"
          />

          <TrustCard
            icon={Server}
            title="Automatic backups"
            description="Regular backups help ensure your business data is never lost."
            color="border-amber-500/20 bg-amber-500/10 text-amber-400"
            glow="bg-amber-500/10"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* TRUST CARD */
/* ---------------------------------- */

function TrustCard({
  icon: Icon,
  title,
  description,
  color,
  glow,
}: {
  icon: React.ElementType;

  title: string;

  description: string;

  color: string;

  glow: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/15 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)] sm:p-7">
      {/* GLOW */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${glow}`}
      />

      <div className="relative">
        {/* ICON */}
        <div
          className={`mx-auto flex h-15 w-15 items-center justify-center rounded-3xl border ${color}`}
        >
          <Icon className="size-6" />
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

        {/* LINE */}
        <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
