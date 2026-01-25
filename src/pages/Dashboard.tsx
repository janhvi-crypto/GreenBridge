import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Calculator, 
  FileText, 
  TrendingUp,
  Menu,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { MatchingEngine } from "@/components/dashboard/MatchingEngine";
import { ROICalculator } from "@/components/dashboard/ROICalculator";
import { GovHub } from "@/components/dashboard/GovHub";
import { Analytics } from "@/components/dashboard/Analytics";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "matching", label: "Matching Engine", icon: Search },
  { id: "calculator", label: "ROI Calculator", icon: Calculator },
  { id: "govhub", label: "Gov Hub", icon: FileText },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "matching":
        return <MatchingEngine />;
      case "calculator":
        return <ROICalculator />;
      case "govhub":
        return <GovHub />;
      case "analytics":
        return <Analytics />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-forest-dark border-r border-cream/10 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-cream hover:text-cream/80 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            {sidebarOpen && (
              <span className="font-display text-xl text-cream italic">
                GreenBridge
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-cream/10 text-cream"
                      : "text-cream/60 hover:text-cream hover:bg-cream/5"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-body text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-cream/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cream/60 hover:text-cream hover:bg-cream/5 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-body text-sm">Exit Dashboard</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-forest-dark/50 backdrop-blur-sm border-b border-cream/10 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-cream">
                {navItems.find((item) => item.id === activeTab)?.label}
              </h1>
              <p className="font-body text-sm text-cream/60">
                Partner Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-body text-sm text-cream">Welcome, Partner</p>
                <p className="font-body text-xs text-cream/60">
                  {/* Placeholder for company name */}
                  Your Company
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="font-display text-cream">P</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
