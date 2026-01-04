"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, Settings, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  dashboard: Home,
  clients: Users,
  invoices: FileText,
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
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isActive
          ? "bg-white/10 border border-white/20 text-white"
          : "text-muted-foreground hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon size={18} className="shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
