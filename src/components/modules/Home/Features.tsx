import { BarChart3, CreditCard, FileText, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Invoicing",
    description:
      "Create, manage, and share professional invoices in seconds with a clean modern workflow.",
    color: "text-blue-400",
    bg: "bg-blue-500",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description:
      "Monitor paid and unpaid invoices with real-time payment visibility and outstanding status tracking.",
    color: "text-emerald-400",
    bg: "bg-emerald-500",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "Keep all your clients, invoice history, and business relationships organized in one place.",
    color: "text-violet-400",
    bg: "bg-violet-500",
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    description:
      "Understand revenue, payments, invoice trends, and business performance through visual analytics.",
    color: "text-amber-400",
    bg: "bg-amber-500",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-3 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Core Features
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Everything you need
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              to run your business
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Manage invoices, payments, clients, and business performance from a
            single modern workspace.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative mt-8">
          {/* LINE */}
          <div className="absolute bottom-0 left-4.5 top-0 w-px bg-linear-to-b from-blue-500/30 via-violet-500/20 to-transparent" />

          <div className="space-y-10">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="relative flex gap-4">
                  {/* ICON */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${feature.bg}/10`}
                    >
                      <Icon className={`size-4 ${feature.color}`} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {feature.title}
                    </h3>

                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
