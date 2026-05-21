"use client";

import { X, PackageSearch } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const ProductToolbar = ({ total }: { total: number }) => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const isFirstRender = useRef(true);

  const isFiltered = !!searchParams.get("search");

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
          <PackageSearch
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products by name..."
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/5 focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          {total} result
          {total !== 1 ? "s" : ""} found
        </div>

        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 sm:justify-start"
          >
            <X size={13} />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductToolbar;
