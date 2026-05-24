"use client";

import { CalendarRange, Lock, Search, SlidersHorizontal } from "lucide-react";

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
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        {/* SEARCH */}
        <div className="relative flex-1 cursor-not-allowed opacity-60">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            disabled
            placeholder="Search by invoice number or client email..."
            className="h-11 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/3 pl-11 pr-16 text-sm text-slate-500 placeholder:text-slate-500 outline-none sm:pr-20"
          />

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/3 px-2 py-1 text-[9px] font-medium text-slate-500 sm:right-3 sm:text-[10px]">
            <Lock size={10} />
            Demo
          </div>
        </div>

        {/* STATUS */}
        <div className="relative w-full cursor-not-allowed opacity-60 sm:min-w-48 sm:max-w-60">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            disabled
            className="h-11 w-full cursor-not-allowed appearance-none rounded-2xl border border-white/10 bg-white/3 pl-11 pr-16 text-sm text-slate-500 outline-none sm:pr-20"
          >
            {INVOICE_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/3 px-2 py-1 text-[9px] font-medium text-slate-500 sm:right-3 sm:text-[10px]">
            <Lock size={10} />
            Demo
          </div>
        </div>

        {/* YEAR */}
        {availableYears.length > 0 && (
          <div className="relative w-full cursor-not-allowed opacity-60 sm:min-w-44 sm:max-w-52">
            <CalendarRange
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              disabled
              className="h-11 w-full cursor-not-allowed appearance-none rounded-2xl border border-white/10 bg-white/3 pl-11 pr-16 text-sm text-slate-500 outline-none sm:pr-20"
            >
              <option value="all">All Years</option>

              {availableYears.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/3 px-2 py-1 text-[9px] font-medium text-slate-500 sm:right-3 sm:text-[10px]">
              <Lock size={10} />
              Demo
            </div>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-fit rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          {total} result{total !== 1 ? "s" : ""} found
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 xl:flex">
          <Lock size={12} />
          Interactive filters disabled in demo
        </div>
      </div>
    </div>
  );
};

export default DemoInvoicesFilters;
