"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp } from "@/services/auth/signupVerify";

export default function SignUpVerifyModal() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(verifyOtp, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/signup/password", { scroll: false });
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className=" relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f14] border border-white/10 px-5 py-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
        <p className="mt-1 text-sm text-white/60">
          Enter the 6-digit code sent to your email
        </p>

        <form action={formAction}>
          <div className="mt-6 flex justify-center">
            <InputOTP maxLength={6} name="otp" autoFocus>
              <InputOTPGroup className="gap-1 sm:gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {!isPending && state?.success === false && (
            <p className="mt-4 text-center text-sm text-red-500">
              {state.error || "The code you entered is invalid."}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-3 w-full text-sm text-white/60 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}
