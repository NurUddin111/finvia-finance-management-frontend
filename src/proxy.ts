import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const creationToken = request.cookies.get("creationToken")?.value;
  const verifiedCreationToken = request.cookies.get(
    "verifiedCreationToken",
  )?.value;

  const protectedStartsWith = ["/admin", "/business", "/onboarding"];

  const isProtectedRoute = protectedStartsWith.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!creationToken && pathname === "/signup/verify") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (!verifiedCreationToken && pathname === "/signup/password") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      const role = decoded.role as string | undefined;

      if (pathname === "/login" || pathname === "/onboarding") {
        if (role === "ADMIN") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url),
          );
        }

        if (role === "BUSINESS_OWNER" || role === "BUSINESS_ADMIN") {
          return NextResponse.redirect(
            new URL("/business/dashboard", request.url),
          );
        }

        if (role === "USER") {
          return NextResponse.redirect(new URL("/onboarding", request.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
