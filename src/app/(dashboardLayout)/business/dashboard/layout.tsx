import BusinessBottomNav from "@/components/modules/Business/BottomNav";
import BusinessSideBar from "@/components/modules/Business/SideBar";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <BusinessSideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">{children}</main>
      </div>

      <BusinessBottomNav />
    </div>
  );
}
