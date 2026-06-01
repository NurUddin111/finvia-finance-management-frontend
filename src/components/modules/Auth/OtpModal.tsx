"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, MailCheck } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import InputFieldError from "@/components/shared/InputFieldError";
import { verifyOtp } from "@/services/auth.services";

export default function SignUpVerifyModal() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(verifyOtp, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/signup/password", { scroll: false });
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8">
      {/* MODAL */}
      <div className="relative w-full max-w-110 overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        {/* HEADER */}
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <MailCheck className="size-5 text-blue-400" />
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Verify email
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 sm:px-6">
          <form action={formAction}>
            {/* OTP */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                name="otp"
                autoFocus
                inputMode="numeric"
                pattern="[0-9]*"
              >
                <InputOTPGroup className="gap-1.5 sm:gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-11 w-11 rounded-2xl border border-white/10 bg-white/3 text-sm text-white focus:border-blue-500/20 focus:bg-white/5 data-[active=true]:border-blue-500/30 sm:h-12 sm:w-12"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* OTP FIELD ERROR */}
            <div className="mt-2 flex justify-center">
              <InputFieldError field="otp" state={state} />
            </div>

            {/* GLOBAL ERROR */}
            {!isPending && state?.success === false && !state.errors && (
              <div className="mt-4 rounded-2xl border border-red-500/15 bg-red-500/8 px-4 py-3">
                <p className="text-sm text-red-400">
                  {state.error ?? "Invalid verification code."}
                </p>
              </div>
            )}

            {/* VERIFY */}
            <Button
              type="submit"
              disabled={isPending}
              className="mt-5 h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.16)] disabled:opacity-60"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="size-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          {/* BACK */}
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-slate-500 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
