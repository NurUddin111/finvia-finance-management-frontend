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

// ── Invoice Status Donut ──────────────────────────────────────────
// const invoiceData = [
//   { name: "Paid", value: 142, fill: "#3fb950" },
//   { name: "Sent", value: 24, fill: "#58a6ff" },
//   { name: "Draft", value: 18, fill: "#f0883e" },
// ];

export function InvoiceStatusChart({
  paidInv,
  paidInvPer,
  pendingInv,
  pendingInvPer,
  draftedInv,
  draftedInvPer,
}: {
  paidInv: number;
  paidInvPer: number;
  pendingInv: number;
  pendingInvPer: number;
  draftedInv: number;
  draftedInvPer: number;
}) {
  const invoiceData = [
    { name: "Paid", value: paidInv, fill: "#3fb950" },
    { name: "Sent", value: pendingInv, fill: "#58a6ff" },
    { name: "Draft", value: draftedInv, fill: "#f0883e" },
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
            Paid {paidInvPer}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: "#58a6ff" }}
            />
            Sent {pendingInvPer}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{ background: "#f0883e" }}
            />
            Draft {draftedInvPer}%
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
const productData = [
  { name: "Galaxy A55", units: 84 },
  { name: "iPhone Case", units: 72 },
  { name: "Redmi 13", units: 61 },
  { name: "Realme Buds", units: 53 },
  { name: "Screen Guard", units: 47 },
];

export function TopProductsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Top selling products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={productData}
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
              formatter={(v, n) => [`${v ?? 0} units`, String(n)]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
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
const clientGrowthData = [
  { month: "Jan", clients: 28 },
  { month: "Feb", clients: 34 },
  { month: "Mar", clients: 39 },
  { month: "Apr", clients: 45 },
  { month: "May", clients: 54 },
  { month: "Jun", clients: 67 },
];

export function ClientGrowthChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Client growth</CardTitle>
          <span className="text-[11px] text-muted-foreground">
            Jan – Jun 2025
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={clientGrowthData}>
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
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`${v ?? 0} clients`, "Total"]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              cursor={{ stroke: "hsl(var(--border))" }}
            />
            <Line
              type="monotone"
              dataKey="clients"
              stroke="#58a6ff"
              strokeWidth={2}
              dot={{ fill: "#58a6ff", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#58a6ff" }}
            />
          </LineChart>
        </ResponsiveContainer>
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
  console.log(clientPieChartData);
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
              {clientPieChartData.newClientsDiff} vs last month
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
              {clientPieChartData.oldClientsDiff} vs last month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
