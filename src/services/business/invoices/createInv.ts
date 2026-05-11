/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createInvoice = async (currentState: any, formData: FormData) => {
  try {
    const itemsRaw = formData.get("items");
    const items = itemsRaw ? JSON.parse(itemsRaw as string) : [];
    const method = formData.get("method") as "ONLINE" | "CASH";

    const payload: Record<string, any> = {
      email: formData.get("email"),
      dueDays: Number(formData.get("dueDays")) || 3,
      taxRate: Number(formData.get("taxRate")) || 0,
      method,
      items,
    };

    const notes = formData.get("notes");
    if (notes) payload.notes = notes;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!payload.email) {
      return { success: false, error: "Email is required" };
    }

    if (!["ONLINE", "CASH"].includes(method)) {
      return { success: false, error: "Invalid payment method" };
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return { success: false, error: "At least one item is required" };
    }

    const hasInvalidItem = payload.items.some((item: any) => !item.productId);
    if (hasInvalidItem) {
      return {
        success: false,
        error: "All items must have a product selected",
      };
    }

    // ── Request ───────────────────────────────────────────────────────────────
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

    return result;
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
