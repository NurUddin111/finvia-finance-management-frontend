"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowRight, Building2, Menu, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Features",
    href: "/#features",
  },

  {
    label: "Benefits",
    href: "/#benefits",
  },

  {
    label: "Testimonials",
    href: "/#testimonials",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5 lg:px-6",

          scrolled
            ? "border-white/10 bg-[#050816]/80 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* LEFT */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/15">
            <Building2 className="size-5 text-blue-400" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Finvia
              </h1>

              <Sparkles className="size-3.5 text-blue-400" />
            </div>

            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Business Workspace
            </p>
          </div>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-white"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-linear-to-r from-blue-400 to-violet-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            onClick={() =>
              router.push("/login", {
                scroll: false,
              })
            }
            className="h-11 rounded-2xl px-5 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            Log in
          </Button>

          <Button
            onClick={() =>
              router.push("/signup", {
                scroll: false,
              })
            }
            className="group h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* MOBILE MENU */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              size="icon"
              variant="ghost"
              className="h-11 w-11 rounded-2xl border border-white/10 bg-white/3 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="border-l border-white/10 bg-[#050816] px-0 text-white">
            {/* TOP */}
            <SheetHeader className="border-b border-white/10 px-5 pb-5">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <Building2 className="size-5 text-blue-400" />
                  </div>

                  <div>
                    <SheetTitle className="text-left text-lg font-semibold tracking-tight text-white">
                      Finvia
                    </SheetTitle>

                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      Business Workspace
                    </p>
                  </div>
                </Link>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-2xl border border-white/10 bg-white/3 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </SheetHeader>

            {/* NAVIGATION */}
            <div className="flex h-full flex-col px-5 pb-8 pt-6">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-2xl border border-transparent bg-white/2 px-4 py-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-blue-500/15 hover:bg-blue-500/4 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-auto space-y-3 pt-8">
                <Button
                  onClick={() => {
                    router.push("/login", {
                      scroll: false,
                    });

                    setOpen(false);
                  }}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  Log in
                </Button>

                <Button
                  onClick={() => {
                    router.push("/signup", {
                      scroll: false,
                    });

                    setOpen(false);
                  }}
                  className="group h-12 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]"
                >
                  Get Started
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
