"use server";

import { IUser } from "./../types/user";
import {
  clearCookies,
  forwardResponseCookies,
  serverFetch,
} from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { ActionResult } from "@/types/actions";
import {
  signupZodSchemaValidation,
  signupVerificationZodSchemaValidation,
  signupPasswordZodSchemaValidation,
  loginZodSchemaValidation,
  changePasswordZodSchemaValidation,
  UpdateUserZodSchemaValidation,
} from "@/zod/auth.validation";

export const signup = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const validationResult = zodValidator(payload, signupZodSchemaValidation);

  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>("/auth/signup", {
    method: "POST",
    body: validationResult.data,
    withCookies: false,
    onResponse: (res) => forwardResponseCookies(res, ["creationToken"]),
  });
};

export const verifyOtp = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = { otp: formData.get("otp") };

  const validationResult = zodValidator(
    payload,
    signupVerificationZodSchemaValidation,
  );
  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const result = await serverFetch<null>("/auth/signup/verify", {
    method: "POST",
    body: validationResult.data,
    onResponse: (res) => forwardResponseCookies(res, ["verifiedCreationToken"]),
  });

  if (result.success) {
    await clearCookies(["creationToken"]);
  }

  return result;
};

export const signupPassword = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = { password: formData.get("password") };

  const validationResult = zodValidator(
    payload,
    signupPasswordZodSchemaValidation,
  );
  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const result = await serverFetch<null>("/auth/signup/password", {
    method: "POST",
    body: validationResult.data,
    onResponse: (res) =>
      forwardResponseCookies(res, ["accessToken", "refreshToken"]),
  });

  if (result.success) {
    await clearCookies(["verifiedCreationToken", "creationToken"]);
  }

  return result;
};

export const login = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validationResult = zodValidator(payload, loginZodSchemaValidation);
  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>("/auth/login", {
    method: "POST",
    body: validationResult.data,
    withCookies: false,
    onResponse: (res) =>
      forwardResponseCookies(res, ["accessToken", "refreshToken"]),
  });
};

export const getMe = async (): Promise<ActionResult<IUser>> => {
  return serverFetch<IUser>("/user/my-profile", { cache: "no-store" });
};

export const updateProfile = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const userId = formData.get("userId") as string;
  if (!userId) return { success: false, error: "User ID is missing" };

  const avatar = formData.get("avatar");
  const hasNewAvatar = avatar instanceof File && avatar.size > 0;

  const payload = {
    name: formData.get("name") || undefined,
    phone: formData.get("phone") || undefined,
    address: formData.get("address") || undefined,
  };

  (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
    if (payload[key] === "" || payload[key] === null) {
      payload[key] = undefined;
    }
  });

  // nothing changed — treat as success silently
  if (!payload.name && !payload.phone && !payload.address && !hasNewAvatar) {
    return { success: true };
  }

  const validationResult = zodValidator(payload, UpdateUserZodSchemaValidation);
  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  const body = new FormData();
  body.append("userId", userId);

  const { name, phone, address } = validationResult.data;
  if (name) body.append("name", name);
  if (phone) body.append("phone", phone);
  if (address) body.append("address", address);
  if (hasNewAvatar) body.append("avatar", avatar as File);

  return serverFetch<null>(`/user/update/${userId}`, {
    method: "PATCH",
    body,
  });
};

export const changePassword = async (
  currentState: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> => {
  const payload = {
    oldPass: formData.get("oldPass"),
    newPass: formData.get("newPass"),
    confirmNewPass: formData.get("confirmNewPass"),
  };

  const validationResult = zodValidator(
    payload,
    changePasswordZodSchemaValidation,
  );
  if (!validationResult.success) {
    return { success: false, errors: validationResult.errors };
  }

  return serverFetch<null>("/auth/change-password", {
    method: "POST",
    body: validationResult.data,
  });
};

export const logoutUser = async (): Promise<ActionResult<null>> => {
  const result = await serverFetch<null>("/auth/logout", { method: "POST" });
  await clearCookies(["accessToken", "refreshToken"]);
  return result;
};

export const deleteMyAccount = async (
  userId: string,
): Promise<ActionResult<null>> => {
  const result = await serverFetch<null>(`/user/delete/${userId}`, {
    method: "PATCH",
  });

  if (result.success) {
    await clearCookies(["accessToken", "refreshToken"]);
  }

  return result;
};
