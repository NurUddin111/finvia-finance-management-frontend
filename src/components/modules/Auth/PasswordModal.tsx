"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { signupPassword } from "@/services/auth/signupPassword";

export default function SignUpPasswordModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(signupPassword, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/login", { scroll: false });
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        className="
          relative
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-[#0b0f14]
          border
          border-white/10
          px-5
          py-6
          sm:p-8
        "
      >
        <h2 className="text-2xl font-semibold text-white">Set your password</h2>
        <p className="mt-1 text-sm text-white/60">
          Create a secure password to finish signup
        </p>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel>Password</FieldLabel>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-1 text-xs text-white/50">
                Use at least 8 characters for better security
              </p>
            </Field>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500">
                {state.error ||
                  "Failed to create your account. Please try again."}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
            >
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
