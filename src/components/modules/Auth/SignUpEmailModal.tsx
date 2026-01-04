"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useActionState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { signup } from "@/services/auth/signup";
import InputFieldError from "@/components/shared/InputFieldError";

export default function SignUpEmailModal() {
  const [state, formAction, isPending] = useActionState(signup, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/signup/verify", { scroll: false });
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className=" relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f14] border border-white/10 px-5 py-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
        {/* Close */}
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Start by entering your basic information
          </p>
        </div>

        <form action={formAction}>
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                autoFocus
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {!isPending && state?.success === false && (
              <div className="rounded-md border border-red-500/40 bg-red-500/5 px-3 py-2">
                <p className="text-sm text-red-500">
                  {state.error || "Something went wrong. Please try again."}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
            >
              {isPending ? "Sending OTP..." : "Next"}
            </Button>

            <p className="pt-4 text-center text-sm text-white/60">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-indigo-400 hover:underline"
              >
                Log in
              </button>
            </p>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
