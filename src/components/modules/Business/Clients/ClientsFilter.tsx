import { Search } from "lucide-react";

const ClientToolbar = () => {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search clients by name, email, or phone…"
          className="w-full border border-white/9 rounded-[9px] pl-9 pr-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Status filter */}
      <select className="bg-[#16161E] border border-white/9 rounded-[9px] px-3 py-2 text-[13px] text-white/60 outline-none cursor-pointer focus:border-violet-500/50 transition-colors">
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Result count */}
      <span className="text-[12px] text-white/30 whitespace-nowrap">
        -- result found
      </span>
    </div>
  );
};

export default ClientToolbar;
