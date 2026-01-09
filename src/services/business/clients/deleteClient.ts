/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const deleteClient = async (clientId: string, currentState: any) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `https://finvia-backend.vercel.app//api/v1/client/delete/${clientId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to delete client",
      };
    }

    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
