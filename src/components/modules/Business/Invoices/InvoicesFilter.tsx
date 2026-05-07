"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const INVOICE_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "OVERDUE", label: "Overdue" },
];

const InvoicesFilters = ({
  total,
  availableYears,
}: {
  total: number;
  availableYears: number[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const isFirstRender = useRef(true);

  // Check if ANY filter is currently active
  // This drives whether the reset button shows or not
  const isFiltered = !!(
    searchParams.get("search") ||
    searchParams.get("status") ||
    searchParams.get("year")
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    // 1. Clear the search input visually
    setSearchValue("");
    // 2. Wipe the entire query string → clean URL → all filters gone
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2.5 mb-4 md:flex-row md:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by invoice number or client email…"
          className="w-full border border-white/8 rounded-[9px] pl-9 pr-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2.5">
        {/* Status filter */}
        <select
          value={searchParams.get("status") || "all"}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="flex-1 md:flex-none border border-white/8 rounded-[9px] px-3 py-2 text-[13px] text-white/60 bg-gray-950 outline-none cursor-pointer focus:border-indigo-500/40 transition-colors"
        >
          {INVOICE_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Year filter */}
        {availableYears.length > 0 && (
          <select
            value={searchParams.get("year") || "all"}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="flex-1 md:flex-none border border-white/8 rounded-[9px] px-3 py-2 text-[13px] text-white/60 bg-gray-950 outline-none cursor-pointer focus:border-indigo-500/40 transition-colors"
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

        {/* Result count */}
        <span className="text-[12px] text-white/25 whitespace-nowrap tabular-nums">
          {total} result{total !== 1 ? "s" : ""} found
        </span>

        {/* Reset button — only visible when at least one filter is active */}
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-white/40 border border-white/[0.07] hover:text-white/70 hover:border-white/20 transition-all"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoicesFilters;
