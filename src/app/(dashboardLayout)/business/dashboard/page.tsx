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
import { getMe } from "@/services/auth.services";
import {
  getClientsNumByMonth,
  getClientsPieChartData,
  getKPICardDetails,
  getTopClients,
} from "@/services/business/dashboard.services";
import { months } from "@/services/business/dashboard/constants";
import { getMonthlyRevenue } from "@/services/business/dashboard/monthlyRevenue";
import { getOverdueInvoices } from "@/services/business/dashboard/overdueInvoices";
import { getRecentTransactions } from "@/services/business/dashboard/recentTransaction";
import { getUpcomingOverdueInvoices } from "@/services/business/dashboard/upcomingOverdueInv";
import { getPaymentMethodStats } from "@/services/business/payment.services";
import { getTopProducts } from "@/services/business/product.services";
import { MonthlyClientCount } from "@/types/client";
import { redirect } from "next/navigation";

// ── Helper ────────────────────────────────────────────────────────────────────

function unwrap<T>(
  res: PromiseSettledResult<{ success: boolean; data?: T }>,
  fallback: T,
): T {
  if (res.status === "rejected") return fallback;
  if (!res.value.success || res.value.data === undefined) return fallback;
  return res.value.data;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BusinessDashboardPage() {
  const getMyProfile = await getMe();
  if (!getMyProfile?.data) redirect("/login");
  const myProfile = getMyProfile.data;
  const { name, role, avatar } = myProfile;

  const [
    kpiCardDetailsRes,
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
    getKPICardDetails(),
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

  const kpiCardDetails = unwrap(kpiCardDetailsRes, null);
  // FIX 3: typed as Record<string, number> — removes the need for "as number" casts
  const monthlyRevenue = unwrap(
    monthlyRevenueRes,
    {} as Record<string, number>,
  );
  const topClients = unwrap(topClientsRes, []);
  const recentTransactions = unwrap(recentTransactionsRes, []);
  const overdueInvoices = unwrap(overdueInvoicesRes, []);
  const upcomingOverdue = unwrap(upcomingOverdueRes, []);
  const clientPieCharts = unwrap(clientPieRes, null);
  const clientsNumByMonth = unwrap(clientGrowthRes, {} as MonthlyClientCount);
  const topProducts = unwrap(topProductsRes, []);
  const paymentMethodStats = unwrap(paymentMethodRes, {
    online: 0,
    cash: 0,
    total: 0,
  });

  // FIX 4: safe mapping — value is now typed as number, no cast needed
  const revenueData = months
    .filter((m) => monthlyRevenue[m] !== undefined)
    .map((m) => ({ month: m, revenue: monthlyRevenue[m] }));

  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-475 flex-col gap-6">
        {/* ── Page heading ── */}
        <DashboardHeader name={name} role={role} avatar={avatar} />

        {/* FIX 5: null-guard — components only render when kpiCardDetails is available */}
        {kpiCardDetails && (
          <>
            {/* ── KPI cards ── */}
            <DashboardKpiCards data={kpiCardDetails} />

            {/* ── Invoice status | Top products | Payment method ── */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InvoiceStatusChart invStatusChart={kpiCardDetails} />

              <TopProductsChart topProducts={topProducts} />

              <PaymentMethodChart stats={paymentMethodStats} />
            </div>
          </>
        )}

        {/* ── Revenue chart ── */}
        <RevenueChart revenueData={revenueData} />

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
