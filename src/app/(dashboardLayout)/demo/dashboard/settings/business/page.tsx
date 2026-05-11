"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getMyBusiness } from "@/services/business/getMyBusiness";
import { updateBusiness } from "@/services/business/updateBusiness";

type BusinessForm = {
  name: string;
  email: string;
  category: string;
  phone: string;
  address: string;
  website: string;
  logoUrl: string;
};

export default function EditBusinessPage() {
  const router = useRouter();

  const [businessId, setBusinessId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<BusinessForm>({
    name: "",
    email: "",
    category: "",
    phone: "",
    address: "",
    website: "",
    logoUrl: "",
  });

  const [state, formAction, isPending] = useActionState(
    updateBusiness.bind(null, businessId),
    null
  );

  /* ================= FETCH BUSINESS ================= */

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await getMyBusiness();
      if (res?.success) {
        setBusinessId(res.data.id);
        setForm({
          name: res.data.name ?? "",
          email: res.data.email ?? "",
          category: res.data.category ?? "",
          phone: res.data.phone ?? "",
          address: res.data.address ?? "",
          website: res.data.website ?? "",
          logoUrl: res.data.logoUrl ?? "",
        });
      }
      setLoading(false);
    };

    fetchBusiness();
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
            Loading business details...
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
          <h2 className="text-lg font-semibold">Business Details</h2>
          <p className="text-sm text-muted-foreground">
            Manage your company information and public business profile.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Business Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black w-max">
                    <SelectItem value="AGENCY">Agency</SelectItem>
                    <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                    <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                    <SelectItem value="FREELANCER">Freelancer</SelectItem>
                    <SelectItem value="SERVICE_PROVIDER">
                      Service Provider
                    </SelectItem>
                    <SelectItem value="RETAIL">Retail</SelectItem>
                    <SelectItem value="SOFTWARE_COMPANY">
                      Software Company
                    </SelectItem>
                    <SelectItem value="EDUCATION">Education</SelectItem>
                    <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                    <SelectItem value="REAL_ESTATE">Real Estate</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>

                <input type="hidden" name="category" value={form.category} />
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

              {/* Website */}
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                />
              </div>

              {/* Logo */}
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={(e) =>
                    setForm({ ...form, logoUrl: e.target.value })
                  }
                />
              </div>
            </div>

            {state?.success === false && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            {state?.success && (
              <p className="text-sm text-green-500">
                Business updated successfully
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
