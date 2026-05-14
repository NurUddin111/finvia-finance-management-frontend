/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  clearCookies,
  forwardResponseCookies,
  serverFetch,
} from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  signupZodSchemaValidation,
  signupVerificationZodSchemaValidation,
  signupPasswordZodSchemaValidation,
  loginZodSchemaValidation,
} from "@/zod/auth.validation";

export const signup = async (currentState: any, formData: FormData) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const validationResult = zodValidator(payload, signupZodSchemaValidation);
  if (!validationResult.success) return validationResult;

  return serverFetch("/auth/signup", {
    method: "POST",
    body: validationResult.data,
    withCookies: false,
    onResponse: (res) => forwardResponseCookies(res, ["creationToken"]),
  });
};

export const verifyOtp = async (currentState: any, formData: FormData) => {
  const payload = { otp: formData.get("otp") };

  const validationResult = zodValidator(
    payload,
    signupVerificationZodSchemaValidation,
  );
  if (!validationResult.success) return validationResult;

  return serverFetch("/auth/signup/verify", {
    method: "POST",
    body: validationResult.data,
    onResponse: (res) => forwardResponseCookies(res, ["verifiedCreationToken"]),
  });
};

export const signupPassword = async (currentState: any, formData: FormData) => {
  const payload = { password: formData.get("password") };

  const validationResult = zodValidator(
    payload,
    signupPasswordZodSchemaValidation,
  );
  if (!validationResult.success) return validationResult;

  return serverFetch("/auth/signup/password", {
    method: "POST",
    body: validationResult.data,
  });
};

export const login = async (currentState: any, formData: FormData) => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validationResult = zodValidator(payload, loginZodSchemaValidation);
  if (!validationResult.success) return validationResult;

  return serverFetch("/auth/login", {
    method: "POST",
    body: validationResult.data,
    withCookies: false,
    onResponse: (res) =>
      forwardResponseCookies(res, ["accessToken", "refreshToken"]),
  });
};

export const getMe = async () => {
  return serverFetch("/user/my-profile", { cache: "no-store" });
};

export const changePassword = async (currentState: any, formData: FormData) => {
  const payload = {
    oldPass: formData.get("oldPass"),
    newPass: formData.get("newPass"),
    confirmNewPass: formData.get("confirmNewPass"),
  };

  if (!payload.oldPass || !payload.newPass || !payload.confirmNewPass) {
    return { success: false, error: "All fields are required" };
  }

  return serverFetch("/auth/change-password", {
    method: "POST",
    body: payload,
  });
};

export const logoutUser = async () => {
  const result = await serverFetch("/auth/logout", { method: "POST" });

  await clearCookies(["accessToken", "refreshToken"]);

  return result;
};
