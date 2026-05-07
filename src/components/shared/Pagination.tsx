"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const Pagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If there's only 1 page, don't render anything
  if (totalPages <= 1) return null;

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // ✅
  };

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-[12px] text-white/25">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={!hasPrevPage} // disabled on page 1
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/50 border border-white/[0.07] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={13} /> Prev
        </button>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={!hasNextPage} // disabled on last page
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/50 border border-white/[0.07] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
