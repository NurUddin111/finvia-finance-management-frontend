"use client";

import { useState } from "react";
import { PackagePlus, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddProductModal from "./AddProductModule";

export default function ProductsHeader() {
  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const handleOpen = () => {
    setModalKey((k) => k + 1); // new key = fresh remount = reset state
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      {/* LEFT */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-blue-500/10 blur-md opacity-60" />
            <div className="relative flex size-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
              <Boxes className="size-4 text-blue-400" />
            </div>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Product Management
          </h1>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
          Organize, manage, and monitor your product catalog, inventory,
          pricing, stock availability, and performance across your business.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleOpen}
          className="group h-10 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 text-sm font-medium text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
        >
          <PackagePlus
            size={16}
            className="mr-2 transition-transform duration-300 group-hover:scale-110"
          />
          Add Product
        </Button>
      </div>

      <AddProductModal
        key={modalKey}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
