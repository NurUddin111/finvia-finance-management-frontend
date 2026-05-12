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
import { getMe } from "@/services/auth/getMe";
import { getClientsNumByMonth } from "@/services/business/dashboard/clientsByMonth";
import { getClientsPieChartData } from "@/services/business/dashboard/clientsPieChart";
import { months } from "@/services/business/dashboard/constants";
import { getKPICardDetails } from "@/services/business/dashboard/kpiCardDetails";
import { getMonthlyRevenue } from "@/services/business/dashboard/monthlyRevenue";
import { getOverdueInvoices } from "@/services/business/dashboard/overdueInvoices";
import { getRecentTransactions } from "@/services/business/dashboard/recentTransaction";
import { getTopClients } from "@/services/business/dashboard/topClients";
import { getUpcomingOverdueInvoices } from "@/services/business/dashboard/upcomingOverdueInv";
import { getPaymentMethodStats } from "@/services/business/payment/methodStats";
import { getTopProducts } from "@/services/business/products/topProducts";

function unwrap<T>(
  res: PromiseSettledResult<{ success: boolean; data?: T; error?: any }>,
  fallback: T,
): T {
  if (res.status === "rejected") return fallback;
  if (!res.value.success || res.value.data === undefined) return fallback;
  return res.value.data;
}

export default async function BusinessDashboardPage() {
  const myProfile = await getMe();
  if (!myProfile?.data) return null;
  const { name, role, avatar } = myProfile.data;

  const KPICardDetailsRes = await getKPICardDetails();
  const KPICardDetails = KPICardDetailsRes.data;

  const [
    monthlyRevenueRes,
    topClientsRes,
    recentTransactionsRes,
    overdueInvoicesRes,
    upcomingOverdueRes,
    clientPieRes,
    clientGrowthRes,
    topProductsRes,
    paymentMethodRes,
  ] = await Promise.allSettled([
    getMonthlyRevenue(),
    getTopClients(),
    getRecentTransactions(),
    getOverdueInvoices(),
    getUpcomingOverdueInvoices(),
    getClientsPieChartData(),
    getClientsNumByMonth(),
    getTopProducts(),
    getPaymentMethodStats(),
  ]);

  const monthlyRevenue = unwrap(monthlyRevenueRes, {});
  const topClients = unwrap(topClientsRes, []);
  const recentTransactions = unwrap(recentTransactionsRes, []);
  const overdueInvoices = unwrap(overdueInvoicesRes, []);
  const upcomingOverdue = unwrap(upcomingOverdueRes, []);
  const clientPieCharts = unwrap(clientPieRes, null);
  const clientsNumByMonth = unwrap(clientGrowthRes, []);
  const topProducts = unwrap(topProductsRes, []);
  const paymentMethodStats = unwrap(paymentMethodRes, {
    online: 0,
    cash: 0,
    total: 0,
  });

  const revenueData = months
    .filter((m) => monthlyRevenue[m] !== undefined)
    .map((m) => ({ month: m, revenue: monthlyRevenue[m] as number }));

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
        {/* ── Page heading ── */}
        <DashboardHeader name={name} role={role} avatar={avatar} />

        {/* ── KPI cards ── */}
        <DashboardKpiCards data={KPICardDetails} />

        {/* ── Revenue chart ── */}
        <RevenueChart revenueData={revenueData} />

        {/* ── Invoice status | Top products | Payment method ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InvoiceStatusChart invStatusChart={KPICardDetails} />

          <TopProductsChart topProducts={topProducts} />

          <PaymentMethodChart stats={paymentMethodStats} />
        </div>

        {/* ── Top clients | Recent transactions ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopClientsTable topClients={topClients} />

          <RecentTransactions recentTransactions={recentTransactions} />
        </div>

        {/* ── Overdue invoices | Upcoming due dates ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <OverdueInvoices overdueInvoices={overdueInvoices} />
          </div>

          <div className="lg:col-span-2">
            <UpcomingDueDates upcomingOverdueInv={upcomingOverdue} />
          </div>
        </div>

        {/* ── New vs returning clients | Client growth ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ClientTypeChart clientPieChartData={clientPieCharts} />

          <ClientGrowthChart clientNumbers={clientsNumByMonth} />
        </div>
      </div>
    </div>
  );
}
