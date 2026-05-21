"use client";

import React from "react";

import { CalendarDays, Clock3, FileText, TrendingUp } from "lucide-react";

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
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] sm:p-5">
    {/* GLOW */}
    <div
      className={`absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-20 blur-3xl transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28 ${iconBg}`}
    />

    <div className="relative flex items-start justify-between gap-3">
      {/* CONTENT */}
      <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.18em]">
          {label}
        </p>

        <p className="truncate text-xl font-semibold tracking-tight text-white sm:text-2xl xl:text-3xl">
          {value}
        </p>

        {delta && (
          <p
            className={`line-clamp-1 text-[11px] font-medium sm:text-xs ${DELTA_CLASSES[deltaType]}`}
          >
            {delta}
          </p>
        )}
      </div>

      {/* ICON */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

const InvoiceStatsCards = ({
  invoiceStats,
}: {
  invoiceStats: InvoiceStats | null;
}) => {
  if (!invoiceStats) return null;

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
          ? `${draftedInvoices} drafts pending`
          : "No drafts pending",
      deltaType: (draftedInvoices > 0 ? "warn" : "up") as DeltaType,
      icon: <FileText size={18} />,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },

    {
      label: "Revenue",
      value: `${fmt(totalRevenue)} BDT`,
      delta: "Across all invoices",
      deltaType: "up" as DeltaType,
      icon: <TrendingUp size={18} />,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },

    {
      label: "This Month",
      value: `${fmt(thisMonth.earnings)} BDT`,
      delta: `${thisMonth.paidCount} paid this month`,
      deltaType: (thisMonth.paidCount > 0 ? "up" : "neutral") as DeltaType,
      icon: <CalendarDays size={18} />,
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
      icon: <Clock3 size={18} />,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
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
