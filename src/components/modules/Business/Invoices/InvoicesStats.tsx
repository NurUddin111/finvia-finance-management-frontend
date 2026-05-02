/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FileText, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoicesStatsProps {
  invoices: any[];
  loading: boolean;
}

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  accent: string;
  loading: boolean;
}

function StatCard({
  title,
  value,
  sub,
  icon,
  iconBg,
  accent,
  loading,
}: StatCardProps) {
  return (
    <div className="relative rounded-xl border bg-card p-5 overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* subtle top accent line */}
      <div className={cn("absolute top-0 left-0 right-0 h-0.5", accent)} />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
          {loading ? (
            <div className="space-y-2">
              <div className="h-7 w-28 rounded-md bg-muted animate-pulse" />
              <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-2xl font-semibold tracking-tight truncate">
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </>
          )}
        </div>

        <div
          className={cn(
            "shrink-0 flex items-center justify-center rounded-lg w-10 h-10",
            iconBg,
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function InvoicesStats({
  invoices,
  loading,
}: InvoicesStatsProps) {
  const total = invoices.length;
  const totalRevenue = invoices.reduce(
    (sum, inv) => sum + Number(inv.total ?? 0),
    0,
  );
  const paidInvoices = invoices.filter(
    (inv) => inv.status?.toLowerCase() === "paid",
  );
  const paidAmount = paidInvoices.reduce(
    (sum, inv) => sum + Number(inv.total ?? 0),
    0,
  );
  const outstanding = invoices.filter((inv) =>
    ["sent", "unpaid", "overdue"].includes(inv.status?.toLowerCase()),
  );
  const outstandingAmount = outstanding.reduce(
    (sum, inv) => sum + Number(inv.total ?? 0),
    0,
  );

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
        ? `${(n / 1_000).toFixed(1)}K`
        : n.toFixed(2);

  const stats: StatCardProps[] = [
    {
      title: "Total Invoices",
      value: String(total),
      sub: `${invoices.filter((i) => i.status?.toLowerCase() === "draft").length} drafts pending`,
      icon: <FileText size={18} className="text-violet-400" />,
      iconBg: "bg-violet-500/10",
      accent: "bg-violet-500/60",
      loading,
    },
    {
      title: "Total Revenue",
      value: `${fmt(totalRevenue)} BDT`,
      sub: "Across all invoices",
      icon: <TrendingUp size={18} className="text-blue-400" />,
      iconBg: "bg-blue-500/10",
      accent: "bg-blue-500/60",
      loading,
    },
    {
      title: "Paid",
      value: `${fmt(paidAmount)} BDT`,
      sub: `${paidInvoices.length} invoice${paidInvoices.length !== 1 ? "s" : ""} settled`,
      icon: <CheckCircle2 size={18} className="text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
      accent: "bg-emerald-500/60",
      loading,
    },
    {
      title: "Outstanding",
      value: `${fmt(outstandingAmount)} BDT`,
      sub: `${outstanding.length} invoice${outstanding.length !== 1 ? "s" : ""} awaiting payment`,
      icon: <Clock size={18} className="text-amber-400" />,
      iconBg: "bg-amber-500/10",
      accent: "bg-amber-500/60",
      loading,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
