"use server";

import { forwardResponseCookies, serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ActionResult } from "@/types/actions";
import { IBusiness } from "@/types/business";
import { CreateBusinessZodSchemaValidation } from "@/zod/business.validation";

export const createBusiness = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    category: formData.get("category"),
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
    website: formData.get("website") || undefined,
  };

  const validationResult = zodValidator(
    payload,
    CreateBusinessZodSchemaValidation,
  );

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  // Build a fresh FormData to send to the backend
  const body = new FormData();

  // Append all validated text fields
  const { name, email, category, phone, address, website } =
    validationResult.data;
  body.append("name", name);
  body.append("email", email);
  body.append("category", category);
  if (phone) body.append("phone", phone);
  if (address) body.append("address", address);
  if (website) body.append("website", website);

  const logo = formData.get("logo");
  if (logo instanceof File && logo.size > 0) {
    body.append("logo", logo);
  }

  return serverFetch<null>("/business/add", {
    method: "POST",
    body,
    onResponse: (res) =>
      forwardResponseCookies(res, ["accessToken", "refreshToken"]),
  });
};

export const getMyBusiness = async (): Promise<ActionResult<IBusiness>> => {
  return serverFetch<IBusiness>("/business/my-business", {
    cache: "no-store",
  });
};

export const updateBusiness = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const businessId = formData.get("businessId") as string;
  if (!businessId) return { success: false, error: "Business ID is missing" };

  const payload = {
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    category: formData.get("category") || undefined,
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
    website: formData.get("website") || undefined,
    logoUrl: formData.get("logoUrl") || undefined,
  };

  (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
    if (payload[key] === "" || payload[key] === null) {
      payload[key] = undefined;
    }
  });

  // nothing changed — treat as success silently
  if (
    !payload.name &&
    !payload.email &&
    !payload.category &&
    !payload.phone &&
    !payload.address &&
    !payload.website &&
    !payload.logoUrl
  ) {
    return { success: true };
  }

  const validationResult = zodValidator(
    payload,
    CreateBusinessZodSchemaValidation.partial(),
  );

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>(`/business/edit/${businessId}`, {
    method: "PATCH",
    body: validationResult.data,
  });
};

export const deleteMyBusiness = async (
  businessId: string,
): Promise<ActionResult<null>> => {
  return serverFetch<null>(`/business/delete/${businessId}`, {
    method: "DELETE",
  });
};
