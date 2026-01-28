import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { MatchingSection } from "@/components/sections/MatchingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* 1. Hero + CTA */}
      <HeroSection />
      {/* 2. How It Works (visual flow) */}
      <ProcessSection />
      {/* 3. Real-time Impact Metrics / Success Stories */}
      <ImpactSection />
      {/* 4. Case Studies Carousel */}
      <CaseStudiesSection />
      {/* 5. Partner Logos */}
      <PartnersSection />
      {/* 6. Pricing Tiers Comparison */}
      <PricingSection />
      {/* 7. FAQ */}
      <FAQSection />
      {/* 8. Corporate Partners (B2B Onboarding) */}
      <MatchingSection />
      {/* 9. Footer with Contact */}
      <ContactSection />
    </div>
  );
};

export default Index;
