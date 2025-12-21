import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinalCTASection() {
  return (
    <section className="w-full py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/3 px-8 py-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Ready when you are
          </p>

          <h2 className="text-2xl font-semibold sm:text-3xl">
            Start using Finvia today
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            No setup complexity. No credit card required. Just a simple way to
            manage invoices and payments.
          </p>

          <div className="mt-8">
            <Button size="lg" className="rounded-full px-8">
              Create free account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Free forever for basic usage · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
