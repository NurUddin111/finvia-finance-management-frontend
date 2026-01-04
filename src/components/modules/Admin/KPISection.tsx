import React from "react";

const KPISection = () => {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Revenue"
          value="$24,560"
          delta="+12.5%"
          icon="💰"
        />
        <KpiCard label="Unpaid Invoices" value="8" delta="+2" icon="🧾" />
        <KpiCard label="Active Clients" value="32" delta="+4" icon="👥" />
        <KpiCard label="Monthly Growth" value="18%" delta="+3.2%" icon="📈" />
      </div>
    </section>
  );
};

/* ---------------- KPI Card ---------------- */

function KpiCard({
  label,
  value,
  delta,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground leading-tight">{label}</p>
        <span className="text-xl leading-none">{icon}</span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold leading-tight">{value}</p>
        <p className="mt-1 text-xs text-green-600">{delta} from last month</p>
      </div>
    </div>
  );
}

export default KPISection;
