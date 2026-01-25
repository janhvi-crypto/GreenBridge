import { Leaf } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "matching", label: "Matching Engine" },
  { id: "calculator", label: "ROI Calculator" },
  { id: "govhub", label: "Gov Hub" },
  { id: "stories", label: "Success Stories" },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-gradient-hero text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-6">
        {/* Logo and Tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                🌱 GreenBridge
              </h1>
              <p className="text-white/80 text-sm md:text-base mt-0.5">
                Transforming Delhi's Landfills into Economic & Environmental Assets
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-button ${
                activeTab === tab.id ? "nav-button-active" : "nav-button-inactive"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
