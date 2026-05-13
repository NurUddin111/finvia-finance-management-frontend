"use client";

import React from "react";
import { FileText, TrendingUp, Clock3, CalendarDays } from "lucide-react";

import { InvoiceStats } from "@/types/invoice";

type DeltaType = "up" | "down" | "neutral" | "warn";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: DeltaType;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const DELTA_CLASSES: Record<DeltaType, string> = {
  up: "text-emerald-400",
  down: "text-red-400",
  warn: "text-orange-400",
  neutral: "text-slate-400",
};

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(1)}K`
      : n.toFixed(2);

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
  iconBg,
  iconColor,
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
    {/* Glow */}
    <div
      className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-3xl ${iconBg}`}
    />

    <div className="relative flex items-start justify-between">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>

        <div className="space-y-2">
          <p className="text-4xl font-semibold leading-none tracking-tight text-white">
            {value}
          </p>

          {delta && (
            <p className={`text-xs font-medium ${DELTA_CLASSES[deltaType]}`}>
              {delta}
            </p>
          )}
        </div>
      </div>

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

interface InvoicesStatsProps {
  invoiceStats: InvoiceStats;
}

const InvoiceStatsCards = ({ invoiceStats }: InvoicesStatsProps) => {
  const {
    totalInvoices,
    draftedInvoices,
    totalRevenue,
    thisMonth,
    outstanding,
  } = invoiceStats;

  const cards = [
    {
      label: "Total Invoices",
      value: totalInvoices,
      delta:
        draftedInvoices > 0
          ? `${draftedInvoices} draft${draftedInvoices !== 1 ? "s" : ""} pending`
          : "No drafts pending",
      deltaType: (draftedInvoices > 0 ? "warn" : "up") as DeltaType,
      icon: <FileText size={16} />,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      label: "Total Revenue",
      value: `${fmt(totalRevenue)} BDT`,
      delta: "Across all invoices",
      deltaType: "up" as DeltaType,
      icon: <TrendingUp size={16} />,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      label: "This Month",
      value: `${fmt(thisMonth.earnings)} BDT`,
      delta: `${thisMonth.paidCount} invoice${thisMonth.paidCount !== 1 ? "s" : ""} paid this month`,
      deltaType: (thisMonth.paidCount > 0 ? "up" : "neutral") as DeltaType,
      icon: <CalendarDays size={16} />,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Outstanding",
      value: `${fmt(outstanding.amount)} BDT`,
      delta:
        outstanding.count > 0
          ? `${outstanding.count} awaiting payment`
          : "No outstanding invoices",
      deltaType: (outstanding.count > 0 ? "warn" : "up") as DeltaType,
      icon: <Clock3 size={16} />,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default InvoiceStatsCards;
