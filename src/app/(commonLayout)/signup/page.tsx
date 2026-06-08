import type { Metadata } from "next";

import SignUpEmailModal from "@/components/modules/Auth/SignUpEmailModal";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "Create Account •",
  description:
    "Create your Finvia account and start managing invoices, clients, payments, and business finances in one place.",
};

export default function SignupFallbackPage() {
  return (
    <>
      <HomePage />
      <SignUpEmailModal />
    </>
  );
}
