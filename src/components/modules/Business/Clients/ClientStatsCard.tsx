import React from "react";
import { Users, UserCheck, FileText, CircleDollarSign } from "lucide-react";

type DeltaType = "up" | "down" | "neutral";

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
  neutral: "text-white/30",
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
  <div className="relative  border border-white/[0.07] rounded-xl p-4 overflow-hidden">
    {/* Subtle corner glow */}
    <div
      className={`absolute -top-5 -right-5 w-16 h-16 rounded-full blur-2xl opacity-15 ${iconBg}`}
    />

    <div className="flex items-start justify-between mb-3">
      <p className="text-[11px] font-medium tracking-wide text-white uppercase">
        {label}
      </p>
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg} bg-opacity-20 ${iconColor}`}
      >
        {icon}
      </div>
    </div>

    <p className="text-[24px] font-semibold text-white tracking-tight leading-none mb-1.5">
      {value}
    </p>

    {delta && (
      <p className={`text-[11px] ${DELTA_CLASSES[deltaType]}`}>{delta}</p>
    )}
  </div>
);

const ClientStatCards = () => {
  // Hardcoded for now — wire to real data later
  const total = 0;
  const active = 0;
  const totalInvoices = 0;
  const outstanding = 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <StatCard
        label="Total Clients"
        value={total}
        delta="+0 this month"
        deltaType="neutral"
        icon={<Users size={13} />}
        iconBg="bg-indigo-500/20"
        iconColor="text-indigo-400"
      />
      <StatCard
        label="Active"
        value={active}
        delta="0% of total"
        deltaType="neutral"
        icon={<UserCheck size={13} />}
        iconBg="bg-emerald-500/20"
        iconColor="text-emerald-400"
      />
      <StatCard
        label="Total Invoices"
        value={totalInvoices}
        delta="0 raised"
        deltaType="neutral"
        icon={<FileText size={13} />}
        iconBg="bg-violet-500/20"
        iconColor="text-violet-400"
      />
      <StatCard
        label="Outstanding"
        value="৳0"
        delta="All settled"
        deltaType="neutral"
        icon={<CircleDollarSign size={13} />}
        iconBg="bg-amber-500/20"
        iconColor="text-amber-400"
      />
    </div>
  );
};

export default ClientStatCards;
