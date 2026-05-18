"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ActionResult } from "@/types/actions";
import { ClientsStats, GetAllClientsParams, IClient } from "@/types/client";
import { AddClientZodSchemaValidation } from "@/zod/client.validation";

export const addClient = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
  };

  const validationResult = zodValidator(payload, AddClientZodSchemaValidation);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>("/client/add", {
    method: "POST",
    body: validationResult.data,
  });
};

export const getAllClients = async (
  params?: GetAllClientsParams,
): Promise<ActionResult<IClient[]>> => {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.order) searchParams.set("order", params.order);

  const queryString = searchParams.toString();
  const endpoint = `/client/all${queryString ? `?${queryString}` : ""}`;

  return serverFetch<IClient[]>(endpoint, { cache: "no-store" });
};

export const getClientsStats = async (): Promise<
  ActionResult<ClientsStats>
> => {
  return serverFetch<ClientsStats>("/client/stats", { cache: "no-store" });
};

export const updateClient = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const clientId = formData.get("clientId") as string;
  if (!clientId) return { success: false, error: "Client ID is missing" };

  const payload = {
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
  };

  (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
    if (payload[key] === "" || payload[key] === null) {
      payload[key] = undefined;
    }
  });

  if (!payload.name && !payload.email && !payload.phone && !payload.address) {
    return { success: true };
  }

  const validationResult = zodValidator(
    payload,
    AddClientZodSchemaValidation.partial(),
  );

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>(`/client/edit/${clientId}`, {
    method: "PATCH",
    body: validationResult.data,
  });
};

export const deleteClient = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const clientId = formData.get("clientId") as string;
  if (!clientId) return { success: false, error: "Client ID is missing" };

  return serverFetch<null>(`/client/delete/${clientId}`, { method: "PATCH" });
};

export const updateClientStatus = async (): Promise<ActionResult<null>> => {
  return serverFetch<null>("/client/update-status", { method: "PATCH" });
};
