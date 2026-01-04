import SignUpVerifyModal from "@/components/modules/Auth/OtpModal";
import HomePage from "../../page";

export default function VerifyFallbackPage() {
  return (
    <>
      <HomePage />
      <SignUpVerifyModal />
    </>
  );
}
