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

// ── Monthly Revenue ───────────────────────────────────────────────
// const revenueDatass = [
//   { month: "Jan", revenue: 42000 },
//   { month: "Feb", revenue: 58000 },
//   { month: "Mar", revenue: 35000 },
//   { month: "Apr", revenue: 71000 },
//   { month: "May", revenue: 63000 },
//   { month: "Jun", revenue: 89000 },
// ];

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
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Monthly revenue</CardTitle>
          <div className="flex gap-1">
            {/* <button className="text-[11px] px-3 py-1 rounded-full border border-border text-muted-foreground">
              Weekly
            </button> */}
            <button className="text-[11px] px-3 py-1 rounded-full border border-blue-500/50 text-blue-400 bg-blue-500/10">
              Monthly
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData} barCategoryGap="30%" barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `৳${v / 1000}K`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<RevenueTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="revenue"
              fill="rgba(88,166,255,0.75)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

type InvStatusChart = {
  paidInvoices: number;
  paidInvPer: number;
  pendingInvoices: number;
  pendingInvPer: number;
  draftedInvoices: number;
  draftedInvPer: number;
};

export function InvoiceStatusChart({
  invStatusChart,
}: {
  invStatusChart: InvStatusChart;
}) {
  const invoiceData = [
    { name: "Paid", value: invStatusChart.paidInvoices, fill: "#3fb950" },
    { name: "Sent", value: invStatusChart.pendingInvoices, fill: "#58a6ff" },
    { name: "Draft", value: invStatusChart.draftedInvoices, fill: "#f0883e" },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Invoice status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: "#3fb950" }}
            />
            Paid {invStatusChart.paidInvPer}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: "#58a6ff" }}
            />
            Sent {invStatusChart.pendingInvPer}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: "#f0883e" }}
            />
            Draft {invStatusChart.draftedInvPer}%
          </div>
        </div>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie
              data={invoiceData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={76}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
            />
            <Tooltip
              formatter={(v, n) => [`${v ?? 0} invoices`, String(n)]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ── Top Products Horizontal Bar ───────────────────────────────────
// const productData = [
//   { name: "Galaxy A55", units: 84 },
//   { name: "iPhone Case", units: 72 },
//   { name: "Redmi 13", units: 61 },
//   { name: "Realme Buds", units: 53 },
//   { name: "Screen Guard", units: 47 },
// ];

type TopProduct = { name: string; totalSold: number };

export function TopProductsChart({
  topProducts,
}: {
  topProducts: TopProduct[];
}) {
  const data = topProducts.map((p) => ({ name: p.name, units: p.totalSold }));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Top selling products
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-55 text-sm text-muted-foreground">
            No sales data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data}
              layout="vertical"
              barSize={18}
              margin={{ left: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v) => [`${v ?? 0} units`, "Sold"]}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                itemStyle={{ color: "#4ade80" }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar
                dataKey="units"
                radius={[0, 4, 4, 0]}
                shape={(props: any) => {
                  const { x, y, width, height, index } = props;
                  const opacity = +(0.85 - index * 0.13).toFixed(2);
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={`rgba(88,166,255,${opacity})`}
                      rx={4}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// ── Payment Method Donut ──────────────────────────────────────────
const paymentData = [
  { name: "Online", value: 58, fill: "#58a6ff" },
  { name: "Cash", value: 42, fill: "#d2a8ff" },
];

export function PaymentMethodChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Payment method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-3">
          {paymentData.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className="w-2 h-2 rounded-sm"
                style={{ background: d.fill }}
              />
              {d.name} {d.value}%
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={76}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
            />
            <Tooltip
              formatter={(v, n) => [`${v ?? 0}%`, String(n)]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
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

export function ClientGrowthChart({
  clientNumbers,
}: {
  clientNumbers: MonthlyClientCount;
}) {
  // 1. Format the raw object into the array Recharts expects
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

  // 2. Dynamically determine the date range for the sub-header
  const startMonth = chartData[0]?.month || "Jan";
  const endMonth = chartData[chartData.length - 1]?.month || "Jan";
  const currentYear = new Date().getFullYear();

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Client Growth
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              Total active client base over time
            </p>
          </div>
          <span className="px-2 py-1 bg-muted/50 rounded-md text-[11px] font-medium text-muted-foreground">
            {startMonth} – {endMonth} {currentYear}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(value: any) => [`${value ?? 0} Clients`, "Total"]}
                cursor={{
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Line
                type="monotone"
                dataKey="clients"
                stroke="hsl(var(--primary))" // Uses your theme's primary color
                strokeWidth={3}
                dot={{
                  fill: "hsl(var(--card))",
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                  fill: "hsl(var(--primary))",
                }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── New vs Returning Donut ────────────────────────────────────────

// const clientTypeData = [
//   { name: "New", value: 27 },
//   { name: "Returning", value: 40 },
// ];

type clientPieChart = {
  newClientsThisMonth: number;
  newClientsDiff: number;
  oldClientsThisMonth: number;
  oldClientsDiff: number;
  newClientsPercentage: number;
  oldClientsPercentage: number;
};

export function ClientTypeChart({
  clientPieChartData,
}: {
  clientPieChartData: clientPieChart;
}) {
  const formattedClientPieChart = [
    {
      name: "New",
      fill: "#58a6ff",
      value: clientPieChartData.newClientsThisMonth,
      percentage: clientPieChartData.newClientsPercentage,
      difference: clientPieChartData.newClientsDiff,
    },
    {
      name: "Returning",
      fill: "#3fb950",
      value: clientPieChartData.oldClientsThisMonth,
      percentage: clientPieChartData.oldClientsPercentage,
      difference: clientPieChartData.oldClientsDiff,
    },
  ];
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          New vs returning clients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-2">
          {formattedClientPieChart.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className="w-2 h-2 rounded-sm"
                style={{ background: d.fill }}
              />
              {d.name} {d.percentage}%
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <Pie
              data={formattedClientPieChart}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={76}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
            />
            <Tooltip
              formatter={(v, n) => [`${v ?? 0} clients`, String(n)]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-background rounded-lg p-3 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">
              New this month
            </p>
            <p className="text-xl font-semibold text-blue-400">
              {clientPieChartData.newClientsThisMonth}
            </p>
            <p
              className={`text-[10px] mt-1 ${clientPieChartData.newClientsDiff >= 0 ? " text-emerald-400" : "text-orange-400"}`}
            >
              {clientPieChartData.newClientsDiff >= 0 ? "↑" : "↓"}
              {Math.abs(clientPieChartData.newClientsDiff)} vs last month
            </p>
          </div>
          <div className="bg-background rounded-lg p-3 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">Returning</p>
            <p className="text-xl font-semibold text-emerald-400">
              {clientPieChartData.oldClientsThisMonth}
            </p>
            <p
              className={`text-[10px] mt-1 ${clientPieChartData.oldClientsDiff >= 0 ? " text-emerald-400" : "text-orange-400"}`}
            >
              {clientPieChartData.oldClientsDiff >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(clientPieChartData.oldClientsDiff)} vs last month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
