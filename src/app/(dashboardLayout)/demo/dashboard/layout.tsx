import BusinessBottomNav from "@/components/modules/Business/BottomNav";

import DemoSideBar from "@/components/modules/Demo/DemoSideBar";

import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function DemoDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#020617]">
      {/* SIDEBAR */}
      <DemoSideBar />

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 pb-20 md:pb-6">
          <div className="w-full p-3 sm:p-4 md:p-5 lg:p-6">{children}</div>
        </main>
      </div>

      {/* MOBILE NAV */}
      <BusinessBottomNav />
    </div>
  );
}
