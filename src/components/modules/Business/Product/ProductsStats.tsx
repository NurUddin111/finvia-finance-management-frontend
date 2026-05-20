"use client";

import React from "react";
import { Package, DollarSign, Award, Clock3 } from "lucide-react";

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
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
    {/* Glow */}
    <div
      className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-3xl ${iconBg}`}
    />

    <div className="relative flex items-start justify-between">
      <div className="space-y-3 min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>

        <div className="space-y-2">
          <p className="truncate text-4xl font-semibold leading-none tracking-tight text-white">
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
      icon: <Package size={16} />,
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
      icon: <DollarSign size={16} />,
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
      icon: <Award size={16} />,
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

export default ProductStatCards;
