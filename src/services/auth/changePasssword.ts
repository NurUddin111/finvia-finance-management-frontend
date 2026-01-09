/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const changePassword = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      oldPass: formData.get("oldPass"),
      newPass: formData.get("newPass"),
      confirmNewPass: formData.get("confirmNewPass"),
    };

    if (!payload.oldPass || !payload.newPass || !payload.confirmNewPass) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      "https://finvia-backend.vercel.app/api/v1/auth/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to change password",
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
