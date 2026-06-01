"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import { signupPassword } from "@/services/auth.services";

export default function SignUpPasswordModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signupPassword, null);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Registered account successfully!");
      router.push("/login", { scroll: false });
      return;
    }

    if (!state.success && !state.errors) {
      toast.error(state.error ?? "Account creation failed!");
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8">
      {/* MODAL */}
      <div className="relative w-full max-w-110 overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        {/* HEADER */}
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <Lock className="size-5 text-blue-400" />
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Set password
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Create a secure password to finish creating your account.
          </p>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 sm:px-6">
          <form action={formAction}>
            <FieldGroup className="space-y-3">
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
                    autoFocus
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Use at least 8 characters for better security.
                </p>
              </Field>

              {/* GLOBAL ERROR */}
              {!isPending && state?.success === false && !state.errors && (
                <div className="rounded-2xl border border-red-500/15 bg-red-500/8 px-4 py-3">
                  <p className="text-sm text-red-400">
                    {state.error ?? "Failed to create your account."}
                  </p>
                </div>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.16)] disabled:opacity-60"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
            </FieldGroup>
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
