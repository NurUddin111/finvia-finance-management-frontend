/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { CreateBusinessZodSchemaValidation } from "@/zod/business.validation";
import { cookies } from "next/headers";

export const updateBusiness = async (
  businessId: string,
  currentState: any,
  formData: FormData
) => {
  try {
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
      CreateBusinessZodSchemaValidation.partial()
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `https://finvia-backend.vercel.app/api/v1/business/edit/${businessId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(validationResult.data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to update business details!",
      };
    }

    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
