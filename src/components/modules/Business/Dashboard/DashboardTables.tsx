import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ── Top Clients ───────────────────────────────────────────────────
const topClients = [
  {
    initials: "RA",
    name: "Rafiq Ahmed",
    spent: "৳42,500",
    invoices: 18,
    status: "Active",
  },
  {
    initials: "SK",
    name: "Sadia Khan",
    spent: "৳38,200",
    invoices: 14,
    status: "Active",
  },
  {
    initials: "TH",
    name: "Tanvir Hossain",
    spent: "৳31,800",
    invoices: 11,
    status: "Active",
  },
  {
    initials: "NI",
    name: "Nusrat Islam",
    spent: "৳27,400",
    invoices: 9,
    status: "Pending",
  },
  {
    initials: "MR",
    name: "Mahbub Rahman",
    spent: "৳24,100",
    invoices: 8,
    status: "Active",
  },
];

function statusVariant(
  s: string,
): "default" | "secondary" | "destructive" | "outline" {
  if (s === "Active") return "default";
  if (s === "Pending") return "secondary";
  return "outline";
}

export function TopClientsTable() {
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
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-[9px] shrink-0">
                      {c.initials}
                    </span>
                    <span className="text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-right font-medium text-foreground">
                  {c.spent}
                </td>
                <td className="py-2.5 text-right text-muted-foreground">
                  {c.invoices}
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
const transactions = [
  {
    type: "online",
    client: "Rafiq Ahmed",
    item: "Samsung Galaxy A55",
    time: "Today, 2:14 PM",
    amount: "+৳48,000",
    status: "Paid",
  },
  {
    type: "cash",
    client: "Sadia Khan",
    item: "iPhone 15 Case × 3",
    time: "Today, 11:30 AM",
    amount: "+৳3,600",
    status: "Cash",
  },
  {
    type: "online",
    client: "Tanvir Hossain",
    item: "Redmi Note 13",
    time: "Yesterday, 5:45 PM",
    amount: "+৳28,500",
    status: "Paid",
  },
  {
    type: "cash",
    client: "Nusrat Islam",
    item: "Realme Buds Air 5",
    time: "Yesterday, 3:10 PM",
    amount: "+৳4,200",
    status: "Cash",
  },
  {
    type: "online",
    client: "Mahbub Rahman",
    item: "Screen Guard × 5",
    time: "Apr 21, 10:05 AM",
    amount: "+৳1,250",
    status: "Sent",
  },
];

function TxnStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Cash: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    Sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border ${styles[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

export function RecentTransactions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Recent transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-0">
        {transactions.map((t, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 py-2.5 ${i < transactions.length - 1 ? "border-b border-border/50" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                t.type === "cash" ? "bg-emerald-500/10" : "bg-blue-500/10"
              }`}
            >
              {t.type === "cash" ? "💵" : "💳"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">
                {t.client} — {t.item}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {t.time}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-medium text-emerald-400">{t.amount}</p>
              <div className="mt-0.5">
                <TxnStatusBadge status={t.status} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
