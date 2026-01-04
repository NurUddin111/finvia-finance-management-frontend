/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createInvoice = async (currentState: any, formData: FormData) => {
  try {
    // 🔹 Parse items safely
    const itemsRaw = formData.get("items");
    const items = itemsRaw ? JSON.parse(itemsRaw as string) : [];

    // 🔹 Build payload EXACTLY as backend expects
    const payload = {
      email: formData.get("email"),
      dueDays: Number(formData.get("dueDays")) || 3, // ✅ default 3
      items,
      taxRate: Number(formData.get("taxRate")) || 0,
      notes: formData.get("notes") || undefined, // ✅ optional
    };

    console.log(payload);

    // 🔹 Required validation (simple, like your style)
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

    // 🔹 Optional cleanup (remove empty notes)
    if (!payload.notes) {
      delete payload.notes;
    }

    // 🔹 Forward cookies (same as AddBusiness)
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("http://localhost:1126/api/v1/invoice/create", {
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

