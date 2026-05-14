import { cookies } from "next/headers";
import cookie from "cookie";
import { ActionResult } from "@/types/actions";

const BASE_URL = process.env.API_BASE_URL ?? "http://localhost:1126/api/v1";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: Method;
  body?: unknown;
  withCookies?: boolean;
  cache?: RequestCache;
  headers?: Record<string, string>;
  onResponse?: (res: Response) => Promise<void>; 
}

export type FetchResult = ActionResult;

export async function serverFetch(
  endpoint: string,
  {
    method = "GET",
    body,
    withCookies = true,
    cache,
    headers: extraHeaders,
    onResponse,
  }: FetchOptions = {},
): Promise<ActionResult> {
  const headers: Record<string, string> = { ...extraHeaders };

  if (body) headers["Content-Type"] = "application/json";

  if (withCookies) {
    const store = await cookies();
    headers["Cookie"] = store.toString();
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(cache !== undefined ? { cache } : {}),
  });

  if (onResponse) await onResponse(res);

  const json = await res.json();

  if (!res.ok) {
    return { success: false, error: json?.message ?? "Something went wrong" };
  }

  return { success: true, data: json.data, message: json.message };
}

// Parses Set-Cookie headers from backend response and stores them in Next.js cookie store
export async function forwardResponseCookies(
  res: Response,
  tokenNames: string[],
): Promise<void> {
  const setCookieHeaders = res.headers.getSetCookie();
  if (!setCookieHeaders?.length) return;

  const cookieStore = await cookies();

  for (const ck of setCookieHeaders) {
    const parsed = cookie.parse(ck);

    for (const name of tokenNames) {
      if (!parsed[name]) continue;

      cookieStore.set(name, parsed[name], {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: parsed["max-age"] ? Number(parsed["max-age"]) : undefined,
        path: parsed["path"] ?? "/",
      });
    }
  }
}

// Clears one or more cookies
export async function clearCookies(names: string[]): Promise<void> {
  const cookieStore = await cookies();
  names.forEach((name) =>
    cookieStore.set({ name, value: "", maxAge: 0, path: "/" }),
  );
}
