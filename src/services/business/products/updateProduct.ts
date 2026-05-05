/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { AddProductZodSchemaValidation } from "@/zod/product.validation";
import { cookies } from "next/headers";

export const updateProduct = async (
  productId: string,
  currentState: any,
  formData: FormData,
) => {
  try {
    const payload = {
      name: formData.get("name") || undefined,
    };

    if (!payload.name) {
      return { success: true };
    }

    const validationResult = zodValidator(
      payload,
      AddProductZodSchemaValidation,
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `http://localhost:1126/api/v1/product/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(validationResult.data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to update product",
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
