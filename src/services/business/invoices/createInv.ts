/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createInvoice = async (currentState: any, formData: FormData) => {
  try {
    const itemsRaw = formData.get("items");
    const items = itemsRaw ? JSON.parse(itemsRaw as string) : [];

    const payload = {
      email: formData.get("email"),
      dueDays: Number(formData.get("dueDays")) || 3,
      items,
      taxRate: Number(formData.get("taxRate")) || 0,
      notes: formData.get("notes") || undefined, 
    };

    console.log(payload);

    if (!payload.email) {
      return {
        success: false,
        error: "Email is required",
      };
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return {
        success: false,
        error: "At least one item is required",
      };
    }

    if (!payload.notes) {
      delete payload.notes;
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("https://finvia-dusky.vercel.app/api/v1/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to create invoice",
      };
    }

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

