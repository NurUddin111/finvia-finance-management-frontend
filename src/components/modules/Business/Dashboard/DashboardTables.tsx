import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITopClient } from "@/types/client";
import { CreditCard, Crown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// ── Shared helpers
// ─────────────────────────────────────────────────────────────────

function ClientAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500/20 to-indigo-500/20 text-sm font-semibold text-white">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ── Top Clients Table
// ─────────────────────────────────────────────────────────────────

const CLIENT_STATUS_STYLES: Record<string, string> = {
  ACTIVE: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  INACTIVE: "border-slate-500/20   bg-slate-500/10   text-slate-400",
  PENDING: "border-blue-500/20    bg-blue-500/10    text-blue-400",
};

const CLIENT_STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
};

const RANK_STYLES: Record<number, string> = {
  1: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  2: "border-slate-400/30  bg-slate-400/10  text-slate-400",
  3: "border-orange-500/30 bg-orange-500/10 text-orange-500",
};

function ClientStatusBadge({ status }: { status: string }) {
  const style = CLIENT_STATUS_STYLES[status] ?? CLIENT_STATUS_STYLES.INACTIVE;
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-medium ${style}`}
    >
      {CLIENT_STATUS_LABEL[status] ?? status}
    </span>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const style =
    RANK_STYLES[rank] ?? "border-blue-500/20 bg-blue-500/10 text-blue-400";
  return (
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${style}`}
    >
      {rank === 1 ? <Crown size={12} /> : rank}
    </div>
  );
}

export function TopClientsTable({ topClients }: { topClients: ITopClient[] }) {
  if (!topClients?.length) {
    return (
      <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816]">
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white">
              Top Clients
            </CardTitle>
            <p className="text-sm text-slate-400">
              Highest revenue-generating customers
            </p>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="flex h-65 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 text-center">
            <div className="mb-4 rounded-full border border-white/10 bg-white/3 p-4">
              <Crown className="size-5 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-slate-300">No clients yet</p>
            <p className="mt-1 text-xs text-slate-500">
              Your top clients will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
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

      <CardContent className="relative space-y-3">
        {topClients.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 transition-all duration-200 hover:border-blue-500/10 hover:bg-white/4"
          >
            <RankBadge rank={i + 1} />
            <ClientAvatar name={c.name} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {c.name}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">
                  {c.totalInvoices}{" "}
                  {c.totalInvoices === 1 ? "invoice" : "invoices"}
                </span>
                <ClientStatusBadge status={c.status} />
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-emerald-400">
                ৳{c.totalSpent.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">total revenue</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────
// ── Recent Transactions
// ─────────────────────────────────────────────────────────────────

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

const TXN_STATUS_STYLES: Record<TxnStatus, string> = {
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  SENT: "bg-blue-500/10    text-blue-400    border-blue-500/20",
  FAILED: "bg-red-500/10     text-red-400     border-red-500/20",
  CANCELLED: "bg-white/5        text-slate-400   border-white/10",
};

const TXN_STATUS_LABEL: Record<TxnStatus, string> = {
  PAID: "Paid",
  SENT: "Sent",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

function TxnStatusBadge({ status }: { status: TxnStatus }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${TXN_STATUS_STYLES[status]}`}
    >
      {TXN_STATUS_LABEL[status]}
    </span>
  );
}

export function RecentTransactions({ recentTransactions }: TransactionDetails) {
  if (!recentTransactions?.length) {
    return (
      <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816]">
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
          <div className="flex h-65 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 text-center">
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
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
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
              className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 transition-all duration-200 hover:border-blue-500/10 hover:bg-white/4"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-500/10 text-emerald-400">
                <CreditCard className="size-4" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
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
                        <span className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[10px] text-slate-400">
                          +{extraItems} more
                        </span>
                      )}
                      {t.totalItems > 1 && (
                        <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] text-blue-400">
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
