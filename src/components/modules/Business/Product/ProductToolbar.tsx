import { Search } from "lucide-react";

const ProductToolbar = () => {
  return (
    <div className="flex flex-col gap-2.5 mb-4 md:flex-row md:items-center">
      {/* Search — full width on mobile, flex-1 on desktop */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search clients by name, email, or phone…"
          className="w-full border border-white/8 rounded-[9px] pl-9 pr-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 transition-colors"
        />
      </div>

      {/* Second row on mobile: select + count side by side */}
      <div className="flex items-center gap-2.5">
        {/* Divider — desktop only */}
        <div className="hidden md:block h-5 w-px bg-white/[0.07]" />

        <span className="text-[12px] text-white/25 whitespace-nowrap tabular-nums">
          — result found
        </span>
      </div>
    </div>
  );
};

export default ProductToolbar;
