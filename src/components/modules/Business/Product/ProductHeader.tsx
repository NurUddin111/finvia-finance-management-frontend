"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateInvoiceModal from "../Invoices/CreateInvoiceModal";
import { PackagePlus } from "lucide-react";

export default function ProductsHeader() {
  const [open, setOpen] = useState(false);

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

      {/* Right: CTA */}
      <Button
        onClick={() => setOpen(true)}
        className=" w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.25)] md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
      >
        <PackagePlus />
        Add New Products
      </Button>

      <CreateInvoiceModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
