import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  subType: "up" | "down" | "muted" | "warn";
  icon: React.ReactNode;
}

function KpiCard({ label, value, sub, subType, icon }: KpiCardProps) {
  const subColor: Record<string, string> = {
    up: "text-emerald-400",
    down: "text-red-400",
    muted: "text-slate-400",
    warn: "text-orange-400",
  };

  const hoverGlow: Record<string, string> = {
    up: "hover:shadow-emerald-500/10",
    down: "hover:shadow-red-500/10",
    muted: "hover:shadow-slate-500/10",
    warn: "hover:shadow-orange-500/10",
  };

  return (
    <Card
      className={`
    group
    relative
    overflow-hidden
    rounded-2xl
    border border-white/10
    bg-linear-to-b
    from-[#0B1120]
    to-[#050816]
    transition-all duration-300
    hover:-translate-y-1
    hover:border-blue-500/20
    hover:shadow-2xl
    ${hoverGlow[subType]}
  `}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-10 right-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardContent className="relative p-5 sm:p-6">
        {/* Top */}
        <div className="mb-5 flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              {label}
            </p>

            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              {value}
            </h3>
          </div>

          <div
            className="
              flex size-11 items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/3
              text-slate-300
              backdrop-blur-md
              transition-all duration-300
              group-hover:scale-105
              group-hover:bg-blue-500/10
              group-hover:text-blue-400
            "
          >
            {icon}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs sm:text-sm font-medium ${subColor[subType]}`}>
            {sub}
          </p>

          <div
            className={`
              h-2 w-2 rounded-full
              ${
                subType === "up"
                  ? "bg-emerald-400"
                  : subType === "down"
                    ? "bg-red-400"
                    : subType === "warn"
                      ? "bg-orange-400"
                      : "bg-slate-400"
              }
            `}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export type KPICardData = {
  totalRevenue: string;
  revenueDiff: number;
  revenueDiffInPercentage: number;
  totalInvoices: string;
  pendingInvoices: number;
  paidInvoices: string;
  collectionRate: number;
  totalOverdueInvoices: string;
  overdueInvDiff: number;
};

export function DashboardKpiCards({ data }: { data: KPICardData }) {
  const {
    totalRevenue,
    revenueDiff,
    revenueDiffInPercentage,
    totalInvoices,
    pendingInvoices,
    paidInvoices,
    collectionRate,
    totalOverdueInvoices,
    overdueInvDiff,
  } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
      <KpiCard
        label="Total Revenue"
        value={totalRevenue}
        sub={`${
          revenueDiff >= 0 ? "↑" : "↓"
        } ${revenueDiffInPercentage}% vs last month`}
        subType={revenueDiff >= 0 ? "up" : "down"}
        icon={<TrendingUp size={18} />}
      />

      <KpiCard
        label="Total Invoices"
        value={totalInvoices}
        sub={`${pendingInvoices} pending collection`}
        subType={pendingInvoices <= 0 ? "up" : "warn"}
        icon={<FileText size={18} />}
      />

      <KpiCard
        label="Paid Invoices"
        value={paidInvoices}
        sub={`${collectionRate}% collection rate`}
        subType={collectionRate >= 50 ? "up" : "down"}
        icon={<CheckCircle size={18} />}
      />

      <KpiCard
        label="Overdue Invoices"
        value={totalOverdueInvoices}
        sub={`${
          overdueInvDiff >= 0 ? "↑" : "↓"
        } ${Math.abs(overdueInvDiff)} since last week`}
        subType={overdueInvDiff <= 0 ? "warn" : "up"}
        icon={<AlertCircle size={18} />}
      />
    </div>
  );
}
