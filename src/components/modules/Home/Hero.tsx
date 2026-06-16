import Link from "next/link";
import { ArrowRight, Play, Sparkles, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-3 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl sm:h-128 sm:w-lg" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
              <Sparkles className="size-4 text-blue-400" />

              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
                Modern Business Workspace
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Run your business.
              <br />
              <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Not your spreadsheets.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Manage invoices, clients, payments and analytics from one modern
              workspace built for freelancers, agencies and growing businesses.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" scroll={false}>
                <Button className="group h-12 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-7 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)] sm:w-auto">
                  Get Started Free
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>

              <Link href="/demo/dashboard" scroll={false}>
                <Button
                  variant="outline"
                  className="group h-12 w-full rounded-2xl border border-white/10 bg-white/3 px-7 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white sm:w-auto"
                >
                  <Play className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  View Demo
                </Button>
              </Link>
            </div>

            {/* TRUST ROW */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400" />
                Invoice Management
              </div>

              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400" />
                Client Management
              </div>

              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400" />
                Revenue Analytics
              </div>

              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400" />
                Payment Tracking
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
