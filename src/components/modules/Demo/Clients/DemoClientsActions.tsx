// src/components/modules/Demo/Clients/DemoClientActions.tsx

import { Eye, Pencil, Trash2 } from "lucide-react";

export default function DemoClientActions() {
  return (
    <div className="flex items-center gap-1.5">
      <button
        disabled
        title="Sign up to view client"
        className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-white/5 text-white/40 opacity-40 cursor-not-allowed"
      >
        <Eye size={14} />
      </button>

      <button
        disabled
        title="Sign up to edit client"
        className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-indigo-500/15 text-indigo-300 opacity-40 cursor-not-allowed"
      >
        <Pencil size={14} />
      </button>

      <button
        disabled
        title="Sign up to delete client"
        className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-red-500/10 text-red-400 opacity-40 cursor-not-allowed"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
