import type { Metadata } from "next";

import SignUpPasswordModal from "@/components/modules/Auth/PasswordModal";
import HomePage from "../../page";

export const metadata: Metadata = {
  title: "Create Password •",
  description:
    "Create a secure password to finish setting up your Finvia account.",
};

export default function PasswordFallbackPage() {
  return (
    <>
      <HomePage />
      <SignUpPasswordModal />
    </>
  );
}