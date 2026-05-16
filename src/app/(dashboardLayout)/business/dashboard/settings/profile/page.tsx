"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  MapPin,
  Phone,
  ShieldCheck,
  User2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputFieldError from "@/components/shared/InputFieldError";
import { getMe, updateProfile } from "@/services/auth.services";

type ProfileForm = {
  name: string;
  phone: string;
  avatar: string;
  role: string;
  address: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    phone: "",
    avatar: "",
    role: "",
    address: "",
  });

  // FIX: no .bind() — userId passed via hidden input instead
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  /* FETCH PROFILE */
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getMe();

      if (res?.data) {
        setUserId(res.data.id);
        setForm({
          name: res.data.name ?? "",
          phone: res.data.phone ?? "",
          avatar: res.data.avatar ?? "",
          role: res.data.role ?? "",
          address: res.data.address ?? "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-6">
            <p className="text-sm text-slate-400">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  /* UI */
  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <User2 className="size-6 text-blue-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                    Profile Settings
                  </span>
                </div>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Edit Profile
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Update your personal information, avatar, and contact details
                  for your business account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <form action={formAction} className="space-y-8">
            {/* FIX: userId passed as hidden input — available in formData on server */}
            <input type="hidden" name="userId" value={userId} />

            {/* PROFILE CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 rounded-3xl border border-white/10">
                    <AvatarImage src={form.avatar} />
                    <AvatarFallback className="rounded-3xl bg-blue-500/10 text-2xl font-semibold text-blue-400">
                      {form.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <Camera className="size-4 text-blue-400" />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Profile Picture URL
                  </Label>

                  <Input
                    name="picture"
                    value={form.avatar}
                    onChange={(e) =>
                      setForm({ ...form, avatar: e.target.value })
                    }
                    placeholder="https://example.com/avatar.png"
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                  <InputFieldError field="picture" state={state} />
                </div>
              </div>
            </div>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* NAME */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <User2 className="size-4 text-blue-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Full Name
                  </p>
                </div>

                <div className="space-y-2">
                  <Input
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                  <InputFieldError field="name" state={state} />
                </div>
              </div>

              {/* PHONE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="size-4 text-emerald-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Phone Number
                  </p>
                </div>

                <div className="space-y-2">
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+8801XXXXXXXXX"
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                  <InputFieldError field="phone" state={state} />
                </div>
              </div>

              {/* ROLE — display only, no error needed */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-violet-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Account Role
                  </p>
                </div>

                <div className="space-y-2">
                  <Input
                    value={form.role}
                    disabled
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400 focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="size-4 text-amber-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Address
                  </p>
                </div>

                <div className="space-y-2">
                  <Input
                    name="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Enter your address"
                    className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/20 focus:bg-white/5 focus-visible:ring-0"
                  />
                  <InputFieldError field="address" state={state} />
                </div>
              </div>
            </div>

            {/* GLOBAL ERROR — API failure only */}
            {!isPending && state?.success === false && !state.errors && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">
                  {state.error ?? "Failed to update profile."}
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {state?.success && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-sm text-emerald-400">
                  Profile updated successfully
                </p>
              </div>
            )}

            {/* ACTION */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isPending || !userId}
                className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
              >
                <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
