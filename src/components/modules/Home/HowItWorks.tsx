import { UserPlus, FileText, CreditCard } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section className="w-full py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get started in minutes
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Finvia is designed to be simple. No setup headaches. No learning
            curve.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-16 md:grid-cols-3">
          {/* Connector line (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 top-12 hidden h-px w-[70%] -translate-x-1/2 bg-white/8 md:block" />

          <Step
            step="01"
            icon={UserPlus}
            title="Create your account"
            description="Sign up and set up your business profile in just a few clicks."
          />

          <Step
            step="02"
            icon={FileText}
            title="Send invoices"
            description="Create professional invoices and share them instantly with clients."
          />

          <Step
            step="03"
            icon={CreditCard}
            title="Get paid & track"
            description="Accept payments, track revenue, and monitor everything in one place."
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Helper ---------- */

function Step({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: string
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="relative text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <span className="mb-2 block text-xs font-medium tracking-wider text-muted-foreground">
        STEP {step}
      </span>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
