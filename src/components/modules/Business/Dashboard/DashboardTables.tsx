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
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Top clients by revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-muted-foreground font-normal pb-2.5">
                Client
              </th>
              <th className="text-right text-muted-foreground font-normal pb-2.5">
                Spent
              </th>
              <th className="text-right text-muted-foreground font-normal pb-2.5">
                Inv.
              </th>
              <th className="text-right text-muted-foreground font-normal pb-2.5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {topClients.map((c, i) => (
              <tr
                key={c.name}
                className={
                  i < topClients.length - 1 ? "border-b border-border/50" : ""
                }
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded text-[9px] bg-blue-500/10 text-blue-400 shrink-0 font-medium">
                      {i + 1}
                    </span>
                    {/* <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-[9px] shrink-0">
                      {c.initials}
                    </span> */}
                    <span className="text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-right font-medium text-foreground">
                  {c.totalSpent}
                </td>
                <td className="py-2.5 text-right text-muted-foreground">
                  {c.totalInvoices}
                </td>
                <td className="py-2.5 text-right">
                  <Badge
                    variant={statusVariant(c.status)}
                    className={
                      c.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10 text-[10px]"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10 text-[10px]"
                    }
                  >
                    {c.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export function RecentTransactions({ recentTransactions }: TransactionDetails) {
  if (!recentTransactions?.length) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Recent transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-8 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm text-muted-foreground">No transactions yet</p>
          <p className="text-[11px] text-muted-foreground/50">
            Paid invoices will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Recent transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-0">
        {recentTransactions.map((t, i) => {
          const firstItem = t.items[0];
          const extraItems = t.items.length - 1;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 py-2.5 ${i < recentTransactions.length - 1 ? "border-b border-border/50" : ""}`}
            >
              {/* Icon — hardcoded cash until payment type is available from API */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 bg-emerald-500/10">
                💳
              </div>

              {/* Client + item summary */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground font-medium truncate">
                  {t.client.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  {firstItem && (
                    <span className="text-[10px] text-muted-foreground truncate max-w-30">
                      {firstItem.quantity > 1
                        ? `${firstItem.name} ×${firstItem.quantity}`
                        : firstItem.name}
                    </span>
                  )}
                  {extraItems > 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-border bg-muted/30 text-muted-foreground shrink-0">
                      +{extraItems} more
                    </span>
                  )}
                  {t.totalItems > 1 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-blue-500/20 bg-blue-500/8 text-blue-400 shrink-0">
                      {t.totalItems} items
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                  {t.formattedDate}
                </p>
              </div>

              {/* Amount + status */}
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-emerald-400">
                  +৳{t.subtotal.toLocaleString()}
                </p>
                <div className="mt-0.5">
                  <TxnStatusBadge status={t.status} />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
