"use server";

import { cookies } from "next/headers";

export const getAllProducts = async (params?: {
  page?: string;
  search?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.order) searchParams.set("order", params.order);

    const queryString = searchParams.toString();
    const url = `http://localhost:1126/api/v1/product${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to fetch products!",
      };
    }

    return {
      success: true,
      data: result.data.data,
      meta: result.data.meta,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
