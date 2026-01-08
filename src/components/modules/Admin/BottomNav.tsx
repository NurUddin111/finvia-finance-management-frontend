"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Clients", href: "/admin/dashboard/clients", icon: Users },
  { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0b0f14] md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ${
                isActive ? "text-indigo-400" : "text-white/60 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
