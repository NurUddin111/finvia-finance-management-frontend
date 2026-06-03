import type { Metadata } from "next";
import FinalCTASection from "@/components/modules/Home/Cta";
import FeaturesSection from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import HowItWorksSection from "@/components/modules/Home/HowItWorks";
import TrustSection from "@/components/modules/Home/Trust";
import WhySection from "@/components/modules/Home/WhyUs";
import ProblemSolutionSection from "@/components/modules/Home/problem-solution";

export const metadata: Metadata = {
  title: "Business Finance Management Platform",
  description:
    "Manage invoices, clients, expenses, payments, and financial analytics from a single dashboard with Finvia.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSolutionSection />
      <FeaturesSection />
      <WhySection />
      <HowItWorksSection />
      <TrustSection />
      <FinalCTASection />
    </main>
  );
}
