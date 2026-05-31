import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Google callback route handler hit:", request.url);
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  console.log(accessToken);

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL("/login?error=google_failed", request.url),
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  const response = NextResponse.redirect(
    new URL("/auth/google/callback", request.url),
  );

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60,
    path: "/",
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
