// src/app/(dashboardLayout)/demo/dashboard/page.tsx

import {
  OverdueInvoices,
  UpcomingDueDates,
} from "@/components/modules/Business/Dashboard/DashboardAlerts";
import {
  ClientGrowthChart,
  ClientTypeChart,
  InvoiceStatusChart,
  PaymentMethodChart,
  RevenueChart,
  TopProductsChart,
} from "@/components/modules/Business/Dashboard/DashboardCharts";
import DashboardHeader from "@/components/modules/Business/Dashboard/DashboardHeader";
import { DashboardKpiCards } from "@/components/modules/Business/Dashboard/DashboardKpiCards";
import {
  RecentTransactions,
  TopClientsTable,
} from "@/components/modules/Business/Dashboard/DashboardTables";
import {
  demoClientGrowth,
  demoClientPieChart,
  demoInvoiceStatus,
  demoKPICards,
  demoOverdueInvoices,
  demoPaymentMethodStats,
  demoProfile,
  demoRecentTransactions,
  demoRevenueData,
  demoTopClients,
  demoTopProducts,
  demoUpcomingDueDates,
} from "@/data/demodata";

export default function DemoDashboardPage() {
  return (
    <div className="p-6 space-y-5 max-w-7xl">
      {/* ── Page heading ── */}
      <DashboardHeader
        name={demoProfile.name}
        role={demoProfile.role}
        avatar={demoProfile.avatar}
      />

      {/* ── KPI cards ── */}
      <DashboardKpiCards data={demoKPICards} />

      {/* ── Revenue chart ── */}
      <RevenueChart revenueData={demoRevenueData} />

      {/* ── Invoice status | Top products | Payment method ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InvoiceStatusChart invStatusChart={demoInvoiceStatus} />
        <TopProductsChart topProducts={demoTopProducts} />
        <PaymentMethodChart stats={demoPaymentMethodStats} />
      </div>

      {/* ── Top clients | Recent transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopClientsTable topClients={demoTopClients} />
        <RecentTransactions recentTransactions={demoRecentTransactions} />
      </div>

      {/* ── Overdue invoices | Upcoming due dates ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <OverdueInvoices overdueInvoices={demoOverdueInvoices} />
        </div>
        <div className="lg:col-span-2">
          <UpcomingDueDates upcomingOverdueInv={demoUpcomingDueDates} />
        </div>
      </div>

      {/* ── New vs returning clients | Client growth ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClientTypeChart clientPieChartData={demoClientPieChart} />
        <ClientGrowthChart clientNumbers={demoClientGrowth} />
      </div>
    </div>
  );
}
