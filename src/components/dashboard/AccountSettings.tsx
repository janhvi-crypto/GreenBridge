import { useState } from "react";
import { User, Building, CreditCard, Key, Bell, Shield, Save, Eye, EyeOff, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AccountSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "billing" | "api">("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMatches: true,
    priceAlerts: false,
    weeklyReport: true,
  });

  const apiKey = "gb_live_sk_1234567890abcdefghijklmnopqrstuvwxyz";

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleRegenerateKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated. Update your integrations.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Account & Settings</h2>
        <p className="font-body text-sm text-cream/60">Manage your profile, billing, and integrations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream/10 pb-2">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "billing", label: "Billing", icon: CreditCard },
          { id: "api", label: "API Access", icon: Key },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:text-cream hover:bg-cream/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Company Information */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-5 h-5 text-cream" />
              <h3 className="font-display text-xl text-cream">Company Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="info-label block mb-2">Company Name</label>
                <input type="text" defaultValue="GreenFurniture Ltd" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">GST Number</label>
                <input type="text" defaultValue="27AABCU9603R1ZM" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Industry</label>
                <select className="input-elegant-filled w-full">
                  <option className="bg-forest-dark">Furniture Manufacturing</option>
                  <option className="bg-forest-dark">Packaging</option>
                  <option className="bg-forest-dark">Construction</option>
                  <option className="bg-forest-dark">Textile</option>
                  <option className="bg-forest-dark">Electronics</option>
                </select>
              </div>
              <div>
                <label className="info-label block mb-2">Annual CSR Budget</label>
                <input type="text" defaultValue="₹50,00,000" className="input-elegant-filled w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="info-label block mb-2">Business Address</label>
                <textarea 
                  defaultValue="Plot 45, Industrial Area, Phase 2, Faridabad, Haryana - 121004" 
                  className="input-elegant-filled w-full h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-cream" />
              <h3 className="font-display text-xl text-cream">Contact Person</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="info-label block mb-2">Full Name</label>
                <input type="text" defaultValue="Rahul Sharma" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Designation</label>
                <input type="text" defaultValue="Procurement Manager" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Email</label>
                <input type="email" defaultValue="rahul.sharma@greenfurniture.in" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Phone</label>
                <input type="tel" defaultValue="+91 98765 43210" className="input-elegant-filled w-full" />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-cream" />
              <h3 className="font-display text-xl text-cream">Notification Preferences</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: "orderUpdates", label: "Order status updates", desc: "Get notified when your orders are processed, shipped, or delivered" },
                { key: "newMatches", label: "New material matches", desc: "Receive alerts when new materials matching your preferences are available" },
                { key: "priceAlerts", label: "Price drop alerts", desc: "Get notified when prices drop on materials you've viewed" },
                { key: "weeklyReport", label: "Weekly impact report", desc: "Receive a summary of your environmental impact every week" },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4 p-4 bg-cream/5 rounded-lg">
                  <div>
                    <p className="font-body text-cream">{item.label}</p>
                    <p className="font-body text-sm text-cream/60">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-cream/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSaveProfile} className="btn-elegant flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6">Current Plan</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-cream/5 rounded-lg">
              <div>
                <p className="font-display text-lg text-cream">Mid-Cap Partner</p>
                <p className="font-body text-sm text-cream/60">₹1,900/MT • 10% discount on bulk orders</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 w-fit">Active</span>
            </div>
            <button className="btn-outline-elegant mt-4">Upgrade Plan</button>
          </div>

          {/* Billing Address */}
          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="info-label block mb-2">Street Address</label>
                <input type="text" defaultValue="Plot 45, Industrial Area, Phase 2" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">City</label>
                <input type="text" defaultValue="Faridabad" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">State</label>
                <input type="text" defaultValue="Haryana" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">PIN Code</label>
                <input type="text" defaultValue="121004" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Country</label>
                <input type="text" defaultValue="India" className="input-elegant-filled w-full" />
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cream/10">
                    <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Date</th>
                    <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Description</th>
                    <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Amount</th>
                    <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "Jan 20, 2026", desc: "Order ORD-2026-001", amount: "₹13,50,000", status: "paid" },
                    { date: "Jan 05, 2026", desc: "Order ORD-2025-089", amount: "₹9,00,000", status: "paid" },
                    { date: "Dec 15, 2025", desc: "Order ORD-2025-078", amount: "₹20,00,000", status: "paid" },
                  ].map((tx, index) => (
                    <tr key={index} className="border-b border-cream/5">
                      <td className="p-4 font-body text-sm text-cream/60">{tx.date}</td>
                      <td className="p-4 font-body text-sm text-cream">{tx.desc}</td>
                      <td className="p-4 font-display text-sm text-cream">{tx.amount}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 capitalize">{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === "api" && (
        <div className="space-y-6">
          {/* API Key */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-5 h-5 text-cream" />
              <h3 className="font-display text-xl text-cream">API Keys</h3>
            </div>
            <p className="font-body text-cream/60 mb-4">
              Use your API key to integrate GreenBridge data with your ERP or other systems.
            </p>
            <div className="p-4 bg-cream/5 rounded-lg mb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-body text-xs text-cream/60 mb-1">Live API Key</p>
                  <code className="font-mono text-sm text-cream">
                    {showApiKey ? apiKey : "gb_live_sk_••••••••••••••••••••••••••••••••"}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 rounded-lg hover:bg-cream/10 transition-colors"
                    title={showApiKey ? "Hide" : "Show"}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4 text-cream/60" /> : <Eye className="w-4 h-4 text-cream/60" />}
                  </button>
                  <button
                    onClick={handleCopyApiKey}
                    className="p-2 rounded-lg hover:bg-cream/10 transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4 text-cream/60" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleRegenerateKey} className="btn-outline-elegant">
                Regenerate Key
              </button>
            </div>
          </div>

          {/* API Documentation */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-cream" />
              <h3 className="font-display text-xl text-cream">Integration Guide</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-cream/5 rounded-lg">
                <p className="font-body text-cream mb-2">Base URL</p>
                <code className="font-mono text-sm text-cream/60">https://api.greenbridge.in/v1</code>
              </div>
              <div className="p-4 bg-cream/5 rounded-lg">
                <p className="font-body text-cream mb-2">Authentication</p>
                <code className="font-mono text-sm text-cream/60">Authorization: Bearer YOUR_API_KEY</code>
              </div>
              <div className="p-4 bg-cream/5 rounded-lg">
                <p className="font-body text-cream mb-2">Available Endpoints</p>
                <ul className="space-y-1 font-mono text-sm text-cream/60">
                  <li>GET /marketplace - List available materials</li>
                  <li>GET /orders - List your orders</li>
                  <li>POST /orders - Create new order</li>
                  <li>GET /impact - Get impact metrics</li>
                  <li>GET /carbon-credits - List carbon certificates</li>
                </ul>
              </div>
            </div>
            <button className="btn-elegant mt-4">View Full Documentation</button>
          </div>
        </div>
      )}
    </div>
  );
}
