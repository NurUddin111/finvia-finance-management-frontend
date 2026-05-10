"use server";

import { cookies } from "next/headers";

export const getTopProducts = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("http://localhost:1126/api/v1/product/top", {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to fetch top products!",
      };
    }

    return {
      success: true,
      data: result.data as { name: string; totalSold: number }[],
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
