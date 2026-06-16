import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Track revenue performance over time",
  "Monitor client growth and engagement",
  "Identify payment and sales trends",
  "Make smarter business decisions with data",
];

export default function AnalyticsShowcaseSection() {
  return (
    <section className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-cyan-500/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-400">
              Analytics & Insights
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Turn business data
              <br />
              into better decisions
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Understand how your business performs with real-time analytics,
              revenue tracking, client growth metrics, and actionable insights.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  </div>

                  <p className="pt-0.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-cyan-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1120] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/showcase/analytics.png"
                alt="Finvia Analytics Dashboard"
                width={1400}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
