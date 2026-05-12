"use client";

import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

type DemoPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const DemoPagination = ({
  page,
  totalPages,
  onPageChange,
}: DemoPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
          Page {page} of {totalPages}
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 sm:flex">
          <Lock size={12} />
          Demo navigation enabled
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Prev
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 disabled:pointer-events-none disabled:opacity-30"
        >
          Next
          <ChevronRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
};

export default DemoPagination;
