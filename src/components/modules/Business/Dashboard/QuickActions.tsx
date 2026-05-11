"use client";

import { Button } from "@/components/ui/button";
import { FilePlus, UserPlus, BadgeCheck, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-card border border-border">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mr-1 hidden sm:block">
        Quick actions
      </span>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
        onClick={() => router.push("/business/invoices/create")}
      >
        <FilePlus size={14} />
        Create invoice
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
        onClick={() => router.push("/business/clients/add")}
      >
        <UserPlus size={14} />
        Add client
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-orange-400/30 bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 hover:text-orange-300"
        onClick={() => router.push("/business/invoices/send-receipt")}
      >
        <Receipt size={14} />
        Add product
      </Button>
    </div>
  );
}
