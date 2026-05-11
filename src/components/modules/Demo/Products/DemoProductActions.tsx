// src/components/modules/Demo/Product/DemoProductActions.tsx

import { Pencil, Trash2 } from "lucide-react";

export default function DemoProductActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled
        title="Sign up to edit product"
        className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-indigo-500/15 text-indigo-300 opacity-40 cursor-not-allowed"
      >
        <Pencil size={14} />
      </button>

      <button
        disabled
        title="Sign up to delete product"
        className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-red-500/10 text-red-400 opacity-40 cursor-not-allowed"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
