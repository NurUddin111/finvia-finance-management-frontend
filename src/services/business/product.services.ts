"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ActionResult } from "@/types/actions";
import {
  GetAllProductsParams,
  IProduct,
  ITopProduct,
  ProductStats,
} from "@/types/product";
import {
  AddProductZodSchemaValidation,
  UpdateProductZodSchemaValidation,
} from "@/zod/product.validation";

export const addProduct = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const productsRaw = formData.get("productsName");
  const productsName: { name: string }[] = productsRaw
    ? (JSON.parse(productsRaw as string) as { name: string }[])
    : [];

  const validationResult = zodValidator(
    { productsName },
    AddProductZodSchemaValidation,
  );

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>("/product/add", {
    method: "POST",
    body: validationResult.data,
  });
};

export const getAllProducts = async (
  params?: GetAllProductsParams,
): Promise<ActionResult<IProduct[]>> => {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.order) searchParams.set("order", params.order);

  const queryString = searchParams.toString();
  const endpoint = `/product${queryString ? `?${queryString}` : ""}`;

  return serverFetch<IProduct[]>(endpoint, { cache: "no-store" });
};

export const updateProduct = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const productId = formData.get("productId") as string;
  if (!productId) return { success: false, error: "Product ID is missing" };

  const payload = { name: formData.get("name") || undefined };

  if (!payload.name) return { success: true };

  const validationResult = zodValidator(
    payload,
    UpdateProductZodSchemaValidation,
  );

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>(`/product/${productId}`, {
    method: "PATCH",
    body: validationResult.data,
  });
};

export const deleteProduct = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const productId = formData.get("productId") as string;
  if (!productId) return { success: false, error: "Product ID is missing" };

  return serverFetch<null>(`/product/${productId}`, { method: "DELETE" });
};

export const getProductsStats = async (): Promise<
  ActionResult<ProductStats>
> => {
  return serverFetch<ProductStats>("/product/stats", { cache: "no-store" });
};

export const getTopProducts = async (): Promise<
  ActionResult<ITopProduct[]>
> => {
  return serverFetch<ITopProduct[]>("/product/top", { cache: "no-store" });
};
