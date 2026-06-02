"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  MapPin,
  Phone,
  ShieldCheck,
  User2,
  Sparkles,
  ChevronLeft,
  Upload,
  X,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputFieldError from "@/components/shared/InputFieldError";
import { getMe, updateProfile } from "@/services/auth.services";

type ProfileForm = {
  name: string;
  phone: string;
  avatar: string; // existing avatar URL from DB
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

  // New avatar file the user picks — separate from the existing URL
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Revoke blob URL when it changes or component unmounts
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be smaller than 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setAvatarError(null);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarClear = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // The src shown in the Avatar — new preview takes priority over existing URL
  const displayAvatar = avatarPreview ?? form.avatar;

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-6 lg:py-7">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-8 py-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <LoaderCircle className="size-6 animate-spin text-blue-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Loading Profile
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Fetching your account information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* UI */
  return (
    <div className="min-h-screen rounded-2xl bg-[#050816] px-4 py-5 sm:px-6 lg:px-6 lg:py-7">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* BACK BUTTON */}
        <div className="lg:hidden">
          <button
            onClick={() => router.back()}
            className="group inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>

        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <User2 className="size-6 text-blue-400" />
              </div>

              <div>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-400">
                  Profile Settings
                </span>

                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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
          <form action={formAction} className="space-y-5 md:space-y-8">
            <input type="hidden" name="userId" value={userId} />

            {/* Hidden real file input */}
            <input
              ref={fileInputRef}
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            {/* AVATAR CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                {/* AVATAR WITH CAMERA TRIGGER */}
                <div className="relative shrink-0">
                  <Avatar className="h-24 w-24 rounded-3xl border border-white/10">
                    <AvatarImage src={displayAvatar} asChild>
                      <Image
                        src={displayAvatar}
                        alt="Profile avatar"
                        width={96}
                        height={96}
                        unoptimized
                        className="rounded-3xl object-cover"
                      />
                    </AvatarImage>
                    <AvatarFallback className="rounded-3xl bg-blue-500/10 text-2xl font-semibold text-blue-400">
                      {form.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/20"
                    aria-label="Upload avatar"
                  >
                    <Camera className="size-4 text-blue-400" />
                  </button>
                </div>

                {/* FILE INFO / UPLOAD PROMPT */}
                <div className="flex-1 space-y-2">
                  {avatarFile ? (
                    /* NEW FILE SELECTED */
                    <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3">
                      <span className="flex-1 truncate text-sm text-slate-300">
                        {avatarFile.name}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {(avatarFile.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button"
                        onClick={handleAvatarClear}
                        className="shrink-0 rounded-lg p-1 text-slate-500 transition-colors duration-200 hover:text-red-400"
                        aria-label="Remove selected avatar"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    /* NO NEW FILE — prompt to upload */
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-12 w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/3 px-4 text-left transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <Upload className="size-3.5 text-slate-500" />
                      </div>
                      <span className="flex-1 text-sm text-slate-500">
                        {form.avatar
                          ? "Click to replace avatar"
                          : "Click to upload avatar"}
                      </span>
                      <Camera className="size-3.5 shrink-0 text-slate-600" />
                    </button>
                  )}
                  <InputFieldError field="avatar" state={state} />
                  {avatarError && (
                    <p className="text-xs text-red-400">{avatarError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              {/* NAME */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
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
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
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

              {/* ROLE */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-violet-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">
                    Account Role
                  </p>
                </div>
                <Input
                  value={form.role}
                  disabled
                  className="h-12 rounded-2xl border border-white/10 bg-white/3 text-sm text-slate-400 focus-visible:ring-0"
                />
              </div>

              {/* ADDRESS */}
              <div className="rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-5">
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

            {/* GLOBAL ERROR */}
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
            <div className="flex justify-stretch pt-2 sm:justify-end">
              <Button
                type="submit"
                disabled={isPending || !userId}
                className="group h-11 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] sm:w-auto"
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
