"use server";

import { cookies } from "next/headers";

export const getMyBusiness = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("https://finvia-backend.vercel.app//api/v1/business/my-business", {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to load business details!",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
