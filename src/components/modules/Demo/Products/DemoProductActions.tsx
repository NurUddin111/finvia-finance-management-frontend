"use client";

import { Pencil, Trash2 } from "lucide-react";

const actionBtn =
  "group flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-xl border opacity-50 transition-all duration-300";

export default function DemoProductActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* EDIT */}
      <button
        disabled
        title="Sign up to edit product"
        className={`${actionBtn} border-blue-500/20 bg-blue-500/10 text-blue-400`}
      >
        <Pencil size={15} className="transition-transform duration-300" />
      </button>

      {/* DELETE */}
      <button
        disabled
        title="Sign up to delete product"
        className={`${actionBtn} border-red-500/20 bg-red-500/10 text-red-400`}
      >
        <Trash2 size={15} className="transition-transform duration-300" />
      </button>
    </div>
  );
}
