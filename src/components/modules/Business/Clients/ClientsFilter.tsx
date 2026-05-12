"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ClientToolbar = ({ total }: { total: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const isFirstRender = useRef(true);

  const isFiltered = !!(
    searchParams.get("search") || searchParams.get("status")
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

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    setSearchValue("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
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
            placeholder="Search clients by name or email..."
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          />
        </div>

        {/* FILTER */}
        <div className="relative min-w-45">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={searchParams.get("status") || "all"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-slate-300 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          >
            <option value="all">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          {total} result{total !== 1 ? "s" : ""} found
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

export default ClientToolbar;
