"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  FileText,
  Sparkles,
  Users,
  BarChart3,
} from "lucide-react";
import AddBusinessModal from "@/components/modules/Business/AddBusinessModal";
import OnboardingNav from "@/components/shared/OnboardingNav";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [open, setOpen] = useState(false);

  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      desc: "Create modern invoices and track payment status instantly.",
    },
    {
      icon: Users,
      title: "Client Management",
      desc: "Organize clients, invoices, and transaction history.",
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      desc: "Monitor revenue, growth, and payment insights in real time.",
    },
  ];

  return (
    <>
      <OnboardingNav />

      <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#050816] px-4 py-8 lg:py-10">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-105 w-105 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-6xl items-start pt-6 md:items-center md:pt-0">
          <div className="grid w-full gap-8 md:grid-cols-2 md:items-center lg:gap-10">
            {/* LEFT */}
            <div className="max-w-2xl">
              {/* BADGE */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                <Sparkles className="size-4 text-blue-400" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                  Welcome to Finvia
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Let&apos;s build your
                <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  business workspace
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                You&apos;re just one step away from managing invoices, clients,
                payments, products, and analytics from a beautifully designed
                workspace.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10">
                <Button
                  onClick={() => setOpen(true)}
                  className="group h-13 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-7 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]"
                >
                  <Building2 className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  Create Business
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-4xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 shadow-[0_0_80px_rgba(0,0,0,0.45)] sm:p-6">
                {/* TOP */}
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Workspace Setup
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Complete your business onboarding
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400">
                    Step 1/1
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mb-6 sm:mb-8">
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-1/3 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
                  </div>
                </div>

                {/* FEATURES */}
                <div className="space-y-3 sm:space-y-4">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/2 p-3 transition-all duration-300 hover:border-blue-500/15 hover:bg-blue-500/3 sm:gap-4 sm:p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 sm:h-11 sm:w-11">
                          <Icon className="size-4 sm:size-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FOOTER */}
                <div className="mt-6 rounded-2xl border border-violet-500/15 bg-violet-500/5 p-3 sm:mt-8 sm:p-4">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Your workspace will be ready in less than a minute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddBusinessModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
