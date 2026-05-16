"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import GoogleIcon from "@/components/shared/icons/Google";
import { login } from "@/services/auth.services";

export default function LoginModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Logged in successfully!");
      router.refresh(); // ✅ refresh to pick up new session cookies
      return;
    }

    // FIX: don't refresh on failure — it clears the form state
    // FIX: only toast on API failure, not Zod field errors
    if (!state.errors) {
      toast.error(state.error ?? "Failed to login!");
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-5 backdrop-blur-sm">
      {/* MODAL */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        {/* HEADER */}
        <div className="border-b border-white/10 px-5 py-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Login to your Finvia workspace.
          </p>
        </div>

        {/* BODY */}
        <div className="px-5 py-5">
          <form action={formAction}>
            <FieldGroup className="space-y-2">
              {/* EMAIL */}
              <Field>
                <FieldLabel className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Email
                </FieldLabel>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    autoFocus
                    className="h-11 rounded-2xl border border-white/10 bg-white/3 pl-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                </div>

                <InputFieldError field="email" state={state} />
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Password
                </FieldLabel>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="h-11 rounded-2xl border border-white/10 bg-white/3 pl-11 pr-11 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                <InputFieldError field="password" state={state} />
              </Field>

              {/* GLOBAL ERROR — API failure only */}
              {!isPending && state?.success === false && !state.errors && (
                <div className="rounded-2xl border border-red-500/15 bg-red-500/8 px-4 py-3">
                  <p className="text-sm text-red-400">
                    {state.error ?? "Incorrect email or password."}
                  </p>
                </div>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.16)] disabled:opacity-60"
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              {/* FOOTER */}
              <p className="pt-1 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
                >
                  Register
                </button>
              </p>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  OR
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* GOOGLE */}
              <Button
                type="button"
                disabled
                className="h-11 w-full rounded-2xl border border-white/10 bg-white/3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <GoogleIcon className="size-4" />
                Continue with Google
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
