"use client";

import { Search, X, SlidersHorizontal, CalendarRange } from "lucide-react";

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

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    setSearchValue("");

    router.replace(pathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        {/* SEARCH */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by invoice number or client email..."
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          />
        </div>

        {/* STATUS */}
        <div className="relative min-w-47.5">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={searchParams.get("status") || "all"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="h-11 w-full appearance-none rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-slate-300 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          >
            {INVOICE_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* YEAR */}
        {availableYears.length > 0 && (
          <div className="relative min-w-42.5">
            <CalendarRange
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={searchParams.get("year") || "all"}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="h-11 w-full appearance-none rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-slate-300 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
            >
              <option value="all">All Years</option>

              {availableYears.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          {total} result
          {total !== 1 ? "s" : ""} found
        </div>

        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
          >
            <X size={13} />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoicesFilters;
