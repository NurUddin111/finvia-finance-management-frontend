// src/components/modules/Demo/Product/DemoProductsHeader.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PackagePlus, Lock } from "lucide-react";

export default function DemoProductsHeader() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1 max-w-full">
        <h1 className="text-2xl font-semibold tracking-tight leading-tight">
          Products
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Manage your products
        </p>
      </div>

      <div className="relative w-full md:w-auto">
        <Button
          onClick={() => setShowNudge((v) => !v)}
          className="w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.25)] md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
        >
          <PackagePlus />
          Add New Products
        </Button>

        {showNudge && (
          <div className="absolute right-0 top-13 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-card px-4 py-3 shadow-xl text-sm text-muted-foreground whitespace-nowrap">
            <Lock size={13} className="text-primary shrink-0" />
            Sign up to use this feature
          </div>
        )}
      </div>
    </div>
  );
}
