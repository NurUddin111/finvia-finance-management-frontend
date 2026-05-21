"use client";

import React from "react";

import { Award, Clock3, DollarSign, Package } from "lucide-react";

import { ProductStats } from "@/types/product";

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

const ProductStatCards = ({
  productStats,
}: {
  productStats: ProductStats | null;
}) => {
  if (!productStats) return null;

  const {
    totalProducts,
    currentMonthProducts,
    totalEarning,
    topSellingProduct,
    pendingOrders,
    pendingOrdersValue,
  } = productStats;

  const cards = [
    {
      label: "Total Products",
      value: totalProducts,
      delta: `${currentMonthProducts >= 0 ? "↑" : "↓"} ${Math.abs(currentMonthProducts)} added this month`,
      deltaType: (currentMonthProducts > 0 ? "up" : "neutral") as DeltaType,
      icon: <Package size={18} />,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },

    {
      label: "Total Revenue",
      value: `${fmt(totalEarning)} BDT`,
      delta:
        totalEarning > 0
          ? "Revenue generated from product sales"
          : "No revenue generated yet",
      deltaType: (totalEarning > 0 ? "up" : "neutral") as DeltaType,
      icon: <DollarSign size={18} />,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },

    {
      label: "Top Selling",
      value: topSellingProduct ? topSellingProduct.name : "No sales yet",
      delta: topSellingProduct
        ? `${topSellingProduct.totalSold} units sold`
        : "Start selling products",
      deltaType: (topSellingProduct ? "up" : "neutral") as DeltaType,
      icon: <Award size={18} />,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },

    {
      label: "Pending Orders",
      value: pendingOrders,
      delta:
        pendingOrders > 0
          ? `${fmt(pendingOrdersValue)} BDT awaiting payment`
          : "No pending orders",
      deltaType: (pendingOrders > 0 ? "warn" : "up") as DeltaType,
      icon: <Clock3 size={18} />,
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

export default ProductStatCards;
