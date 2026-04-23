"use server";
import { cookies } from "next/headers";
export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res = await fetch("http://localhost:1126/api/v1/user/all", {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    const result = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to load clients",
      };
    }
    return { success: true, data: result.data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
