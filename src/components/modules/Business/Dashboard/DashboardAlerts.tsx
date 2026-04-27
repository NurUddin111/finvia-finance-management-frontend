import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// ── Overdue Invoices ──────────────────────────────────────────────

type OverdueInvoice = {
  client: {
    name: string;
  };
  invoiceNumber: string;
  dueDate: string;
  total: number;
  formattedDueDate: string;
  daysAgo: number;
};

export function OverdueInvoices({
  overdueInvoices,
}: {
  overdueInvoices: OverdueInvoice[];
}) {
  const totalOverdue = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0);
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Overdue invoices
          </CardTitle>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            {overdueInvoices.length} overdue
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {/* Alert banner */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/7 border border-red-500/20 mb-4 text-xs text-red-400">
          <AlertCircle size={13} className="shrink-0" />
          {overdueInvoices.length} invoices are past their due date. Send
          reminders to avoid revenue loss.
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-muted-foreground font-normal pb-2.5">
                Client
              </th>
              <th className="text-left text-muted-foreground font-normal pb-2.5">
                Invoice
              </th>
              <th className="text-left text-muted-foreground font-normal pb-2.5">
                Due date
              </th>
              <th className="text-right text-muted-foreground font-normal pb-2.5">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {overdueInvoices.map((inv, i) => (
              <tr
                key={inv.invoiceNumber}
                className={
                  i < overdueInvoices.length - 1
                    ? "border-b border-border/50"
                    : ""
                }
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{inv.client.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-muted-foreground">
                  {inv.invoiceNumber}
                </td>
                <td className="py-2.5">
                  <span className="text-foreground">
                    {inv.formattedDueDate}
                  </span>
                  <span className="text-red-400 ml-1.5 text-[10px]">
                    {inv.daysAgo}d ago
                  </span>
                </td>
                <td className="py-2.5 text-right font-medium text-red-400">
                  ৳{inv.total}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border">
              <td
                colSpan={3}
                className="pt-3 text-muted-foreground text-[11px]"
              >
                Total overdue
              </td>
              <td className="pt-3 text-right font-semibold text-red-400">
                ৳{totalOverdue}
              </td>
            </tr>
          </tfoot>
        </table>
      </CardContent>
    </Card>
  );
}

// ── Upcoming Due Dates ────────────────────────────────────────────
// const upcomingDues = [
//   {
//     day: "24",
//     month: "Apr",
//     urgent: true,
//     client: "Tanvir Hossain",
//     invoice: "#INV-1061 · iPhone 15 Pro Max",
//     amount: "৳1,32,000",
//     status: "Sent",
//   },
//   {
//     day: "25",
//     month: "Apr",
//     urgent: true,
//     client: "Nusrat Islam",
//     invoice: "#INV-1063 · Accessories bundle",
//     amount: "৳8,400",
//     status: "Sent",
//   },
//   {
//     day: "27",
//     month: "Apr",
//     urgent: false,
//     client: "Sadia Khan",
//     invoice: "#INV-1064 · Samsung A35 × 2",
//     amount: "৳52,000",
//     status: "Draft",
//   },
//   {
//     day: "28",
//     month: "Apr",
//     urgent: false,
//     client: "Mahbub Rahman",
//     invoice: "#INV-1065 · Realme GT 6",
//     amount: "৳42,500",
//     status: "Sent",
//   },
//   {
//     day: "30",
//     month: "Apr",
//     urgent: false,
//     client: "Rafiq Ahmed",
//     invoice: "#INV-1066 · Repair service",
//     amount: "৳3,200",
//     status: "Draft",
//   },
// ];

type TxnStatus = "SENT" | "FAILED" | "CANCELLED";

type UpcomingOverdueInv = {
  client: { name: string };
  invoiceNumber: string;
  status: TxnStatus;
  dueDate: string;
  total: number;
  formattedDueDate: string;
};

const STATUS_STYLES: Record<TxnStatus, string> = {
  SENT: "bg-blue-500/10   text-blue-400    border-blue-500/20",
  FAILED: "bg-red-500/10    text-red-400     border-red-500/20",
  CANCELLED: "bg-muted/30      text-muted-foreground border-border",
};

const STATUS_LABEL: Record<TxnStatus, string> = {
  SENT: "Sent",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

function DueStatusBadge({ status }: { status: TxnStatus }) {
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function UpcomingDueDates({
  upcomingOverdueInv,
}: {
  upcomingOverdueInv: UpcomingOverdueInv[];
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Upcoming due dates
          </CardTitle>
          <span className="text-[11px] text-muted-foreground">Next 7 days</span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-0">
        {upcomingOverdueInv.map((d, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 py-2.5 ${i < upcomingOverdueInv.length - 1 ? "border-b border-border/50" : ""}`}
          >
            {/* Date badge */}
            <div
              className={`min-w-11 text-center py-1.5 px-1 rounded-lg border shrink-0 border-red-500/30 bg-red-500/6`}
            >
              <p className={`text-sm font-semibold leading-none text-red-400`}>
                {d.formattedDueDate.split(" ")[1].replace(",", "")}
              </p>
              <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
                {d.formattedDueDate
                  .split(" ")[0]
                  .replace(",", "")
                  .toUpperCase()}
              </p>
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">
                {d.client.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {d.invoiceNumber}
              </p>
            </div>

            {/* Amount + status */}
            <div className="text-right shrink-0">
              <p className="text-xs font-medium text-foreground">৳{d.total}</p>
              <div className="mt-1">
                <DueStatusBadge status={d.status} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
