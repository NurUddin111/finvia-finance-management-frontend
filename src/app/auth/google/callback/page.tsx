// src/app/auth/google/callback/page.tsx

import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.services";
import { UserRole } from "@/types/user";

export default async function GoogleCallbackPage() {
  // Cookies are already set by backend redirect
  // Just verify the session is valid
  const res = await getMe();

  if (!res?.data) {
    redirect("/login?error=google_failed");
  }

  if (res.data.role === UserRole.USER) {
    redirect("/onboarding");
  }

  if (
    res.data.role === UserRole.BUSINESS_OWNER ||
    res.data.role === UserRole.BUSINESS_ADMIN
  ) {
    redirect("/business/dashboard");
  }

  if (res.data.role === UserRole.ADMIN) {
    redirect("/admin/dashboard");
  }
}
