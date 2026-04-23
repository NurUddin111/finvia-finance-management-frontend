/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { zodValidator } from "@/lib/zodValidator";
import { loginZodSchemaValidation } from "@/zod/auth.validation";
import cookie from "cookie";
import { cookies } from "next/headers";

export const login = async (currentState: any, formData: FormData) => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationResult = zodValidator(payload, loginZodSchemaValidation);

    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload: any = validationResult.data;

    const loginData = {
      email: validatedPayload.email,
      password: validatedPayload.password,
    };

    const newFormData = JSON.stringify(loginData);

    const res = await fetch(
      // "http://localhost:1126/api/v1/auth/login",
      "http://localhost:1126/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: newFormData,
      }
    );

    const result = res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    console.log(setCookieHeaders);

    let parsedAccessToken: any = null;
    let parsedRefreshToken: any = null;
    let accessToken = null;
    let refreshToken = null;

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((ck: string) => {
        const parsedCookie = cookie.parse(ck);

        if (parsedCookie["accessToken"]) {
          parsedAccessToken = parsedCookie;
        }

        if (parsedCookie["refreshToken"]) {
          parsedRefreshToken = parsedCookie;
        }
      });

      if (!parsedAccessToken) {
        throw new Error("Access token not found.");
      }

      if (!parsedRefreshToken) {
        throw new Error("Refresh token not found.");
      }

      accessToken = parsedAccessToken.accessToken;
      refreshToken = parsedRefreshToken.refreshToken;
    } else {
      throw new Error("Access token not found in headers.");
    }

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    if (!refreshToken) {
      throw new Error("Refresh token not found.");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: parsedAccessToken?.path || "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: parsedRefreshToken?.path || "/",
    });

    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to login! Please try again!",
    };
  }
};
