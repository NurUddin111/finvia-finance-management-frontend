"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { PackagePlus, Lock, Boxes } from "lucide-react";

export default function DemoProductsHeader() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 p-1.5">
            <Boxes className="size-4 text-blue-400" />
          </div>

          <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
            Product Management
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Organize, manage, and monitor your product catalog, inventory,
            pricing, stock availability, and product performance across your
            business.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          onClick={() => setShowNudge((v) => !v)}
          className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
        >
          <PackagePlus
            size={16}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          Add Product
        </Button>

        {showNudge && (
          <div className="absolute right-0 top-14 z-50 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1120]/95 px-4 py-3 text-sm text-slate-400 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl whitespace-nowrap">
            <Lock size={13} className="shrink-0 text-blue-400" />
            Sign up to use this feature
          </div>
        )}
      </div>
    </div>
  );
}
