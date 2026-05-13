"use client";

import Link from "next/link";

import { ArrowUpRight, Sparkles } from "lucide-react";

const productLinks = [
  {
    label: "Features",
    href: "#features",
  },

  {
    label: "How it works",
    href: "#benefits",
  },

  {
    label: "Security",
    href: "#",
  },
];

const companyLinks = [
  {
    label: "About",
    href: "#",
  },

  {
    label: "Contact",
    href: "#",
  },

  {
    label: "Careers",
    href: "#",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "#",
  },

  {
    label: "Terms of Service",
    href: "#",
  },

  {
    label: "Cookies",
    href: "#",
  },
];

export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] px-4 pt-20 sm:px-6 lg:px-8">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-70 w-70 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* TOP */}
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:gap-10">
          {/* BRAND */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
              <Sparkles className="size-4 text-blue-400" />

              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
                Finvia
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              Modern business
              <br />
              workspace platform
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Finvia helps freelancers and modern businesses manage invoices,
              clients, products, and payments from one beautifully designed
              workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium text-slate-400">
                Invoicing
              </div>

              <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium text-slate-400">
                Payments
              </div>

              <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium text-slate-400">
                Analytics
              </div>
            </div>
          </div>

          {/* PRODUCT */}
          <FooterLinks title="Product" links={productLinks} />

          {/* COMPANY */}
          <FooterLinks title="Company" links={companyLinks} />

          {/* LEGAL */}
          <FooterLinks title="Legal" links={legalLinks} />
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Finvia. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 sm:text-sm">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- */
/* FOOTER LINKS */
/* ---------------------------------- */

function FooterLinks({
  title,
  links,
}: {
  title: string;

  links: {
    label: string;

    href: string;
  }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </p>

      <div className="mt-5 space-y-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
          >
            <span>{link.label}</span>

            <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
