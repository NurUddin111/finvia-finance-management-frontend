"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Lock, Users2 } from "lucide-react";

export default function DemoClientsHeader() {
  const [showNudge, setShowNudge] = useState(false);

  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
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
            Manage customer relationships, billing history, contact information,
            and business interactions from one centralized workspace.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          onClick={() => setShowNudge((v) => !v)}
          className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
        >
          <UserPlus
            size={16}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          Add New Client
        </Button>

        {showNudge && (
          <div className="absolute right-0 top-14 z-50 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-[#0B1120]/95 px-4 py-3 text-sm text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <Lock size={13} />
            </div>

            <span className="whitespace-nowrap">
              Sign up to unlock this feature
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
