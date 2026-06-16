"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Revenue Analytics",
    description: "Track business performance with real-time insights.",
    image: "/images/hero/revenue.png",
  },
  {
    title: "Client Management",
    description: "Manage and monitor your most valuable clients.",
    image: "/images/hero/clients.png",
  },
  {
    title: "Recent Transactions",
    description: "Monitor payments and financial activity instantly.",
    image: "/images/hero/transactions.png",
  },
  {
    title: "Invoice Management",
    description: "Create, track and manage invoices effortlessly.",
    image: "/images/hero/invoices.png",
  },
];

export default function DashboardPreview() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-[40px] bg-blue-500/10 blur-3xl" />

      <div className="overflow-hidden rounded-4xl border border-white/10 bg-[#0B1120] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-white">
              {slides[activeSlide].title}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {slides[activeSlide].description}
            </p>
          </div>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-8 bg-blue-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`View slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* SCREENSHOT */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#050816]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[activeSlide].image}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-white/10 p-4">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeSlide === index
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                  : "border-white/10 bg-white/3 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {slide.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
