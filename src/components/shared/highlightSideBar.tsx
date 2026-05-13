"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  FileText,
  Settings,
  LucideIcon,
  PackageSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  dashboard: Home,
  clients: Users,
  invoices: FileText,
  products: PackageSearch,
  settings: Settings,
};

export function SidebarItem({
  label,
  icon,
  href,
}: {
  label: string;
  icon: keyof typeof iconMap;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-12 items-center gap-3 overflow-hidden rounded-2xl border px-4 text-sm font-medium transition-all duration-300",

        isActive
          ? "border-blue-500/20 bg-blue-500/10 text-white shadow-[0_0_30px_rgba(59,130,246,0.12)]"
          : "border-transparent text-slate-400 hover:border-white/8 hover:bg-white/4 hover:text-white",
      )}
    >
      {/* ACTIVE GLOW */}
      {isActive && (
        <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-400" />
      )}

      {/* ICON */}
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300",

          isActive
            ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
            : "border-white/8 bg-white/4 text-slate-500 group-hover:text-slate-300",
        )}
      >
        <Icon size={16} />
      </div>

      {/* LABEL */}
      <span className="truncate tracking-[0.01em]">{label}</span>
    </Link>
  );
}
