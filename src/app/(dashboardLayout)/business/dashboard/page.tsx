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
import { getKPICardDetails } from "@/services/business/dashboard/kpiCardDetails";
import { getMonthlyRevenue } from "@/services/business/dashboard/monthlyRevenue";
import { getRecentTransactions } from "@/services/business/dashboard/recentTransaction";
import { getTopClients } from "@/services/business/dashboard/topClients";

export default async function BusinessDashboardPage() {
  const myProfile = await getMe();
  if (!myProfile) return null;
  const { name, role, avatar } = myProfile?.data;

  const MonthlyRevenueDetails = await getMonthlyRevenue();
  const monthlyRevenue = MonthlyRevenueDetails.data;
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

  const KPICardDetails = await getKPICardDetails();
  const {
    pendingInvoices,
    pendingInvPer,
    paidInvoices,
    paidInvPer,
    draftedInvoices,
    draftedInvPer,
  } = KPICardDetails.data.KPICardDetails;

  const topClientsList = await getTopClients();
  const topClients = topClientsList.data;

  const recentTransactionsList = await getRecentTransactions();
  const recentTransactions = recentTransactionsList.data;

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
        <InvoiceStatusChart
          paidInv={paidInvoices}
          paidInvPer={paidInvPer}
          pendingInv={pendingInvoices}
          pendingInvPer={pendingInvPer}
          draftedInv={draftedInvoices}
          draftedInvPer={draftedInvPer}
        />
        <TopProductsChart />
        <PaymentMethodChart />
      </div>

      {/* ── Top clients | Recent transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopClientsTable topClients={topClients} />
        <RecentTransactions recentTransactions={recentTransactions} />
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
