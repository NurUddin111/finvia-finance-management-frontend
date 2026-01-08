/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { AddClientZodSchemaValidation } from "@/zod/business.validation";
import { cookies } from "next/headers";

export const addClient = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      address: formData.get("address") || undefined,
    };

    if (!payload.name || !payload.email ) {
      return {
        success: false,
        error: "Name, Email are required",
      };
    }

    const validationResult = zodValidator(
      payload,
      AddClientZodSchemaValidation
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload: any = validationResult.data;

    const clientData = {
      name: validatedPayload.name,
      email: validatedPayload.email,
      phone: validatedPayload.phone || undefined,
      address: validatedPayload.address || undefined,
    };

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    console.log(cookieHeader)

    const res = await fetch("https://finvia-dusky.vercel.app/api/v1/client/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(clientData),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to add client",
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
