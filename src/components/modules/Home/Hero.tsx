"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden px-3 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* TOP GLOW */}
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl sm:h-128 sm:w-lg lg:h-160 lg:w-160" />

        {/* RIGHT GLOW */}
        <div className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center pb-20 sm:pb-28 lg:pb-32">
        {/* BADGE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 sm:mb-6 sm:px-4"
        >
          <Sparkles className="size-4 shrink-0 text-blue-400" />

          <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
            Modern Business Workspace
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.05,
          }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Manage your business
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              with clarity & confidence
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl px-1 text-sm leading-relaxed text-slate-400 sm:mt-6 sm:px-0 sm:text-base md:text-lg">
            Finvia helps freelancers, agencies, and modern businesses manage
            invoices, clients, products, payments, and analytics from one
            beautifully designed workspace.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
          }}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center"
        >
          {/* PRIMARY */}
          <Button
            onClick={() =>
              router.push("/login", {
                scroll: false,
              })
            }
            className="group h-12 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)] sm:h-13 sm:w-auto sm:px-7"
          >
            Get Started Free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>

          {/* SECONDARY */}
          <Button
            variant="outline"
            onClick={() =>
              router.push("/demo/dashboard", {
                scroll: false,
              })
            }
            className="group h-12 w-full rounded-2xl border border-white/10 bg-white/3 px-6 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white sm:h-13 sm:w-auto sm:px-7"
          >
            <Play className="size-4 transition-transform duration-300 group-hover:scale-110" />
            View Demo
          </Button>
        </motion.div>

        {/* TRUST TEXT */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.22,
          }}
          className="mt-5 px-4 text-center text-[11px] leading-relaxed text-slate-500 sm:mt-6 sm:px-0 sm:text-sm"
        >
          No credit card required · Free onboarding · Built for modern
          businesses
        </motion.p>
      </div>
    </section>
  );
}
