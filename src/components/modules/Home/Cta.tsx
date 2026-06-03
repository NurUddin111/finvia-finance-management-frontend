import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-80 w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-7 text-center shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
          {/* BADGE */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Ready When You Are
            </span>
          </div>

          {/* HEADING */}
          <h2
            id="cta-heading"
            className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Start managing your business
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              with Finvia today
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            No complicated setup. No overwhelming workflow. Just a clean, modern
            workspace to manage invoices, clients, payments, and business
            growth.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" scroll={false}>
              <Button className="group h-13 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-8 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)] sm:w-auto">
                Create Free Account
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Link>

            <Link href="/demo/dashboard" scroll={false}>
              <Button
                variant="outline"
                className="h-13 w-full rounded-2xl border border-white/10 bg-white/3 px-8 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white sm:w-auto"
              >
                Explore Demo
              </Button>
            </Link>
          </div>

          {/* FOOTER TEXT */}
          <p className="mt-7 text-xs leading-relaxed text-slate-500 sm:text-sm">
            No credit card required · Free onboarding · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
