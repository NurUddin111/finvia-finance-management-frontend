// src/components/modules/Demo/Invoices/DemoInvoicesFilters.tsx

import { Search } from "lucide-react";

const INVOICE_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "OVERDUE", label: "Overdue" },
];

const DemoInvoicesFilters = ({
  total,
  availableYears,
}: {
  total: number;
  availableYears: number[];
}) => {
  return (
    <div className="flex flex-col gap-2.5 mb-4 md:flex-row md:items-center">
      {/* Search — disabled */}
      <div className="relative flex-1 opacity-50 cursor-not-allowed">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          type="text"
          disabled
          placeholder="Search by invoice number or client email…"
          className="w-full border border-white/8 rounded-[9px] pl-9 pr-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none cursor-not-allowed"
        />
      </div>

      <div className="flex items-center gap-2.5">
        {/* Status filter — disabled */}
        <select
          disabled
          className="flex-1 md:flex-none border border-white/8 rounded-[9px] px-3 py-2 text-[13px] text-white/60 bg-gray-950 outline-none cursor-not-allowed opacity-50"
        >
          {INVOICE_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Year filter — disabled */}
        {availableYears.length > 0 && (
          <select
            disabled
            className="flex-1 md:flex-none border border-white/8 rounded-[9px] px-3 py-2 text-[13px] text-white/60 bg-gray-950 outline-none cursor-not-allowed opacity-50"
          >
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        )}

        <div className="hidden md:block h-5 w-px bg-white/[0.07]" />

        <span className="text-[12px] text-white/25 whitespace-nowrap tabular-nums">
          {total} result{total !== 1 ? "s" : ""} found
        </span>
      </div>
    </div>
  );
};

export default DemoInvoicesFilters;
