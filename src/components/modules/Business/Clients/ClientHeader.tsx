"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddNewClientModal from "./AddNewClients";
import { UserPlus, Users2 } from "lucide-react";

export default function ClientsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 p-1.5">
              <Users2 className="size-4 text-blue-400" />
            </div>

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
              Client Management
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Clients
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Manage customer relationships, billing history, contact
              information, and business interactions from one centralized
              workspace.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={() => setOpen(true)}
            className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
          >
            <UserPlus
              size={16}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Add New Client
          </Button>
        </div>
      </div>

      <AddNewClientModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
