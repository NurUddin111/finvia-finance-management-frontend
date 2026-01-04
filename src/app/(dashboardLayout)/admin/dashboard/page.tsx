/* eslint-disable @typescript-eslint/no-explicit-any */

import DashboardHeader from "@/components/modules/Admin/DashboardHeader";
import KPISection from "@/components/modules/Admin/KPISection";
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
    </div>
  );
}
