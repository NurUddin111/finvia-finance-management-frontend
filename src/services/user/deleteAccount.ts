"use server";

import { cookies } from "next/headers";

export const deleteMyAccount = async (userId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `https://finvia-backend.vercel.app/api/v1/user/delete/${userId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return { success: false, error: result?.message };
    }

    cookieStore.set({
      name: "accessToken",
      value: "",
      maxAge: 0,
      path: "/",
    });

    cookieStore.set({
      name: "refreshToken",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return result;
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};
