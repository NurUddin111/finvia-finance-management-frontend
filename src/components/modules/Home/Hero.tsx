"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="-mt-40 h-112 w-md rounded-full bg-primary/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Manage your business
          <br />
          <span className="text-primary">with confidence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Finvia gives freelancers and small businesses a clear, modern way to
          manage clients, invoices, and payments — without the chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button className="h-12 px-8 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(124,106,242,0.25),0_12px_45px_rgba(124,106,242,0.3)] hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)] w-full sm:w-auto">
            Get started free
          </Button>

          <Button
            variant="outline"
            disabled
            className="h-12 px-8 rounded-full opacity-60 w-full sm:w-auto"
          >
            View demo
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
