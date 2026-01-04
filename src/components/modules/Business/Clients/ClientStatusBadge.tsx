import { cn } from "@/lib/utils";

export default function ClientStatusBadge({
  status,
}: {
  status: "active" | "pending" | "inactive";
}) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        status === "active" && "bg-green-100 text-green-700",
        status === "pending" && "bg-yellow-100 text-yellow-700",
        status === "inactive" && "bg-gray-100 text-gray-700"
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
