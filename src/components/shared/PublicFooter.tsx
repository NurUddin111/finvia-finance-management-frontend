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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] px-3 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-blue-500/8 blur-3xl sm:h-64 sm:w-64" />

        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* TOP */}
        <div className="grid gap-8 border-b border-white/10 pb-8 sm:grid-cols-2 sm:gap-10 sm:pb-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:gap-8">
          {/* BRAND */}
          <div className="max-w-md">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
              <Sparkles className="size-3.5 shrink-0 text-blue-400 sm:size-4" />

              <span className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] sm:tracking-[0.18em]">
                Finvia
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Modern business
              <br className="hidden sm:block" />
              workspace platform
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Finvia helps freelancers and modern businesses manage invoices,
              clients, products, and payments from one beautifully designed
              workspace.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] font-medium text-slate-400 sm:px-4 sm:py-2 sm:text-xs">
                Invoicing
              </div>

              <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] font-medium text-slate-400 sm:px-4 sm:py-2 sm:text-xs">
                Payments
              </div>

              <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] font-medium text-slate-400 sm:px-4 sm:py-2 sm:text-xs">
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
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p className="text-[11px] leading-relaxed text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Finvia. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 sm:gap-5 sm:text-sm">
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
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
        {title}
      </p>

      <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
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
