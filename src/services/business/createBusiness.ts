"use server";

import { zodValidator } from "@/lib/zodValidator";
import { CreateBusinessZodSchemaValidation } from "@/zod/business.validation";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const createBusiness = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      category: formData.get("category"),
      phone: formData.get("phone") || undefined,
      address: formData.get("address") || undefined,
      website: formData.get("website") || undefined,
      logoUrl: formData.get("logoUrl") || undefined,
    };

    if (!payload.name || !payload.email || !payload.category) {
      return {
        success: false,
        error: "Name, Email and Category are required",
      };
    }

    const validationResult = zodValidator(
      payload,
      CreateBusinessZodSchemaValidation
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload: any = validationResult.data;

    const businessData = {
      name: validatedPayload.name,
      email: validatedPayload.email,
      category: validatedPayload.category,
      phone: validatedPayload.phone || undefined,
      address: validatedPayload.address || undefined,
      website: validatedPayload.website || undefined,
      logoUrl: validatedPayload.logoUrl || undefined,
    };

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("https://finvia-backend.vercel.app//api/v1/business/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(businessData),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to create business",
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
