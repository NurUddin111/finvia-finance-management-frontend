import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Is Finvia free to use?",
    answer:
      "Yes. You can get started with Finvia without any upfront cost and explore the core experience immediately.",
  },
  {
    question: "Who is Finvia built for?",
    answer:
      "Finvia is designed for freelancers, consultants, agencies, startups, and small businesses that want a simple way to manage finances and clients.",
  },
  {
    question: "Can I manage multiple clients?",
    answer:
      "Absolutely. You can organize client information, track invoice history, and manage business relationships from one centralized workspace.",
  },
  {
    question: "Can I create and share invoices?",
    answer:
      "Yes. Finvia allows you to create professional invoices, calculate totals automatically, and share them with clients in seconds.",
  },
  {
    question: "Can I track payments and revenue?",
    answer:
      "Yes. Finvia helps you monitor invoice status, payment activity, and overall business performance through built-in analytics.",
  },
  {
    question: "Do I need accounting experience?",
    answer:
      "No. Finvia is built to be simple and approachable, even if you have no accounting or finance background.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden px-3 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/6 blur-3xl" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* HEADER */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Sparkles className="size-4 text-blue-400" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-400">
              FAQ
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Frequently Asked
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Everything you need to know before getting started with Finvia.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-white hover:text-blue-400">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
