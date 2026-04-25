import { Card, CardContent } from "@/components/ui/card";
import { getKPICardDetails } from "@/services/business/dashboard/kpiCardDetails";
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
    muted: "text-muted-foreground",
    warn: "text-orange-400",
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs text-muted-foreground tracking-wide">{label}</p>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <p className="text-2xl font-semibold text-foreground mb-1">{value}</p>
        <p className={`text-xs ${subColor[subType]}`}>{sub}</p>
      </CardContent>
    </Card>
  );
}

export async function DashboardKpiCards() {
  const KPICardDetails = await getKPICardDetails();
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
  } = KPICardDetails.data.KPICardDetails;

  console.log(0 >= 0 ? "↑ " : "↓ " + overdueInvDiff + " since last week");
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      <KpiCard
        label="Total Revenue"
        value={totalRevenue}
        sub={`${
          revenueDiff >= 0 ? "↑ " : "↓ "
        }  ${revenueDiffInPercentage}% vs last month`}
        subType={revenueDiff >= 0 ? "up" : "down"}
        icon={<TrendingUp size={16} />}
      />
      <KpiCard
        label="Total Invoices"
        value={totalInvoices}
        sub={`${pendingInvoices} pending collection`}
        subType={pendingInvoices <= 0 ? "up" : "warn"}
        icon={<FileText size={16} />}
      />
      <KpiCard
        label="Paid Invoices"
        value={paidInvoices}
        sub={collectionRate + "% collection rate"}
        subType={collectionRate >= 50 ? "up" : "down"}
        icon={<CheckCircle size={16} />}
      />
      <KpiCard
        label="Overdue Invoices"
        value={totalOverdueInvoices}
        sub={`${overdueInvDiff >= 0 ? "↑" : "↓"} ${overdueInvDiff} since last week`}
        subType={overdueInvDiff <= 0 ? "up" : "warn"}
        icon={<AlertCircle size={16} className="text-orange-400" />}
      />
    </div>
  );
}
