import type { Metadata } from "next";
import FinalCTASection from "@/components/modules/Home/Cta";
import FeaturesSection from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import HowItWorksSection from "@/components/modules/Home/HowItWorks";
import TrustSection from "@/components/modules/Home/Trust";
import WhySection from "@/components/modules/Home/WhyUs";
import BusinessChaosSection from "@/components/modules/Home/BusinessChaosSection";
import InvoiceShowcaseSection from "@/components/modules/Home/InvoiceShowcaseSection";
import ClientManagementSection from "@/components/modules/Home/ClientManagementSection";
import AnalyticsShowcaseSection from "@/components/modules/Home/AnalyticsShowcaseSection";

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
      <InvoiceShowcaseSection />
      <ClientManagementSection />
      <AnalyticsShowcaseSection />
      <FeaturesSection />
      <WhySection />
      <HowItWorksSection />
      <TrustSection />
      <FinalCTASection />
    </main>
  );
}
