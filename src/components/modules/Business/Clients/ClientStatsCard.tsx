import React from "react";
import { Users, UserCheck, UserX, UserMinus } from "lucide-react";
import { ClientsStats } from "@/types/client";

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
  neutral: "text-muted-foreground",
};

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
  iconBg,
  iconColor,
}) => (
  <div className="relative border border-white/[0.07] rounded-xl p-4 overflow-hidden min-w-40">
    <div
      className={`absolute -top-5 -right-5 w-16 h-16 rounded-full blur-2xl opacity-15 ${iconBg}`}
    />

    <div className="flex items-center justify-between mb-3">
      <p className="text-xs text-muted-foreground tracking-wide truncate pr-2">
        {label}
      </p>
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
    </div>

    <p className="text-2xl font-semibold text-foreground tracking-tight leading-none mb-1">
      {value}
    </p>

    {delta && (
      <p className={`text-xs truncate ${DELTA_CLASSES[deltaType]}`}>{delta}</p>
    )}
  </div>
);

const ClientStatCards = ({ clientsStats }: { clientsStats: ClientsStats }) => {
  const {
    totalClients,
    activeClients,
    activeClientPercentage,
    currentMonthClients,
    inactiveClients,
    neverBilledClients,
  } = clientsStats;

  const cards = [
    {
      label: "Total Clients",
      value: totalClients,
      delta: `${currentMonthClients >= 0 ? "↑" : "↓"} ${Math.abs(currentMonthClients)} this month`,
      deltaType: (currentMonthClients > 0 ? "up" : "neutral") as DeltaType,
      icon: <Users size={13} />,
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-400",
    },
    {
      label: "Active",
      value: activeClients,
      delta: `${activeClientPercentage}% of total`,
      deltaType: (activeClientPercentage >= 50 ? "up" : "warn") as DeltaType,
      icon: <UserCheck size={13} />,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      label: "Inactive",
      value: inactiveClients,
      delta: inactiveClients > 0 ? "Need re-engagement" : "None inactive",
      deltaType: (inactiveClients > 0 ? "warn" : "up") as DeltaType,
      icon: <UserMinus size={13} />,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      label: "Never Billed",
      value: neverBilledClients,
      delta: neverBilledClients > 0 ? "Not invoiced yet" : "All clients billed",
      deltaType: (neverBilledClients > 0 ? "warn" : "up") as DeltaType,
      icon: <UserX size={13} />,
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-400",
    },
  ];

  return (
    <div className="mb-6">
      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-1 lg:hidden scrollbar-none">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Desktop: 4-col grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ClientStatCards;
