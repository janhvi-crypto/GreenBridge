import { useState } from "react";
import { User, Building2, CreditCard, Key, Bell, Shield } from "lucide-react";

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "billing" | "api" | "notifications">("profile");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream/10 pb-4 overflow-x-auto">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "billing", label: "Billing", icon: CreditCard },
          { id: "api", label: "API Access", icon: Key },
          { id: "notifications", label: "Notifications", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 font-body text-sm rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:text-cream"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
              <User className="w-5 h-5" /> Company Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="info-label block mb-2">Company Name</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  defaultValue="Your Company Name"
                />
              </div>
              <div>
                <label className="info-label block mb-2">GST Number</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  defaultValue="29ABCDE1234F1Z5"
                />
              </div>
              <div>
                <label className="info-label block mb-2">PAN Number</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  defaultValue="ABCDE1234F"
                />
              </div>
              <div>
                <label className="info-label block mb-2">Industry</label>
                <select className="input-elegant-filled">
                  <option>Furniture Manufacturing</option>
                  <option>Construction</option>
                  <option>Textile</option>
                  <option>Packaging</option>
                  <option>Electronics</option>
                </select>
              </div>
              <button className="btn-elegant mt-4">Save Changes</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5" /> Contact Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="info-label block mb-2">Contact Person</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="info-label block mb-2">Email</label>
                <input
                  type="email"
                  className="input-elegant-filled"
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <label className="info-label block mb-2">Phone</label>
                <input
                  type="tel"
                  className="input-elegant-filled"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="info-label block mb-2">Warehouse Address</label>
                <textarea
                  className="input-elegant-filled"
                  rows={3}
                  placeholder="Full address for deliveries"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Methods
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-body text-sm text-cream">**** **** **** 4242</p>
                    <p className="font-body text-xs text-cream/60">Expires 12/27</p>
                  </div>
                </div>
                <span className="badge-approved">Default</span>
              </div>
              <button className="btn-outline-elegant w-full">+ Add Payment Method</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display text-xl text-cream mb-6">Billing History</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-cream/10">
                  <th className="pb-4 font-body text-xs text-cream/60 uppercase">Invoice</th>
                  <th className="pb-4 font-body text-xs text-cream/60 uppercase">Date</th>
                  <th className="pb-4 font-body text-xs text-cream/60 uppercase">Amount</th>
                  <th className="pb-4 font-body text-xs text-cream/60 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "INV-2847", date: "Jan 28, 2026", amount: "₹13.5L", status: "paid" },
                  { id: "INV-2835", date: "Jan 15, 2026", amount: "₹9.0L", status: "paid" },
                  { id: "INV-2820", date: "Dec 28, 2025", amount: "₹18.0L", status: "paid" },
                ].map((invoice) => (
                  <tr key={invoice.id} className="border-b border-cream/10">
                    <td className="py-4 font-body text-sm text-cream">{invoice.id}</td>
                    <td className="py-4 font-body text-sm text-cream/60">{invoice.date}</td>
                    <td className="py-4 font-display text-cream">{invoice.amount}</td>
                    <td className="py-4">
                      <span className="badge-approved">Paid</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === "api" && (
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
            <Key className="w-5 h-5" /> API Access
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-cream/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-cream">API Key</span>
                <button className="font-body text-xs text-cream/60 hover:text-cream">Regenerate</button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  className="input-elegant-filled flex-1"
                  value="gb_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                  readOnly
                />
                <button className="btn-outline-elegant px-4">Copy</button>
              </div>
            </div>

            <div>
              <h4 className="font-body text-sm text-cream mb-4">Available Endpoints</h4>
              <div className="space-y-2">
                {[
                  { method: "GET", endpoint: "/api/v1/inventory", desc: "List available materials" },
                  { method: "POST", endpoint: "/api/v1/orders", desc: "Create new order" },
                  { method: "GET", endpoint: "/api/v1/orders/:id", desc: "Get order status" },
                  { method: "GET", endpoint: "/api/v1/carbon-credits", desc: "View carbon credits" },
                ].map((api, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-cream/5 rounded-lg">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      api.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {api.method}
                    </span>
                    <span className="font-mono text-sm text-cream">{api.endpoint}</span>
                    <span className="font-body text-xs text-cream/60 ml-auto">{api.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notification Preferences
          </h3>
          <div className="space-y-4">
            {[
              { label: "Order status updates", desc: "Get notified when order status changes", enabled: true },
              { label: "New material alerts", desc: "Alerts when matching materials are available", enabled: true },
              { label: "Price drop notifications", desc: "Notify when material prices decrease", enabled: false },
              { label: "Carbon credit updates", desc: "Monthly carbon credit summary", enabled: true },
              { label: "Marketing emails", desc: "News and promotional content", enabled: false },
            ].map((pref, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-cream/5 rounded-lg">
                <div>
                  <p className="font-body text-sm text-cream">{pref.label}</p>
                  <p className="font-body text-xs text-cream/60">{pref.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-cream/20 peer-checked:bg-green-500 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-cream after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
