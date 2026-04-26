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
import { getMonthlyRevenue } from "@/services/business/dashboard/monthlyRevenue";

export default async function BusinessDashboardPage() {
  const myProfile = await getMe();
  if (!myProfile) return null;
  const { name, role, avatar } = myProfile?.data;

  const MonthlyRevenueDetails = await getMonthlyRevenue();
  const monthlyRevenue = MonthlyRevenueDetails.data;
  console.log(monthlyRevenue);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueData = months
    .filter((m) => monthlyRevenue[m] !== undefined) 
    .map((m) => ({
      month: m,
      revenue: monthlyRevenue[m] as number,
    }));

  return (
    <div className="p-6 space-y-5 max-w-7xl">
      {/* ── Page heading ── */}
      <DashboardHeader name={name} role={role} avatar={avatar} />

      {/* ── Quick actions ── */}
      <QuickActions />

      {/* ── KPI cards ── */}
      <DashboardKpiCards />

      {/* ── Revenue chart ── */}
      <RevenueChart revenueData={revenueData} />

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
