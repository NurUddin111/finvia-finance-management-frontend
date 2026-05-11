import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CalendarClock } from "lucide-react";

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
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-red-500/10
        bg-linear-to-b
        from-[#0B1120]
        to-[#050816]
        transition-all duration-300
        hover:border-red-500/20
        hover:shadow-[0_0_40px_rgba(239,68,68,0.08)]
      "
    >
      {/* Ambient danger glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* LEFT */}
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white">
              Overdue Invoices
            </CardTitle>

            <p className="text-sm text-slate-400">
              Invoices requiring immediate payment attention
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              inline-flex w-fit items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/10
              px-3 py-1.5
              text-xs font-medium text-red-400
            "
          >
            <AlertTriangle className="size-3.5" />
            {overdueInvoices.length} overdue
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* ALERT BANNER */}
        <div
          className="
            mb-5 flex items-start gap-3
            rounded-2xl
            border border-red-500/15
            bg-red-500/5
            p-4
          "
        >
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl
              bg-red-500/10
              text-red-400
            "
          >
            <AlertCircle className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-red-400">
              Payment attention required
            </p>

            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              {overdueInvoices.length} invoices are past their due date. Follow
              up with clients to reduce delayed revenue collection.
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Client
                </th>

                <th className="pb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Invoice
                </th>

                <th className="pb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Due Date
                </th>

                <th className="pb-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {overdueInvoices.map((inv) => (
                <tr
                  key={inv.invoiceNumber}
                  className="
                    border-b border-white/4
                    transition-all duration-200
                    hover:bg-red-500/3
                  "
                >
                  {/* Client */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-full
                          bg-linear-to-br
                          from-red-500/15
                          to-orange-500/15
                          text-sm font-semibold text-white
                        "
                      >
                        {inv.client.name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          {inv.client.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          Payment overdue
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Invoice */}
                  <td className="py-4">
                    <span className="text-sm text-slate-400">
                      {inv.invoiceNumber}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">
                        {inv.formattedDueDate}
                      </span>

                      <span
                        className="
                          rounded-md
                          border border-red-500/20
                          bg-red-500/10
                          px-2 py-1
                          text-[10px]
                          text-red-400
                        "
                      >
                        {inv.daysAgo}d ago
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 text-right">
                    <span className="text-sm font-semibold text-red-400">
                      ৳{inv.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-white/10">
                <td colSpan={3} className="pt-5 text-sm text-slate-500">
                  Total overdue amount
                </td>

                <td className="pt-5 text-right text-lg font-semibold text-red-400">
                  ৳{totalOverdue.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-3 md:hidden">
          {overdueInvoices.map((inv) => (
            <div
              key={inv.invoiceNumber}
              className="
                rounded-2xl
                border border-red-500/10
                bg-red-500/3
                p-4
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {inv.client.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {inv.invoiceNumber}
                  </p>
                </div>

                <span className="text-sm font-semibold text-red-400">
                  ৳{inv.total}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Due Date</span>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-white">
                    {inv.formattedDueDate}
                  </span>

                  <span
                    className="
                      rounded-md
                      border border-red-500/20
                      bg-red-500/10
                      px-2 py-1
                      text-[10px]
                      text-red-400
                    "
                  >
                    {inv.daysAgo}d
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* MOBILE TOTAL */}
          <div
            className="
              flex items-center justify-between
              rounded-2xl
              border border-white/10
              bg-white/3
              p-4
            "
          >
            <span className="text-sm text-slate-500">Total overdue</span>

            <span className="text-lg font-semibold text-red-400">
              ৳{totalOverdue.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
        hover:border-orange-500/20
        hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]
      "
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <CardHeader className="relative pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* LEFT */}
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white">
              Upcoming Due Dates
            </CardTitle>

            <p className="text-sm text-slate-400">
              Scheduled invoice payments expected soon
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              inline-flex w-fit items-center gap-2
              rounded-full
              border border-orange-500/20
              bg-orange-500/10
              px-3 py-1.5
              text-xs font-medium text-orange-400
            "
          >
            <CalendarClock className="size-3.5" />
            Next 7 days
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {upcomingOverdueInv.map((d) => {
          const [month, dayRaw] = d.formattedDueDate.split(" ");
          const day = dayRaw.replace(",", "");

          return (
            <div
              key={d.invoiceNumber}
              className="
                flex items-start gap-4
                rounded-2xl
                border border-white/5
                bg-white/2
                p-4
                transition-all duration-200
                hover:border-orange-500/10
                hover:bg-white/4
              "
            >
              {/* DATE BADGE */}
              <div
                className="
                  flex min-w-16 flex-col items-center justify-center
                  rounded-2xl
                  border border-orange-500/20
                  bg-orange-500/8
                  px-3 py-2
                  text-center
                "
              >
                <span className="text-lg font-semibold leading-none text-orange-400">
                  {day}
                </span>

                <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-orange-300/70">
                  {month}
                </span>
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* LEFT */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {d.client.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {d.invoiceNumber}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-sm font-semibold text-white">
                      ৳{d.total}
                    </p>

                    <div className="mt-2">
                      <DueStatusBadge status={d.status} />
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
