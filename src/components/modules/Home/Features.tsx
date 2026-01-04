import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CreditCard,
  Users,
  BarChart3,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Core features
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to run your business
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Powerful features designed to simplify invoicing, payments, and
            client management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={FileText}
            title="Smart Invoicing"
            description="Create, manage, and share professional invoices in seconds."
          />
          <FeatureCard
            icon={CreditCard}
            title="Payment Tracking"
            description="Track paid and unpaid invoices with real-time status updates."
          />
          <FeatureCard
            icon={Users}
            title="Client Management"
            description="Organize all your clients and their invoices in one place."
          />
          <FeatureCard
            icon={BarChart3}
            title="Business Insights"
            description="Get clear insights into revenue, payments, and performance."
          />
          <FeatureCard
            icon={Clock}
            title="Time Saving"
            description="Automate repetitive tasks and focus on growing your business."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Reliable"
            description="Your data is protected with modern security standards."
          />
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 text-center">
          <button className="text-sm font-medium text-primary hover:underline underline-offset-4">
            View all features →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helper ---------- */

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className=" h-full border border-muted bg-background/60 transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <Icon className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
