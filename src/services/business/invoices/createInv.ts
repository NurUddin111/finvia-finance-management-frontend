/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const createInvoice = async (currentState: any, formData: FormData) => {
  const itemsRaw = formData.get("items");
  const method = formData.get("method") as "ONLINE" | "CASH";

  const payload: Record<string, any> = {
    email: formData.get("email"),
    dueDays: Number(formData.get("dueDays")) || 3,
    taxRate: Number(formData.get("taxRate")) || 0,
    method,
    items: itemsRaw ? JSON.parse(itemsRaw as string) : [],
  };

  const notes = formData.get("notes");
  if (notes) payload.notes = notes;

  if (!payload.email) return { success: false, error: "Email is required" };
  if (!["ONLINE", "CASH"].includes(method))
    return { success: false, error: "Invalid payment method" };
  if (!payload.items.length)
    return { success: false, error: "At least one item is required" };
  if (payload.items.some((item: any) => !item.productId)) {
    return { success: false, error: "All items must have a product selected" };
  }

  return serverFetch("/invoice/create", { method: "POST", body: payload });
};
