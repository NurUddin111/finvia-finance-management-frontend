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

  if (totalPages <= 1) return null;

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816]">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-slate-400">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={!hasPrevPage}
            className="group flex h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Prev
          </button>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={!hasNextPage}
            className="group flex h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] disabled:pointer-events-none disabled:opacity-30"
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
export default Pagination;
