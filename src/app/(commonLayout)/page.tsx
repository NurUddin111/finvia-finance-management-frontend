import FinalCTASection from "@/components/modules/Home/Cta";
import FeaturesSection from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import HowItWorksSection from "@/components/modules/Home/HowItWorks";
import ProblemSolutionSection from "@/components/modules/Home/problem-solution";
import TrustSection from "@/components/modules/Home/Trust";
import WhySection from "@/components/modules/Home/WhyUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProblemSolutionSection />
      <FeaturesSection />
      <WhySection />
      <HowItWorksSection />
      <TrustSection />
      <FinalCTASection />
    </div>
  );
}
