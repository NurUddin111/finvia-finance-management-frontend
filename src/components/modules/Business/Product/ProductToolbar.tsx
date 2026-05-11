"use client";

import { Search, X } from "lucide-react";
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

  // Only search is a filter here — no status/year on products
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
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleReset = () => {
    setSearchValue("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2.5 mb-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products by name…"
          className="w-full border border-white/8 rounded-[9px] pl-9 pr-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden md:block h-5 w-px bg-white/[0.07]" />

        <span className="text-[12px] text-white/25 whitespace-nowrap tabular-nums">
          {total} result{total !== 1 ? "s" : ""} found
        </span>

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

export default ProductToolbar;
