import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ClientsFilters() {
  return (
    <div className=" flex w-full flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
      {/* Filters */}
      <div className=" flex w-full flex-col gap-3 sm:flex-row sm:items-center md:max-w-xl">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-9" />
        </div>

        {/* Status */}
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Result Count */}
      <p className="text-sm text-muted-foreground text-left md:text-right">
        5 results found
      </p>
    </div>
  );
}
