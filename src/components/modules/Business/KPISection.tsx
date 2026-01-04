const KPISection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <div className="rounded-lgborderbg-backgroundp-4transition-colorsmd:hover:bg-muted/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground truncate">{label}</p>
        <span className="text-lg">{icon}</span>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-2xl font-semibold leading-tight">{value}</p>
        <p className="text-xs text-green-600">{delta} from last month</p>
      </div>
    </div>
  );
}

export default KPISection;
