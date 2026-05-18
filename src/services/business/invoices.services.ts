"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ActionResult } from "@/types/actions";
import { GetAllInvoicesParams, IInvoice, IInvoiceItem, InvoiceStats } from "@/types/invoice";

export const createInvoice = async (
  currentState: ActionResult<IInvoice> | null,
  formData: FormData,
): Promise<ActionResult<IInvoice>> => {
  const itemsRaw = formData.get("items");
  const method = formData.get("method") as "ONLINE" | "CASH";
  const notes = formData.get("notes");

  const items: IInvoiceItem[] = itemsRaw
    ? (JSON.parse(itemsRaw as string) as IInvoiceItem[])
    : [];

  const payload: {
    email: FormDataEntryValue | null;
    dueDays: number;
    taxRate: number;
    method: "ONLINE" | "CASH";
    items: IInvoiceItem[];
    notes?: FormDataEntryValue;
  } = {
    email: formData.get("email"),
    dueDays: Number(formData.get("dueDays")) || 3,
    taxRate: Number(formData.get("taxRate")) || 0,
    method,
    items,
    ...(notes ? { notes } : {}),
  };

  if (!payload.email) return { success: false, error: "Email is required" };
  if (!["ONLINE", "CASH"].includes(method))
    return { success: false, error: "Invalid payment method" };
  if (!payload.items.length)
    return { success: false, error: "At least one item is required" };
  if (payload.items.some((item) => !item.productId))
    return { success: false, error: "All items must have a product selected" };

  return serverFetch<IInvoice>("/invoice/create", {
    method: "POST",
    body: payload,
  });
};

export const getAllInvoices = async (
  params?: GetAllInvoicesParams,
): Promise<ActionResult<IInvoice[]>> => {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.order) searchParams.set("order", params.order);
  if (params?.year) searchParams.set("year", params.year);

  const queryString = searchParams.toString();
  const endpoint = `/invoice/all${queryString ? `?${queryString}` : ""}`;

  return serverFetch<IInvoice[]>(endpoint, { cache: "no-store" });
};

export const getInvoiceStats = async (): Promise<ActionResult<InvoiceStats>> => {
  return serverFetch<InvoiceStats>("/invoice/stats", { cache: "no-store" });
};

export const updateInvStatus = async (): Promise<ActionResult<null>> => {
  return serverFetch<null>("/invoice/update-status", { method: "PATCH" });
};

export const getSingleInvoice = async (invId: string): Promise<ActionResult<IInvoice>> => {
  return serverFetch<IInvoice>(`/invoice/${invId}`, { cache: "no-store" });
};

export const sendInvoice = async (invoiceId: string): Promise<ActionResult<null>> => {
  return serverFetch<null>(`/invoice/send/${invoiceId}`, { method: "POST" });
};