import { ShieldCheck, Lock, BadgeCheck, Server } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="w-full py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-14 sm:mb-20 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-wider text-primary">
            Trusted & secure
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built with security and reliability in mind
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Finvia follows modern security practices to keep your data safe,
            private, and always accessible.
          </p>
        </div>

        {/* Trust Items */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem
            icon={ShieldCheck}
            title="Data encryption"
            description="All sensitive data is encrypted in transit and at rest."
          />
          <TrustItem
            icon={Lock}
            title="Privacy first"
            description="Your business data is never shared with third parties."
          />
          <TrustItem
            icon={BadgeCheck}
            title="Reliable infrastructure"
            description="Built on proven, scalable cloud infrastructure."
          />
          <TrustItem
            icon={Server}
            title="Regular backups"
            description="Automated backups ensure your data is never lost."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Helper ---------- */

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center max-w-xs mx-auto">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="text-base font-semibold leading-tight">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
