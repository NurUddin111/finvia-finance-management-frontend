"use client";

import { FileText, TrendingUp, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { InvoiceStats } from "@/types/invoice";

interface InvoicesStatsProps {
  invoiceStats: InvoiceStats;
}

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  accent: string;
}

function StatCard({ title, value, sub, icon, iconBg, accent }: StatCardProps) {
  return (
    <div className="relative rounded-xl border bg-card p-5 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className={cn("absolute top-0 left-0 right-0 h-0.5", accent)} />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
          <p className="text-2xl font-semibold tracking-tight truncate">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{sub}</p>
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

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(1)}K`
      : n.toFixed(2);

export default function InvoicesStats({ invoiceStats }: InvoicesStatsProps) {
  const {
    totalInvoices,
    draftedInvoices,
    totalRevenue,
    thisMonth,
    outstanding,
  } = invoiceStats;

  const stats: StatCardProps[] = [
    {
      title: "Total Invoices",
      value: String(totalInvoices),
      sub: `${draftedInvoices} draft${draftedInvoices !== 1 ? "s" : ""} pending`,
      icon: <FileText size={18} className="text-violet-400" />,
      iconBg: "bg-violet-500/10",
      accent: "bg-violet-500/60",
    },
    {
      title: "Total Revenue",
      value: `${fmt(totalRevenue)} BDT`,
      sub: "Across all invoices",
      icon: <TrendingUp size={18} className="text-blue-400" />,
      iconBg: "bg-blue-500/10",
      accent: "bg-blue-500/60",
    },
    {
      title: "This Month",
      value: `${fmt(thisMonth.earnings)} BDT`,
      sub: `${thisMonth.paidCount} invoice${thisMonth.paidCount !== 1 ? "s" : ""} paid this month`,
      icon: <Calendar size={18} className="text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
      accent: "bg-emerald-500/60",
    },
    {
      title: "Outstanding",
      value: `${fmt(outstanding.amount)} BDT`,
      sub: `${outstanding.count} invoice${outstanding.count !== 1 ? "s" : ""} awaiting payment`,
      icon: <Clock size={18} className="text-amber-400" />,
      iconBg: "bg-amber-500/10",
      accent: "bg-amber-500/60",
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
