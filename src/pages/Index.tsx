import { useState } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { MatchingEngine } from "@/components/MatchingEngine";
import { ROICalculator } from "@/components/ROICalculator";
import { GovHub } from "@/components/GovHub";
import { SuccessStories } from "@/components/SuccessStories";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "matching":
        return <MatchingEngine />;
      case "calculator":
        return <ROICalculator />;
      case "govhub":
        return <GovHub />;
      case "stories":
        return <SuccessStories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-hero text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">GreenBridge</span>
          </div>
          <p className="text-white/80 text-sm max-w-xl mx-auto">
            Transforming Delhi's landfills into economic and environmental assets through AI-powered waste-to-value marketplace.
          </p>
          <p className="text-white/60 text-xs mt-4">
            © 2026 GreenBridge. Built for Smart India Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
