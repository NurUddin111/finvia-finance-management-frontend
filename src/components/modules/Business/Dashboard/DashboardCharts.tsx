/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-medium">
        ৳{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueChart({
  revenueData,
}: {
  revenueData: {
    month: string;
    revenue: number;
  }[];
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300  hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative flex flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Monthly Revenue
          </CardTitle>

          <p className="text-sm text-slate-400">
            Revenue performance over recent months
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium  text-blue-400 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15">
            Monthly
          </button>
        </div>
      </CardHeader>

      <CardContent className="relative pt-4">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={revenueData} barCategoryGap="22%">
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(96,165,250,0.95)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.35)" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "rgba(148,163,184,0.8)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(v) => `৳${v / 1000}K`}
              tick={{
                fill: "rgba(148,163,184,0.8)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<RevenueTooltip />}
              cursor={{
                fill: "rgba(255,255,255,0.025)",
              }}
            />

            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[10, 10, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function InvoiceStatusChart({
  invStatusChart,
}: {
  invStatusChart: IKPICardDetails;
}) {
  const invoiceData = [
    {
      name: "Paid",
      value: invStatusChart.paidInvPer,
      count: invStatusChart.paidInvoices,
      fill: "#22c55e",
    },
    {
      name: "Sent",
      value: invStatusChart.pendingInvPer,
      count: invStatusChart.pendingInvoices,
      fill: "#3b82f6",
    },
    {
      name: "Draft",
      value: invStatusChart.draftedInvPer,
      count: invStatusChart.draftedInvoices,
      fill: "#f59e0b",
    },
  ];

  const totalInvoices =
    Number(invStatusChart.paidInvoices) +
    Number(invStatusChart.pendingInvoices) +
    Number(invStatusChart.draftedInvoices);

  const isEmpty = totalInvoices === 0;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Invoice Status
          </CardTitle>

          <p className="text-sm text-slate-400">
            Distribution of invoice processing states
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {isEmpty ? (
          <div className="flex h-65 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/3 text-center">
            <div className="mb-3 rounded-full border border-white/10 bg-white/3 p-3">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
            </div>

            <p className="text-sm font-medium text-slate-300">
              No invoice data yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Invoice analytics will appear here
            </p>
          </div>
        ) : (
          <>
            {/* LEGEND */}
            <div className="mb-6 flex flex-wrap gap-3">
              {invoiceData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 backdrop-blur-md"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: item.fill }}
                  />

                  <span className="text-xs font-medium text-slate-300">
                    {item.name}
                  </span>

                  <span className="text-xs text-slate-500">{item.value}%</span>
                </div>
              ))}
            </div>

            {/* CHART */}
            <div className="relative flex items-center justify-center">
              {/* CENTER INFO */}
              <div className="absolute z-10 flex flex-col items-center">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  {totalInvoices}
                </span>

                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Invoices
                </span>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={invoiceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={92}
                    paddingAngle={3}
                    dataKey="count"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={2}
                  />

                  <Tooltip
                    formatter={(v, n) => [`${v ?? 0} invoices`, String(n)]}
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      backdropFilter: "blur(10px)",
                      fontSize: 12,
                      color: "white",
                    }}
                    labelStyle={{
                      color: "rgba(148,163,184,0.9)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

type TopProduct = { name: string; totalSold: number };

export function TopProductsChart({
  topProducts,
}: {
  topProducts: TopProduct[];
}) {
  const data = topProducts.map((p) => ({
    name: p.name,
    units: p.totalSold,
  }));

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Top Selling Products
          </CardTitle>

          <p className="text-sm text-slate-400">
            Best performing products based on units sold
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {data.length === 0 ? (
          <div className="flex h-65 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 text-center">
            <div className="mb-3 rounded-full border border-white/10 bg-white/3 p-3">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
            </div>

            <p className="text-sm font-medium text-slate-300">
              No sales data yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Product analytics will appear here
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data}
              layout="vertical"
              barSize={22}
              margin={{
                top: 8,
                right: 12,
                left: 20,
                bottom: 8,
              }}
            >
              <defs>
                <linearGradient
                  id="productBarGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="rgba(96,165,250,0.95)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.45)" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                horizontal={false}
              />

              <XAxis
                type="number"
                allowDecimals={false}
                tick={{
                  fill: "rgba(148,163,184,0.8)",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{
                  fill: "rgba(226,232,240,0.92)",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(v) => [`${v ?? 0} units`, "Sold"]}
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  backdropFilter: "blur(10px)",
                  fontSize: 12,
                  color: "white",
                }}
                itemStyle={{
                  color: "#60a5fa",
                }}
                cursor={{
                  fill: "rgba(255,255,255,0.025)",
                }}
              />

              <Bar
                dataKey="units"
                radius={[0, 12, 12, 0]}
                fill="url(#productBarGradient)"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// ── Payment Method Donut ──────────────────────────────────────────
type PaymentMethodStats = { online: number; cash: number; total: number };

const PAYMENT_DATA = (stats: PaymentMethodStats) => [
  { name: "Online", value: stats.online, fill: "#58a6ff" },
  { name: "Cash", value: stats.cash, fill: "#d2a8ff" },
];

export function PaymentMethodChart({ stats }: { stats: PaymentMethodStats }) {
  const data = PAYMENT_DATA(stats);
  const isEmpty = stats.total === 0;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Payment Methods
          </CardTitle>

          <p className="text-sm text-slate-400">
            Preferred payment channels used by customers
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {isEmpty ? (
          <div className="flex h-65 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/3 text-center">
            <div className="mb-3 rounded-full border border-white/10 bg-white/3 p-3">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
            </div>

            <p className="text-sm font-medium text-slate-300">
              No payment data yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Payment analytics will appear here
            </p>
          </div>
        ) : (
          <>
            {/* LEGEND */}
            <div className="mb-6 flex flex-wrap gap-3">
              {data.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 backdrop-blur-md"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: d.fill }}
                  />

                  <span className="text-xs font-medium text-slate-300">
                    {d.name}
                  </span>

                  <span className="text-xs text-slate-500">{d.value}%</span>
                </div>
              ))}
            </div>

            {/* CHART */}
            <div className="relative flex items-center justify-center">
              {/* CENTER INFO */}
              <div className="absolute z-10 flex flex-col items-center">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  {stats.total}
                </span>

                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Payments
                </span>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={92}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={2}
                  />

                  <Tooltip
                    formatter={(v, n) => [`${v ?? 0}%`, String(n)]}
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      backdropFilter: "blur(10px)",
                      fontSize: 12,
                      color: "white",
                    }}
                    labelStyle={{
                      color: "rgba(148,163,184,0.9)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Client Growth Line Chart ──────────────────────────────────────

type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

type MonthlyClientCount = Partial<Record<Month, number>>;

import { TrendingUp } from "lucide-react";

export function ClientGrowthChart({
  clientNumbers,
}: {
  clientNumbers: MonthlyClientCount;
}) {
  const monthsOrder: Month[] = [
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

  const chartData = monthsOrder
    .filter((m) => clientNumbers[m] !== undefined)
    .map((m) => ({
      month: m,
      clients: clientNumbers[m],
    }));

  const startMonth = chartData[0]?.month || "Jan";
  const endMonth = chartData[chartData.length - 1]?.month || "Jan";

  const currentYear = new Date().getFullYear();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* LEFT */}
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white">
              Client Growth
            </CardTitle>

            <p className="text-sm text-slate-400">
              Active customer growth over time
            </p>
          </div>

          {/* RIGHT */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
            <TrendingUp className="size-3.5" />
            {startMonth} – {endMonth} {currentYear}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-4">
        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 12,
                left: -18,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59,130,246,0.45)" />

                  <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "rgba(148,163,184,0.8)",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "rgba(148,163,184,0.8)",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: any) => [`${value ?? 0} Clients`, "Total"]}
                cursor={{
                  stroke: "rgba(59,130,246,0.4)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  backdropFilter: "blur(10px)",
                  fontSize: 12,
                  color: "white",
                }}
                labelStyle={{
                  color: "rgba(148,163,184,0.9)",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              />

              <Line
                type="monotone"
                dataKey="clients"
                stroke="#3b82f6"
                strokeWidth={3.5}
                dot={{
                  fill: "#0B1120",
                  stroke: "#3b82f6",
                  strokeWidth: 2.5,
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                  fill: "#3b82f6",
                  stroke: "#0B1120",
                  strokeWidth: 2,
                }}
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── New vs Returning Donut ────────────────────────────────────────

import { Users2 } from "lucide-react";
import { IClientsPieChartData } from "@/types/client";
import { IKPICardDetails } from "@/types/dashboard";

export function ClientTypeChart({
  clientPieChartData,
}: {
  clientPieChartData: IClientsPieChartData | null;
}) {
  if (!clientPieChartData) return null;
  const formattedClientPieChart = [
    {
      name: "New",
      fill: "#3b82f6",
      value: clientPieChartData.newClientsThisMonth,
      percentage: clientPieChartData.newClientsPercentage,
      difference: clientPieChartData.newClientsDiff,
    },
    {
      name: "Returning",
      fill: "#22c55e",
      value: clientPieChartData.oldClientsThisMonth,
      percentage: clientPieChartData.oldClientsPercentage,
      difference: clientPieChartData.oldClientsDiff,
    },
  ];

  const totalClients =
    clientPieChartData.newClientsThisMonth +
    clientPieChartData.oldClientsThisMonth;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Client Growth
          </CardTitle>

          <p className="text-sm text-slate-400">
            New versus returning customer engagement
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* LEGEND */}
        <div className="mb-6 flex flex-wrap gap-3">
          {formattedClientPieChart.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 backdrop-blur-md"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: d.fill }}
              />

              <span className="text-xs font-medium text-slate-300">
                {d.name}
              </span>

              <span className="text-xs text-slate-500">{d.percentage}%</span>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="relative flex items-center justify-center">
          {/* CENTER INFO */}
          <div className="absolute z-10 flex flex-col items-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/3">
              <Users2 className="size-4 text-blue-400" />
            </div>

            <span className="text-3xl font-semibold tracking-tight text-white">
              {totalClients}
            </span>

            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Clients
            </span>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={formattedClientPieChart}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={92}
                paddingAngle={3}
                dataKey="value"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={2}
              />

              <Tooltip
                formatter={(v, n) => [`${v ?? 0} clients`, String(n)]}
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  backdropFilter: "blur(10px)",
                  fontSize: 12,
                  color: "white",
                }}
                labelStyle={{
                  color: "rgba(148,163,184,0.9)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* METRICS */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* NEW */}
          <div className="rounded-2xl border border-blue-500/10 bg-blue-500/4 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              New Clients
            </p>

            <p className="mt-3 text-3xl font-semibold text-blue-400">
              {clientPieChartData.newClientsThisMonth}
            </p>

            <p
              className={`mt-2 text-xs font-medium ${
                clientPieChartData.newClientsDiff >= 0
                  ? "text-emerald-400"
                  : "text-orange-400"
              }`}
            >
              {clientPieChartData.newClientsDiff >= 0 ? "↑" : "↓"}
              {Math.abs(clientPieChartData.newClientsDiff)} vs last month
            </p>
          </div>

          {/* RETURNING */}
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/4 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Returning Clients
            </p>

            <p className="mt-3 text-3xl font-semibold text-emerald-400">
              {clientPieChartData.oldClientsThisMonth}
            </p>

            <p
              className={`mt-2 text-xs font-medium ${
                clientPieChartData.oldClientsDiff >= 0
                  ? "text-emerald-400"
                  : "text-orange-400"
              }`}
            >
              {clientPieChartData.oldClientsDiff >= 0 ? "↑" : "↓"}
              {Math.abs(clientPieChartData.oldClientsDiff)} vs last month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
