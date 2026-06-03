import type { Metadata, Viewport } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import GoogleAnalytics from "@/components/providers/GoogleAnalytics";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://finvia-finance-management.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Finvia — Invoice & Finance Management for Small Businesses",
    template: "%s • Finvia",
  },

  verification: {
    google: "FYy51lxg2VvFepQpHXz6dymDvFhtwWjStJFkxxNHT0I",
  },

  applicationName: "Finvia",

  authors: [
    {
      name: "Finvia",
    },
  ],

  creator: "Finvia",
  publisher: "Finvia",

  category: "Business Software",

  description:
    "Finvia is a modern finance workspace for freelancers and small businesses. Create invoices, manage clients, track payments, and monitor your business analytics — all in one place.",

  keywords: [
    "invoice management software",
    "client management software",
    "business finance software",
    "expense tracking software",
    "small business accounting",
    "business analytics dashboard",
    "financial management platform",
    "Finvia",
  ],

  metadataBase: new URL(APP_URL),

  alternates: {
    canonical: APP_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Finvia — Business Finance Management",
    description:
      "Manage invoices, clients, payments, and financial analytics in one place.",
    siteName: "Finvia",
    type: "website",
    url: APP_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finvia — Business Finance Management",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Finvia — Business Finance Management",
    description:
      "Manage invoices, clients, payments, and financial analytics in one place.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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

        <GoogleAnalytics />

        {/* SPEED INSIGHTS */}

        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Finvia",
                description:
                  "Business finance management platform for freelancers and small businesses.",
                url: APP_URL,
                logo: `${APP_URL}/logo.png`,
              },

              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Finvia",
                url: APP_URL,
              },

              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Finvia",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                url: APP_URL,
                publisher: {
                  "@type": "Organization",
                  name: "Finvia",
                },
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
