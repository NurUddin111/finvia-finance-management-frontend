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
  neutral: "text-slate-400",
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
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
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
      icon: <Users size={16} />,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      label: "Active",
      value: activeClients,
      delta: `${activeClientPercentage}% of total`,
      deltaType: (activeClientPercentage >= 50 ? "up" : "warn") as DeltaType,
      icon: <UserCheck size={16} />,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Inactive",
      value: inactiveClients,
      delta: inactiveClients > 0 ? "Need re-engagement" : "None inactive",
      deltaType: (inactiveClients > 0 ? "warn" : "up") as DeltaType,
      icon: <UserMinus size={16} />,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      label: "Never Billed",
      value: neverBilledClients,
      delta: neverBilledClients > 0 ? "Not invoiced yet" : "All clients billed",
      deltaType: (neverBilledClients > 0 ? "warn" : "up") as DeltaType,
      icon: <UserX size={16} />,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default ClientStatCards;
