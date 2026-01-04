"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, X } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { login } from "@/services/auth/login";

export default function LoginModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f14] border border-white/10 px-5 py-6 sm:p-8">
        {/* Close */}
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-white/60">Log in to your account</p>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-5">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                autoFocus
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Password</FieldLabel>
                <button
                  type="button"
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative mt-1">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
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
            </Field>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500">
                {state.error ||
                  "The email or password you entered is incorrect."}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Log in"}
            </Button>

            <p className="pt-4 text-center text-sm text-white/60">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="text-indigo-400 hover:underline"
              >
                Register
              </button>
            </p>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
