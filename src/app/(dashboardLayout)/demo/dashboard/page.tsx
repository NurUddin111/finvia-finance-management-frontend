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
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InvoiceStatusChart invStatusChart={demoInvoiceStatus} />

          <TopProductsChart topProducts={demoTopProducts} />

          <PaymentMethodChart stats={demoPaymentMethodStats} />
        </div>

        {/* ── Top clients | Recent transactions ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopClientsTable topClients={demoTopClients} />

          <RecentTransactions recentTransactions={demoRecentTransactions} />
        </div>

        {/* ── Overdue invoices | Upcoming due dates ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <OverdueInvoices overdueInvoices={demoOverdueInvoices} />
          </div>

          <div className="lg:col-span-2">
            <UpcomingDueDates upcomingOverdueInv={demoUpcomingDueDates} />
          </div>
        </div>

        {/* ── New vs returning clients | Client growth ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ClientTypeChart clientPieChartData={demoClientPieChart} />

          <ClientGrowthChart clientNumbers={demoClientGrowth} />
        </div>
      </div>
    </div>
  );
}
