import type { MetadataRoute } from "next";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://finvia-finance-management.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/admin", "/business"],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
