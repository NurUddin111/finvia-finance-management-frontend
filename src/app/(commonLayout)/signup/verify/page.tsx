import type { Metadata } from "next";

import SignUpVerifyModal from "@/components/modules/Auth/OtpModal";
import HomePage from "../../page";

export const metadata: Metadata = {
  title: "Verify Account",
  description: "Verify your email address to activate your Finvia account.",
};

export default function VerifyFallbackPage() {
  return (
    <>
      <HomePage />
      <SignUpVerifyModal />
    </>
  );
}
