"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User,  Shield, Lock } from "lucide-react";

const settingsItems = [
  { label: "Profile", slug: "profile", icon: User },
  { label: "Account", slug: "account", icon: Shield },
  { label: "Password", slug: "password", icon: Lock },
];

export default function MobileSettingsIndexPage() {
  const pathname = usePathname();

  return (
    <div className="md:hidden p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-2">Settings</h2>

      {settingsItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.slug}
            href={`/admin/dashboard/settings/${item.slug}`}
            className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm hover:bg-white/5 transition-colors"
          >
            <Icon size={18} className="text-muted-foreground" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
