"use client";

import { Package, DollarSign, Award, Clock3 } from "lucide-react";

import { ProductStats } from "@/types/product";

interface ProductStatsProps {
  productStats: ProductStats;
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

export default function ProductStatCards({ productStats }: ProductStatsProps) {
  const {
    totalProducts,
    currentMonthProducts,
    totalEarning,
    topSellingProduct,
    pendingOrders,
    pendingOrdersValue,
  } = productStats;

  const stats: StatCardProps[] = [
    {
      title: "Total Products",
      value: String(totalProducts),
      sub: `${currentMonthProducts >= 0 ? "+" : "-"}${Math.abs(currentMonthProducts)} added this month`,
      icon: <Package size={18} />,
      glow: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
    },

    {
      title: "Total Revenue",
      value: `${fmt(totalEarning)} BDT`,
      sub:
        totalEarning > 0
          ? "Revenue generated from product sales"
          : "No revenue generated yet",
      icon: <DollarSign size={18} />,
      glow: "bg-emerald-500/20",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },

    {
      title: "Top Selling",
      value: topSellingProduct ? topSellingProduct.name : "No sales yet",
      sub: topSellingProduct
        ? `${topSellingProduct.totalSold} units sold`
        : "Start selling products",
      icon: <Award size={18} />,
      glow: "bg-violet-500/20",
      border: "border-violet-500/20",
      text: "text-violet-400",
      bg: "bg-violet-500/10",
    },

    {
      title: "Pending Orders",
      value: String(pendingOrders),
      sub:
        pendingOrders > 0
          ? `${fmt(pendingOrdersValue)} BDT awaiting payment`
          : "No pending orders",
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
