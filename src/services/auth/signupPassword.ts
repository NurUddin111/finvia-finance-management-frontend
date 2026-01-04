/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { signupPasswordZodSchemaValidation } from "@/zod/auth.validation";
import { cookies } from "next/headers";

export const signupPassword = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      password: formData.get("password"),
    };

    const validationResult: any = zodValidator(
      payload,
      signupPasswordZodSchemaValidation
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const password = {
      password: validationResult.data.password,
    };

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      "http://localhost:1126/api/v1/auth/signup/password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(password),
      }
    );

    const result = await res.json();


    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Account creation failed",
    };
  }
};
