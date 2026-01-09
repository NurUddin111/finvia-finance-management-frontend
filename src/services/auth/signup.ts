/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { zodValidator } from "@/lib/zodValidator";
import { signupZodSchemaValidation } from "@/zod/auth.validation";
import cookie from "cookie";
import { cookies } from "next/headers";

export const signup = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    const validationResult = zodValidator(payload, signupZodSchemaValidation);

    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload: any = validationResult.data;

    const signupData = {
      name: validatedPayload.name,
      email: validatedPayload.email,
    };

    const newFormData = JSON.stringify(signupData);

    const res = await fetch("https://finvia-backend.vercel.app//api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newFormData,
    });

    const result = res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    let parsedCreationToken: any = null;
    let creationToken = null;

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((ck: string) => {
        const parsedCookie = cookie.parse(ck);

        if (parsedCookie["creationToken"]) {
          parsedCreationToken = parsedCookie;
        }
      });

      if (!parsedCreationToken) {
        throw new Error("Creation token not found.");
      }

      creationToken = parsedCreationToken.creationToken;
    } else {
      throw new Error("Creation token not found in headers.");
    }

    if (!creationToken) {
      throw new Error("Creation token not found.");
    }

    const cookieStore = await cookies();

    cookieStore.set("creationToken", creationToken, {
      secure: false,
      httpOnly: true,
      maxAge: 2 * 60,
      path: parsedCreationToken?.path || "/",
    });

    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to send otp",
    };
  }
};
