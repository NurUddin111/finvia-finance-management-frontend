"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/business/dashboard", icon: Home },
  { label: "Clients", href: "/business/dashboard/clients", icon: Users },
  { label: "Invoices", href: "/business/dashboard/invoices", icon: FileText },
  { label: "Settings", href: "/business/dashboard/settings", icon: Settings },
];

export default function BusinessBottomNav() {
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
