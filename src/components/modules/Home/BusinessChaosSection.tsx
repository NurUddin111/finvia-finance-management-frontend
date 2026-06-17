import Image from "next/image";
import { CircleAlert, CircleX } from "lucide-react";

const problems = [
  "Invoices scattered across WhatsApp, PDFs and spreadsheets",
  "Clients repeatedly asking for old invoice copies",
  "Manual calculations causing costly mistakes",
  "No clear visibility into revenue and payment status",
];

export default function BusinessChaosSection() {
  return (
    <section className="relative overflow-hidden px-3 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />

        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* LEFT */}
          <div className="relative lg:translate-y-2">
            {/* GLOW */}
            <div className="absolute inset-0 rounded-4xl bg-blue-500/10 blur-3xl" />

            {/* SCREENSHOT */}
            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0B1120] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/problem/invoice-management.png"
                alt="Finvia Invoice Management"
                width={1400}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
          {/* RIGHT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/15 bg-red-500/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-red-400">
              <CircleAlert className="size-3.5" />
              Business Chaos
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Still managing your business
              <br />
              through spreadsheets and chats?
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Most freelancers and small businesses waste hours every week
              searching for invoices, tracking payments and managing client
              information manually.
            </p>

            <div className="mt-8 space-y-4">
              {problems.map((problem) => (
                <div key={problem} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <CircleX className="size-4 text-red-400" />
                  </div>

                  <p className="pt-1 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
