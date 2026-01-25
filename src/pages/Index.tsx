import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { MatchingSection } from "@/components/sections/MatchingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProcessSection />
      <ImpactSection />
      <MatchingSection />
      <ContactSection />
    </div>
  );
};

export default Index;
