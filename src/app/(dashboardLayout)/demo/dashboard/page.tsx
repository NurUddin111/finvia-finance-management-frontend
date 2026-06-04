// src/app/(dashboardLayout)/demo/dashboard/page.tsx

import DemoPageTracker from "@/components/analytics/DemoPageTracker";
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
    <div className="min-h-screen bg-[#050816] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
      <DemoPageTracker />
      <div className="mx-auto flex w-full max-w-475 flex-col gap-5 lg:gap-6">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InvoiceStatusChart invStatusChart={demoInvoiceStatus} />

          <TopProductsChart topProducts={demoTopProducts} />

          <div className="md:col-span-2 xl:col-span-1">
            <PaymentMethodChart stats={demoPaymentMethodStats} />
          </div>
        </div>

        {/* ── Top clients | Recent transactions ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <TopClientsTable topClients={demoTopClients} />

          <RecentTransactions recentTransactions={demoRecentTransactions} />
        </div>

        {/* ── Overdue invoices | Upcoming due dates ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <OverdueInvoices overdueInvoices={demoOverdueInvoices} />
          </div>

          <div className="xl:col-span-2">
            <UpcomingDueDates upcomingOverdueInv={demoUpcomingDueDates} />
          </div>
        </div>

        {/* ── New vs returning clients | Client growth ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ClientTypeChart clientPieChartData={demoClientPieChart} />

          <ClientGrowthChart clientNumbers={demoClientGrowth} />
        </div>
      </div>
    </div>
  );
}
