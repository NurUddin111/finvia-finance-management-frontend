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
    <div className="flex min-h-screen w-full">
      <DemoSideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">{children}</main>
      </div>

      <BusinessBottomNav />
    </div>
  );
}
