"use client";

import { useState } from "react";

import { Boxes, PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import AddProductModal from "./AddProductModule";

export default function ProductsHeader() {
  const [open, setOpen] = useState(false);

  const [modalKey, setModalKey] = useState(0);

  const handleOpen = () => {
    setModalKey((k) => k + 1);

    setOpen(true);
  };

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* LEFT */}
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 p-1.5">
              <Boxes className="size-3.5 text-blue-400 sm:size-4" />
            </div>

            <span className="text-lg font-medium uppercase tracking-[0.12em] text-blue-400 sm:text-2xl sm:tracking-[0.18em] lg:text-3xl lg:tracking-[0.2em]">
              Product Management
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Organize, manage, and monitor your product catalog, inventory,
            pricing, stock availability, and performance across your business.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={handleOpen}
            className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
          >
            <PackagePlus
              size={16}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Add Product
          </Button>
        </div>
      </div>

      <AddProductModal
        key={modalKey}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
