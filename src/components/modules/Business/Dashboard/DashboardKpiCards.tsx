import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  subType: "up" | "down" | "muted" | "warn";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function KpiCard({
  label,
  value,
  sub,
  subType,
  icon,
  iconBg,
  iconColor,
}: KpiCardProps) {
  const subColor: Record<string, string> = {
    up: "text-emerald-400",
    down: "text-red-400",
    muted: "text-slate-400",
    warn: "text-orange-400",
  };

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Glow */}
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-3xl transition-transform duration-500 group-hover:scale-110 ${iconBg}`}
      />

      <CardContent className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              {label}
            </p>

            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {value}
            </h3>

            <p className={`text-xs font-medium ${subColor[subType]}`}>{sub}</p>
          </div>

          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${iconBg} ${iconColor}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DashboardKpiCards({ data }: { data: any }) {
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total Revenue"
        value={`${totalRevenue} BDT`}
        sub={`${revenueDiff >= 0 ? "↑" : "↓"} ${revenueDiffInPercentage}% vs last month`}
        subType={revenueDiff >= 0 ? "up" : "down"}
        icon={<TrendingUp size={18} />}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-400"
      />

      <KpiCard
        label="Total Invoices"
        value={totalInvoices}
        sub={`${pendingInvoices} pending collection`}
        subType={pendingInvoices <= 0 ? "up" : "warn"}
        icon={<FileText size={18} />}
        iconBg="bg-blue-500/10"
        iconColor="text-blue-400"
      />

      <KpiCard
        label="Paid Invoices"
        value={paidInvoices}
        sub={`${collectionRate}% collection rate`}
        subType={collectionRate >= 50 ? "up" : "down"}
        icon={<CheckCircle size={18} />}
        iconBg="bg-violet-500/10"
        iconColor="text-violet-400"
      />

      <KpiCard
        label="Overdue"
        value={totalOverdueInvoices}
        sub={`${overdueInvDiff >= 0 ? "↑" : "↓"} ${Math.abs(overdueInvDiff)} since last week`}
        subType={overdueInvDiff <= 0 ? "warn" : "up"}
        icon={<AlertCircle size={18} />}
        iconBg="bg-orange-500/10"
        iconColor="text-orange-400"
      />
    </div>
  );
}
