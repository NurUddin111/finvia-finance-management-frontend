/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardHeader from "@/components/modules/Business/DashboardHeader";
import InvoicesTable from "@/components/modules/Business/Invoices/InvoicesTable";
import KPISection from "@/components/modules/Business/KPISection";
import { getMe } from "@/services/auth/getMe";

export default async function DashboardPage() {
  const myProfile: any = await getMe();

  console.log(myProfile);

  if (!myProfile) return null;

  const { name, role, avatar } = myProfile?.data;
  return (
    <div className="space-y-6">
      <DashboardHeader name={name} role={role} avatar={avatar} />

      <KPISection />

      <section className="rounded-lg border bg-background">
        <div className="border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
        </div>
        <InvoicesTable />
      </section>
    </div>
  );
}
