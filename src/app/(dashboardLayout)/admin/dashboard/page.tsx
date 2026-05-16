/* eslint-disable @typescript-eslint/no-explicit-any */

import DashboardHeader from "@/components/modules/Admin/DashboardHeader";
import KPISection from "@/components/modules/Admin/KPISection";
import { getMe } from "@/services/auth.services";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const getMyProfile = await getMe();
  if (!getMyProfile?.data) redirect("/login");
  const myProfile = getMyProfile.data;
  const { name, role, avatar } = myProfile;
  return (
    <div className="space-y-6">
      <DashboardHeader name={name} role={role} avatar={avatar} />

      <KPISection />
    </div>
  );
}
