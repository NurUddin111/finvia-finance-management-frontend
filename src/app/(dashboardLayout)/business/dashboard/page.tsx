/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/business/dashboard/page.tsx

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
import { QuickActions } from "@/components/modules/Business/Dashboard/QuickActions";
import { getMe } from "@/services/auth/getMe";

export default async function BusinessDashboardPage() {
  const myProfile = await getMe();

  if (!myProfile) return null;

  const { name, role, avatar } = myProfile?.data;
  return (
    <div className="p-6 space-y-5 max-w-7xl">
      {/* ── Page heading ── */}
      <DashboardHeader name={name} role={role} avatar={avatar} />

      {/* ── Quick actions ── */}
      <QuickActions />

      {/* ── KPI cards ── */}
      <DashboardKpiCards />

      {/* ── Revenue chart (full width) ── */}
      <RevenueChart />

      {/* ── Invoice status | Top products | Payment method ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InvoiceStatusChart />
        <TopProductsChart />
        <PaymentMethodChart />
      </div>

      {/* ── Top clients | Recent transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopClientsTable />
        <RecentTransactions />
      </div>

      {/* ── Overdue invoices | Upcoming due dates ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <OverdueInvoices />
        </div>
        <div className="lg:col-span-2">
          <UpcomingDueDates />
        </div>
      </div>

      {/* ── New vs returning clients | Client growth ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClientTypeChart />
        <ClientGrowthChart />
      </div>
    </div>
  );
}
