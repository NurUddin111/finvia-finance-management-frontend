import type { Metadata } from "next";

import HomePage from "../page";
import LoginModal from "@/components/modules/Auth/LoginModal";

export const metadata: Metadata = {
  title: "Login •",
  description:
    "Log in to your Finvia account and manage invoices, clients, payments, and business analytics.",
};

export default function LoginFallbackPage() {
  return (
    <>
      <HomePage />
      <LoginModal />
    </>
  );
}
