"use client";

import { FileText, TrendingUp, Clock3, CalendarDays } from "lucide-react";

import { InvoiceStats } from "@/types/invoice";

interface InvoicesStatsProps {
  invoiceStats: InvoiceStats;
}

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  glow: string;
  border: string;
  text: string;
  bg: string;
}

function StatCard({
  title,
  value,
  sub,
  icon,
  glow,
  border,
  text,
  bg,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Glow */}
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-3xl ${glow}`}
      />

      {/* Content */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            {title}
          </p>

          <div className="space-y-2">
            <p className="truncate text-3xl font-semibold leading-none tracking-tight text-white">
              {value}
            </p>

            <p className="text-xs leading-relaxed text-slate-400">{sub}</p>
          </div>
        </div>

        {/* Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${border} ${bg} ${text}`}
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
      icon: <FileText size={18} />,
      glow: "bg-violet-500/20",
      border: "border-violet-500/20",
      text: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      title: "Total Revenue",
      value: `${fmt(totalRevenue)} BDT`,
      sub: "Across all invoices",
      icon: <TrendingUp size={18} />,
      glow: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "This Month",
      value: `${fmt(thisMonth.earnings)} BDT`,
      sub: `${thisMonth.paidCount} invoice${thisMonth.paidCount !== 1 ? "s" : ""} paid this month`,
      icon: <CalendarDays size={18} />,
      glow: "bg-emerald-500/20",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Outstanding",
      value: `${fmt(outstanding.amount)} BDT`,
      sub: `${outstanding.count} invoice${outstanding.count !== 1 ? "s" : ""} awaiting payment`,
      icon: <Clock3 size={18} />,
      glow: "bg-amber-500/20",
      border: "border-amber-500/20",
      text: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
