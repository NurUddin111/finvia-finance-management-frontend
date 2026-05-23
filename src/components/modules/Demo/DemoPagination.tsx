"use client";

import { ChevronLeft, ChevronRight, Navigation } from "lucide-react";

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
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816]">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
            Page {page} of {totalPages}
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-500 lg:flex">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400/60" />
            Demo navigation enabled
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-green-400 xl:flex">
            <Navigation size={12} />
            Interactive demo pagination
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="group flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] disabled:pointer-events-none disabled:opacity-30 sm:flex-none"
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
            className="group flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] disabled:pointer-events-none disabled:opacity-30 sm:flex-none"
          >
            Next
            <ChevronRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPagination;
