import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="text-lg font-semibold">Finvia</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A simple, modern platform to manage invoices, payments, and
              clients — all in one place.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Finvia. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link
              href="#"
              className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
