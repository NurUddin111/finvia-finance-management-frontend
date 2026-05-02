// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function InvoicesFilters() {
//   return (
//     <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-end">
//       {/* Status Filter */}
//       <div className="w-full sm:w-56 space-y-1">
//         <label className="text-sm font-medium">Status</label>
//         <Select defaultValue="all">
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="All Statuses" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="paid">Paid</SelectItem>
//             <SelectItem value="unpaid">Unpaid</SelectItem>
//             <SelectItem value="overdue">Overdue</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface InvoicesFiltersProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
  { value: "overdue", label: "Overdue" },
];

export default function InvoicesFilters({
  statusFilter,
  onStatusChange,
}: InvoicesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card/50 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <SlidersHorizontal size={13} />
        <span>Filters</span>
      </div>

      <div className="h-px w-full bg-border sm:h-5 sm:w-px" />

      {/* Status Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Status
        </label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 w-40 text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
