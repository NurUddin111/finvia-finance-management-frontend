import type { Metadata } from "next";
import FinalCTASection from "@/components/modules/Home/Cta";
import FeaturesSection from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import HowItWorksSection from "@/components/modules/Home/HowItWorks";
import TrustSection from "@/components/modules/Home/Trust";
import BusinessChaosSection from "@/components/modules/Home/BusinessChaosSection";
import FAQSection from "@/components/modules/Home/FAQ";

export const metadata: Metadata = {
  title: "",
  description:
    "Manage invoices, clients, expenses, payments, and financial analytics from a single dashboard with Finvia.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BusinessChaosSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <TrustSection />
      <FinalCTASection />
    </main>
  );
}
