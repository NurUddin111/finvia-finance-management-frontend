"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { Home, Users, FileText, Settings, PackageSearch } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/business/dashboard",
    icon: Home,
  },

  {
    label: "Products",
    href: "/business/dashboard/products",
    icon: PackageSearch,
  },

  {
    label: "Clients",
    href: "/business/dashboard/clients",
    icon: Users,
  },

  {
    label: "Invoices",
    href: "/business/dashboard/invoices",
    icon: FileText,
  },

  {
    label: "Settings",
    href: "/business/dashboard/settings",
    icon: Settings,
  },
];

export default function BusinessBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#030712]/95 backdrop-blur-2xl lg:hidden">
      {/* TOP GLOW */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

      <nav className="grid h-18 grid-cols-5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/business/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center"
            >
              {/* ACTIVE PILL */}
              <div
                className={cn(
                  "absolute top-2 h-10 w-14 rounded-2xl transition-all duration-300",

                  isActive
                    ? "bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.18)]"
                    : "bg-transparent",
                )}
              />

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <div className="absolute top-0 h-1 w-8 rounded-b-full bg-blue-400" />
              )}

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300",

                    isActive
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                      : "border-transparent text-slate-500",
                  )}
                >
                  <Icon size={18} />
                </div>

                <span
                  className={cn(
                    "text-[10px] font-medium transition-all duration-300",

                    isActive ? "text-blue-400" : "text-slate-500",
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
