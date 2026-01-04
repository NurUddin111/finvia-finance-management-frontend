import SignUpEmailModal from "@/components/modules/Auth/SignUpEmailModal";
import HomePage from "../page";

export default function SignupFallbackPage() {
  return (
    <>
      <HomePage />
      <SignUpEmailModal />
    </>
  );
}
