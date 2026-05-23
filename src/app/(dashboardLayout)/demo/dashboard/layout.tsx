import DemoBusinessBottomNav from "@/components/modules/Demo/DemoBusinessBottomNav";

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
        <main className="flex-1 pb-20 sm:pb-24 lg:pb-6">
          <div className="w-full px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE NAV */}
      <DemoBusinessBottomNav />
    </div>
  );
}
