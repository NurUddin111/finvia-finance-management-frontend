"use server";

import { cookies } from "next/headers";

export const deleteMyBusiness = async (businessId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `https://finvia-dusky.vercel.app/api/v1/business/delete/${businessId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return { success: false, error: result?.message };
    }

    return result;
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};
