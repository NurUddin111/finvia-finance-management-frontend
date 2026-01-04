"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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
                "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
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
            onClick={() => router.push("/login", { scroll: false })}
            className="rounded-full px-5 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            Log in
          </Button>

          <Button
            onClick={() => router.push("/signup", { scroll: false })}
            className="rounded-full px-5 bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_15px_50px_rgba(124,106,242,0.35)]"
          >
            Register
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(open && "invisible")}
            >
              <Menu className="h-6 w-6 text-muted-foreground" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col bg-black px-6 pt-6"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Finvia navigation</SheetTitle>

              <span className="text-lg font-semibold">
                Finvia<span className="text-primary">•</span>
              </span>
            </SheetHeader>

            {/* Nav Links */}
            <nav className="mt-6 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="mt-auto flex flex-col gap-4 pb-8">
              <Button
                onClick={() => {
                  router.push("/login", { scroll: false });
                  setOpen(false);
                }}
                className="h-12 rounded-full bg-primary text-primary-foreground"
              >
                Log in
              </Button>

              <Button
                onClick={() => {
                  router.push("/signup", { scroll: false });
                  setOpen(false);
                }}
                className="h-12 rounded-full bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_15px_50px_rgba(124,106,242,0.35)]"
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
