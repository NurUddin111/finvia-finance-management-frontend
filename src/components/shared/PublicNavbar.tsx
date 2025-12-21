"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Finvia<span className="text-primary">•</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm transition-colors",
                "text-muted-foreground hover:text-foreground",
                "after:absolute after:left-0 after:-bottom-1 after:h-0.5",
                "after:w-0 after:bg-white after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="rounded-full px-5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/5"
          >
            Log in
          </Button>

          <Button className="rounded-full px-5 bg-primary text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_15px_50px_rgba(124,106,242,0.35)]">
            Register
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            {!open && (
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-muted-foreground" />
              </Button>
            )}
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col bg-background px-6 pt-6"
          >
            {/* Header */}
            <SheetHeader>
              <SheetTitle className="sr-only">Finvia navigation</SheetTitle>

              <div>
                <span className="text-lg font-semibold">
                  Finvia<span className="text-primary">•</span>
                </span>
              </div>
            </SheetHeader>

            {/* Nav Links */}
            <nav className="mt-2 flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Section */}
            <div className="mt-auto flex flex-col gap-4 pb-8">
              <Button
                variant="outline"
                className="h-12 text-base"
                onClick={() => setOpen(false)}
              >
                Log in
              </Button>

              <Button
                className="
          h-12 text-base
          bg-primary text-primary-foreground
          shadow-[0_0_0_1px_rgba(124,106,242,0.3),0_10px_40px_rgba(124,106,242,0.25)]
        "
                onClick={() => setOpen(false)}
              >
                Register
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
