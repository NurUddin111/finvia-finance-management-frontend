"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddNewClientModal from "./AddNewClients";

export default function ClientsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      {/* Title */}
      <div className="max-w-full space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight leading-tight">
          Clients
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Manage your client relationships, billing, and contact details.
        </p>
      </div>

      {/* CTA */}
      <Button
        onClick={() => setOpen(true)}
        className=" w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.25)] md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
      >
        Add New Client
      </Button>

      <AddNewClientModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
