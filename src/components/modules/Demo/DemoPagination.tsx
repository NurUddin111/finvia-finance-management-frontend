// src/components/modules/Demo/Clients/DemoPagination.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-[12px] text-white/25">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/50 border border-white/[0.07] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={13} /> Prev
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/50 border border-white/[0.07] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default DemoPagination;
