import { Clock, Zap, ShieldCheck, LineChart } from "lucide-react";

export default function WhyFinviaSection() {
  return (
    <section className="w-full py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT — TEXT */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-wider text-primary">
              Why Finvia?
            </p>

            <h2 className="text-4xl font-bold tracking-tight leading-tight">
              Focus on growth, not paperwork
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Manual admin work kills productivity. Finvia streamlines your
              operations so you can scale your business without scaling your
              workload.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <Benefit
                icon={Clock}
                title="Save 10+ hours per week"
                description="Automate invoicing, reminders, and data entry so you can focus on what matters."
              />
              <Benefit
                icon={Zap}
                title="Get paid 2× faster"
                description="Online payments and automated follow-ups reduce overdue invoices."
              />
              <Benefit
                icon={ShieldCheck}
                title="Bank-grade security"
                description="Your data is encrypted and protected using industry standards."
              />
              <Benefit
                icon={LineChart}
                title="Real-time insights"
                description="Make smarter decisions with clear revenue and client reports."
              />
            </div>
          </div>

          {/* RIGHT — VISUAL CARD */}
          <div className="relative rounded-2xl bg-white/2 p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="space-y-6 sm:space-y-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white/3 px-5 sm:px-6 py-4 sm:py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-white/8" />
                    <div className="space-y-2">
                      <div className="h-3 w-36 rounded bg-white/8" />
                      <div className="h-3 w-24 rounded bg-white/6" />
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Paid
                  </span>
                </div>
              ))}

              <div className="h-px w-full bg-white/6" />

              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="text-lg font-semibold">$12,450.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helper ---------- */

function Benefit({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
