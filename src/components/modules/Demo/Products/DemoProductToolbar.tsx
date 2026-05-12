"use client";

import { PackageSearch } from "lucide-react";

const DemoProductToolbar = ({ total }: { total: number }) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        {/* SEARCH */}
        <div className="relative flex-1 opacity-50">
          <PackageSearch
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            disabled
            placeholder="Search products by name..."
            className="h-11 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          {total} result
          {total !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
};

export default DemoProductToolbar;
