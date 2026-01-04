import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InvoicesFilters() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-lg
        border
        p-4
        sm:flex-row
        sm:items-end
      "
    >
      {/* Status Filter */}
      <div className="w-full sm:w-56 space-y-1">
        <label className="text-sm font-medium">Status</label>
        <Select defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
