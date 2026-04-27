import { cn } from "@/lib/utils";

export default function InvoiceStatusBadge({
  status,
}: {
  status: "DRAFT" | "SENT" | "PAID" | "FAILED" | "CANCELLED" | "OVERDUE";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium leading-none",
        status === "DRAFT" && "bg-yellow-100 text-yellow-700",
        status === "SENT" && "bg-yellow-100 text-yellow-700",
        status === "PAID" && "bg-green-100 text-green-700",
        status === "FAILED" && "bg-red-100 text-red-700",
        status === "CANCELLED" && "bg-red-100 text-red-700",
        status === "OVERDUE" && "bg-red-100 text-red-700",
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
