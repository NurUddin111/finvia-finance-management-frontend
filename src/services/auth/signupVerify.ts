/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { signupVerificationZodSchemaValidation } from "@/zod/auth.validation";
import cookie from "cookie";
import { cookies } from "next/headers";

export const verifyOtp = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      otp: formData.get("otp"),
    };

    const validationResult: any = zodValidator(
      payload,
      signupVerificationZodSchemaValidation
    );

    if (!validationResult.success) {
      return validationResult;
    }

    const otp = {
      otp: validationResult.data.otp,
    };

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch("https://finvia-dusky.vercel.app/api/v1/auth/signup/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(otp),
    });

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    let parsedVerifiedCreationToken: any = null;
    let verifiedCreationToken = null;

    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      throw new Error("Verified creation token not found in response");
    } else {
      setCookieHeaders.forEach((ck: string) => {
        const parsedCookie = cookie.parse(ck);

        if (parsedCookie["verifiedCreationToken"]) {
          parsedVerifiedCreationToken = parsedCookie;
        }
      });

      if (!parsedVerifiedCreationToken) {
        throw new Error("Creation token not found.");
      }

      verifiedCreationToken = parsedVerifiedCreationToken.verifiedCreationToken;
    }

    if (!verifiedCreationToken) {
      throw new Error("verifiedCreationToken missing");
    }

    cookieStore.set("verifiedCreationToken", verifiedCreationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // ✅ seconds (2 minutes)
      path: "/",
    });

    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "OTP verification failed",
    };
  }
};
