"use server";

import { cookies } from "next/headers";

export const logoutUser = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    await fetch("https://finvia-dusky.vercel.app/api/v1/auth/logout", {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });

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

    return { success: true };
  } catch {
    return { success: false };
  }
};
