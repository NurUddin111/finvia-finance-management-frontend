"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfile } from "@/services/user/updateProfile";
import { getMyProfile } from "@/services/user/getMe";

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

  const [state, formAction, isPending] = useActionState(
    updateProfile.bind(null, userId),
    null
  );

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getMyProfile();
      if (res?.success) {
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

  if (loading) {
    return (
      <div className="max-w-5xl">
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading profile...
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="w-full max-w-5xl">
      <Card>
        <CardHeader className="border-b">
          <h2 className="text-lg font-semibold">Profile Details</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal information and profile picture.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form action={formAction} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={form.avatar} />
                <AvatarFallback>{form.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <Label>Profile Picture URL</Label>
                <Input
                  name="picture"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* Role (read only) */}
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={form.role} disabled />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>

            {state?.success === false && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            {state?.success && (
              <p className="text-sm text-green-500">
                Profile updated successfully!
              </p>
            )}

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full px-6"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
