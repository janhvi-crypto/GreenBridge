import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Calculator, 
  FileText, 
  TrendingUp,
  Menu,
  LogOut,
  X,
  ShoppingCart,
  Package,
  Settings,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { Marketplace } from "@/components/dashboard/Marketplace";
import { MatchingEngine } from "@/components/dashboard/MatchingEngine";
import { ROICalculator } from "@/components/dashboard/ROICalculator";
import { OrderManagement } from "@/components/dashboard/OrderManagement";
import { GovHub } from "@/components/dashboard/GovHub";
import { ImpactDashboard } from "@/components/dashboard/ImpactDashboard";
import { AccountSettings } from "@/components/dashboard/AccountSettings";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
  { id: "matching", label: "Matching Engine", icon: Search },
  { id: "calculator", label: "ROI Calculator", icon: Calculator },
  { id: "orders", label: "Order Management", icon: Package },
  { id: "govhub", label: "Gov Collaboration", icon: FileText },
  { id: "impact", label: "Impact Dashboard", icon: BarChart3 },
  { id: "settings", label: "Account & Settings", icon: Settings },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "marketplace":
        return <Marketplace />;
      case "matching":
        return <MatchingEngine />;
      case "calculator":
        return <ROICalculator />;
      case "orders":
        return <OrderManagement />;
      case "govhub":
        return <GovHub />;
      case "impact":
        return <ImpactDashboard />;
      case "settings":
        return <AccountSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${sidebarOpen ? "w-64" : "w-20"} 
          bg-forest-dark border-r border-cream/10 transition-all duration-300 flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="text-cream hover:text-cream/80 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {sidebarOpen && (
              <span className="font-display text-xl text-cream italic">
                GreenBridge
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleTabChange(item.id)}
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
        <header className="bg-forest-dark/50 backdrop-blur-sm border-b border-cream/10 px-4 md:px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-cream hover:text-cream/80 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block">
              <h1 className="font-display text-2xl text-cream">
                {navItems.find((item) => item.id === activeTab)?.label}
              </h1>
              <p className="font-body text-sm text-cream/60">
                Partner Dashboard
              </p>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden">
              <h1 className="font-display text-lg text-cream">
                {navItems.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-body text-sm text-cream">Welcome, Partner</p>
                <p className="font-body text-xs text-cream/60">GreenFurniture Ltd</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="font-display text-cream">G</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
