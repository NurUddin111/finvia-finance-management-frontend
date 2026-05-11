import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function statusVariant(
  s: string,
): "default" | "secondary" | "destructive" | "outline" {
  if (s === "Active") return "default";
  if (s === "Pending") return "secondary";
  return "outline";
}

export function TopClientsTable({
  topClients,
}: {
  topClients: {
    name: string;
    totalSpent: number;
    totalInvoices: number;
    status: string;
  }[];
}) {
  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-linear-to-b
        from-[#0B1120]
        to-[#050816]
        transition-all duration-300
        hover:border-blue-500/20
        hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]
      "
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Top Clients
          </CardTitle>

          <p className="text-sm text-slate-400">
            Highest revenue-generating customers
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative px-0 pb-0">
        {/* Desktop/Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 pb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Client
                </th>

                <th className="px-6 pb-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Revenue
                </th>

                <th className="px-6 pb-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Invoices
                </th>

                <th className="px-6 pb-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {topClients.map((c, i) => (
                <tr
                  key={c.name}
                  className="
                    border-b border-white/4
                    transition-all duration-200
                    hover:bg-white/3
                  "
                >
                  {/* Client */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <div
                        className="
                          flex h-7 w-7 items-center justify-center
                          rounded-full
                          border border-blue-500/20
                          bg-blue-500/10
                          text-xs font-semibold text-blue-400
                        "
                      >
                        {i + 1}
                      </div>

                      {/* Avatar */}
                      <div
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-full
                          bg-linear-to-br
                          from-blue-500/20
                          to-indigo-500/20
                          text-sm font-semibold text-white
                        "
                      >
                        {c.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {c.name}
                        </p>

                        <p className="text-xs text-slate-500">Premium Client</p>
                      </div>
                    </div>
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-white">
                      ৳{c.totalSpent}
                    </span>
                  </td>

                  {/* Invoices */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-slate-400">
                      {c.totalInvoices}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-right">
                    <Badge
                      variant={statusVariant(c.status)}
                      className={
                        c.status === "Active"
                          ? `
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-3 py-1
                            text-[11px]
                            font-medium
                            text-emerald-400
                            hover:bg-emerald-500/10
                          `
                          : `
                            border-blue-500/20
                            bg-blue-500/10
                            px-3 py-1
                            text-[11px]
                            font-medium
                            text-blue-400
                            hover:bg-blue-500/10
                          `
                      }
                    >
                      {c.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-3 p-4 md:hidden">
          {topClients.map((c, i) => (
            <div
              key={c.name}
              className="
                rounded-2xl
                border border-white/10
                bg-white/3
                p-4
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-full
                      bg-blue-500/10
                      text-sm font-semibold text-blue-400
                    "
                  >
                    {i + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>

                    <p className="text-xs text-slate-500">
                      {c.totalInvoices} invoices
                    </p>
                  </div>
                </div>

                <Badge
                  variant={statusVariant(c.status)}
                  className={
                    c.status === "Active"
                      ? `
                        border-emerald-500/20
                        bg-emerald-500/10
                        text-[10px]
                        text-emerald-400
                      `
                      : `
                        border-blue-500/20
                        bg-blue-500/10
                        text-[10px]
                        text-blue-400
                      `
                  }
                >
                  {c.status}
                </Badge>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Revenue</span>

                <span className="text-sm font-semibold text-white">
                  ৳{c.totalSpent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Recent Transactions ───────────────────────────────────────────
type TxnStatus = "SENT" | "PAID" | "FAILED" | "CANCELLED";

type RecentTransaction = {
  client: { name: string };
  items: { name: string; quantity: number }[];
  subtotal: number;
  status: TxnStatus;
  totalItems: number;
  updatedAt: Date;
  formattedDate: string;
};

type TransactionDetails = {
  recentTransactions: RecentTransaction[];
};

const STATUS_STYLES: Record<TxnStatus, string> = {
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  SENT: "bg-blue-500/10   text-blue-400    border-blue-500/20",
  FAILED: "bg-red-500/10    text-red-400     border-red-500/20",
  CANCELLED: "bg-muted/30      text-muted-foreground border-border",
};

const STATUS_LABEL: Record<TxnStatus, string> = {
  PAID: "Paid",
  SENT: "Sent",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

function TxnStatusBadge({ status }: { status: TxnStatus }) {
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

import { CreditCard } from "lucide-react";

export function RecentTransactions({ recentTransactions }: TransactionDetails) {
  if (!recentTransactions?.length) {
    return (
      <Card
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-linear-to-b
          from-[#0B1120]
          to-[#050816]
        "
      >
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white">
              Recent Transactions
            </CardTitle>

            <p className="text-sm text-slate-400">
              Latest payment activities and invoice transactions
            </p>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <div
            className="
              flex h-65 flex-col items-center justify-center
              rounded-2xl
              border border-dashed border-white/10
              bg-white/2
              text-center
            "
          >
            <div className="mb-4 rounded-full border border-white/10 bg-white/3 p-4">
              <CreditCard className="size-5 text-blue-400" />
            </div>

            <p className="text-sm font-medium text-slate-300">
              No transactions yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Paid invoices will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-linear-to-b
        from-[#0B1120]
        to-[#050816]
        transition-all duration-300
        hover:border-blue-500/20
        hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]
      "
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            Recent Transactions
          </CardTitle>

          <p className="text-sm text-slate-400">
            Latest payment activities and invoice transactions
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {recentTransactions.map((t, i) => {
          const firstItem = t.items[0];
          const extraItems = t.items.length - 1;

          return (
            <div
              key={i}
              className="
                flex items-start gap-4
                rounded-2xl
                border border-white/5
                bg-white/2
                p-4
                transition-all duration-200
                hover:border-blue-500/10
                hover:bg-white/4
              "
            >
              {/* Icon */}
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-emerald-500/10
                  bg-emerald-500/10
                  text-emerald-400
                "
              >
                <CreditCard className="size-4" />
              </div>

              {/* Main Content */}
              <div className="min-w-0 flex-1">
                {/* Top */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {t.client.name}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {firstItem && (
                        <span className="truncate text-xs text-slate-400">
                          {firstItem.quantity > 1
                            ? `${firstItem.name} ×${firstItem.quantity}`
                            : firstItem.name}
                        </span>
                      )}

                      {extraItems > 0 && (
                        <span
                          className="
                            rounded-md
                            border border-white/10
                            bg-white/3
                            px-2 py-1
                            text-[10px]
                            text-slate-400
                          "
                        >
                          +{extraItems} more
                        </span>
                      )}

                      {t.totalItems > 1 && (
                        <span
                          className="
                            rounded-md
                            border border-blue-500/20
                            bg-blue-500/10
                            px-2 py-1
                            text-[10px]
                            text-blue-400
                          "
                        >
                          {t.totalItems} items
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                      {t.formattedDate}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      +৳{t.subtotal.toLocaleString()}
                    </p>

                    <div className="mt-2">
                      <TxnStatusBadge status={t.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
