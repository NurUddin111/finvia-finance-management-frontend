"use server";

import { cookies } from "next/headers";

// Accept optional params object
export const getAllClients = async (params?: {
  page?: string;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    // URLSearchParams is a built-in Web API that builds query strings safely
    // It handles encoding special characters automatically e.g. "john doe" → "john+doe"
    const searchParams = new URLSearchParams();

    // Only append a param if it actually has a value
    // This keeps the URL clean: no ?search=&status= garbage
    if (params?.page) searchParams.set("page", params.page);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.status) searchParams.set("status", params.status);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.order) searchParams.set("order", params.order);

    // Convert to string e.g. "page=2&search=john&status=ACTIVE"
    const queryString = searchParams.toString();

    // Only add "?" if there are actual params, otherwise clean URL
    const url = `http://localhost:1126/api/v1/client/all${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to fetch clients",
      };
    }

    return {
      success: true,
      data: result.data.data, // the clients array
      meta: result.data.meta, // { total, page, totalPages, hasNextPage, hasPrevPage }
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
