import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, CheckCircle } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            The problem & the fix
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From chaos to clarity
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Managing invoices and clients shouldn’t feel confusing or messy.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Problems */}
          <Card className="border border-muted bg-background/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <XCircle className="h-5 w-5 text-destructive" />
                Common Problems
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <ProblemItem text="Invoices scattered across WhatsApp, Excel, and PDFs" />
              <ProblemItem text="No clear idea who has paid and who hasn’t" />
              <ProblemItem text="Clients repeatedly asking for invoice copies" />
              <ProblemItem text="Manual calculations causing mistakes and stress" />
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border border-primary/20 bg-background/60 shadow-[0_0_40px_-18px_rgba(124,106,242,0.35)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                Our Solution
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <SolutionItem text="All invoices organized in one clean dashboard" />
              <SolutionItem text="Real-time payment status at a glance" />
              <SolutionItem text="Auto-generated, shareable invoices for clients" />
              <SolutionItem text="Accurate totals with zero manual calculations" />
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="text-sm font-medium text-primary hover:underline underline-offset-4">
            See how it works →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function ProblemItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <XCircle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function SolutionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
