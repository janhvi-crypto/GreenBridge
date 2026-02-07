import { useState } from "react";
import { useEffect } from "react";



import { supabase } from "@/lib/supabase";
import { ensureGovernmentProfile } from "@/lib/dashboard-api";

import { 
  LayoutDashboard, 
  Package, 
  Users,
  DollarSign,
  FileCheck, 
  ClipboardCheck,
  FileText,
  Menu,
  LogOut,
  X,
  Landmark
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GovOverview } from "@/components/government/GovOverview";
import { InventoryManagement } from "@/components/government/InventoryManagement";
import { CompanyRequests } from "@/components/government/CompanyRequests";
import { FinancialAnalytics } from "@/components/government/FinancialAnalytics";
import { ApprovalWorkflows } from "@/components/government/ApprovalWorkflows";
import { ComplianceAudits } from "@/components/government/ComplianceAudits";
import { ReportsExport } from "@/components/government/ReportsExport";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inventory", label: "Inventory Management", icon: Package },
  { id: "requests", label: "Company Requests", icon: Users },
  { id: "financial", label: "Financial & Analytics", icon: DollarSign },
  { id: "approvals", label: "Approval Workflows", icon: FileCheck },
  { id: "compliance", label: "Compliance & Audits", icon: ClipboardCheck },
  { id: "reports", label: "Reports & Export", icon: FileText },
];

export default function GovernmentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/login");
        return;
      }

      const role = (data.user.user_metadata?.role ?? data.user.app_metadata?.role) as string | undefined;
      if (role !== "government") {
        navigate("/login");
        return;
      }
      // Ensure profile has role so RLS policies (user_role() = 'government') allow approve/orders
      try {
        await ensureGovernmentProfile();
      } catch {
        // Profiles table may be missing or RLS may block; rely on user_metadata.role
      }
    };

    checkAccess();
  }, [navigate]);
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <GovOverview />;
      case "inventory":
        return <InventoryManagement />;
      case "requests":
        return <CompanyRequests />;
      case "financial":
        return <FinancialAnalytics />;
      case "approvals":
        return <ApprovalWorkflows />;
      case "compliance":
        return <ComplianceAudits />;
      case "reports":
        return <ReportsExport />;
      default:
        return <GovOverview />;
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
          <ul className="space-y-1">
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
                Government Dashboard
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
                <p className="font-body text-sm text-cream">Government Portal</p>
                <p className="font-body text-xs text-cream/60">
                  Delhi Municipal Corporation
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-cream" />
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
