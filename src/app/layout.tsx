import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Finvia",
    template: "%s • Finvia",
  },

  description:
    "Modern business workspace for invoices, clients, analytics, and financial management.",

  keywords: [
    "Finvia",
    "invoice management",
    "business dashboard",
    "client management",
    "financial workspace",
    "SaaS",
  ],

  metadataBase: new URL("https://finvia.app"),

  openGraph: {
    title: "Finvia",

    description:
      "Modern business workspace for invoices, clients, analytics, and financial management.",

    siteName: "Finvia",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Finvia",

    description:
      "Modern business workspace for invoices, clients, analytics, and financial management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#020617] font-sans text-white antialiased`}
      >
        {/* GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* TOP GLOW */}
          <div className="absolute left-1/2 top-0 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

          {/* BOTTOM GLOW */}
          <div className="absolute bottom-0 right-0 h-87.5 w-87.5 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        {children}

        {/* TOASTS */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "!border !border-white/10 !bg-[#0B1120] !text-white",
          }}
        />

        {/* SPEED INSIGHTS */}
        <SpeedInsights />
      </body>
    </html>
  );
}
