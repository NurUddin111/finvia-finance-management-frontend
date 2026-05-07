"use server";

import { cookies } from "next/headers";

export const updateInvStatus = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const url = `http://localhost:1126/api/v1/invoice/update-status`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: result?.message || "Failed to update invoice status!",
      };

    return {
      success: true,
      data: result.data.data,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
