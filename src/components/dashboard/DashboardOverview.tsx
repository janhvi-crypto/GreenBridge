import { useState, useEffect, useMemo } from "react";
import { TrendingUp, Package, Users, Leaf } from "lucide-react";
import { useActivityLog, useInventory, useBusinessRequests, useOrders } from "@/hooks/useDashboardData";

const MOCK_ACTIVITY = [
  { action: "New match found", detail: "Metal/Steel - 120 MT available", time: "2 hours ago" },
  { action: "Quote approved", detail: "Reclaimed Wood - 50 MT", time: "5 hours ago" },
  { action: "Document submitted", detail: "MoU for Plastic/PET", time: "1 day ago" },
  { action: "Carbon credit issued", detail: "Certificate #2847", time: "2 days ago" },
];

const wasteBreakdown = [
  { type: "Reclaimed Wood", quantity: 650, color: "bg-amber-600" },
  { type: "Metal / Steel", quantity: 520, color: "bg-slate-500" },
  { type: "Plastic / PET", quantity: 380, color: "bg-blue-500" },
  { type: "Construction", quantity: 450, color: "bg-yellow-600" },
  { type: "Textile", quantity: 470, color: "bg-pink-500" },
  { type: "Electronic", quantity: 177, color: "bg-red-500" },
];

function formatTimeAgo(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export function DashboardOverview() {
  const [co2Counter, setCo2Counter] = useState(3416);
  const { data: activity = [] } = useActivityLog(10);
  const { data: inventory = [] } = useInventory(true);
  const { data: requests = [] } = useBusinessRequests(true);
  const { data: orders = [] } = useOrders(true);

  const recentActivity = useMemo(() => {
    const fromDb = activity.map((a) => ({
      action: a.action,
      detail: a.detail ?? "",
      time: formatTimeAgo(a.created_at),
    }));
    return fromDb.length > 0 ? fromDb : MOCK_ACTIVITY;
  }, [activity]);

  const totalWasteFromDb = useMemo(() =>
    inventory.reduce((acc, i) => acc + Number(i.quantity), 0),
  [inventory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Counter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalWaste = wasteBreakdown.reduce((acc, item) => acc + item.quantity, 0);
  const metrics = useMemo(() => [
    { label: "Total Waste Available", value: totalWasteFromDb > 0 ? `${totalWasteFromDb.toLocaleString()} MT` : "2,847 MT", icon: Package, trend: "+12%" },
    { label: "Active Matches", value: String(requests.length > 0 ? requests.length : 24), icon: Users, trend: "+3" },
    { label: "CO₂ Diverted", value: `${co2Counter.toLocaleString()} MT`, icon: Leaf, trend: "+156 MT" },
    { label: "Revenue Generated", value: "₹4.2 Cr", icon: TrendingUp, trend: "+18%" },
  ], [totalWasteFromDb, requests.length, co2Counter]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="glass-card p-6 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-cream" />
              </div>
              <span className="text-xs font-body text-green-400 bg-green-400/10 px-2 py-1 rounded">
                {metric.trend}
              </span>
            </div>
            <p className="font-display text-3xl text-cream mb-1">
              {metric.label === "CO₂ Diverted" ? `${co2Counter.toLocaleString()} MT` : metric.value}
            </p>
            <p className="font-body text-sm text-cream/60">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Breakdown */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">
            Available Materials
          </h3>
          <div className="space-y-4">
            {wasteBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-cream/80">{item.type}</span>
                  <span className="font-body text-sm text-cream">{item.quantity} MT</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(item.quantity / totalWaste) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-cream/10 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 rounded-full bg-cream/40 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-sm text-cream">{activity.action}</p>
                  <p className="font-body text-xs text-cream/60">{activity.detail}</p>
                </div>
                <span className="font-body text-xs text-cream/40">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Your Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: "01", title: "Registered", status: "complete" },
            { step: "02", title: "Requirements Submitted", status: "complete" },
            { step: "03", title: "Matches Found", status: "current" },
            { step: "04", title: "Quote Negotiation", status: "pending" },
            { step: "05", title: "Documentation", status: "pending" },
            { step: "06", title: "Delivery", status: "pending" },
          ].map((item, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg ${
                item.status === "complete"
                  ? "bg-green-500/10 border border-green-500/30"
                  : item.status === "current"
                  ? "bg-cream/10 border border-cream/30"
                  : "bg-cream/5 border border-cream/10"
              }`}
            >
              <span
                className={`font-display text-2xl ${
                  item.status === "complete"
                    ? "text-green-400"
                    : item.status === "current"
                    ? "text-cream"
                    : "text-cream/40"
                }`}
              >
                {item.step}
              </span>
              <p
                className={`font-body text-xs mt-2 ${
                  item.status === "pending" ? "text-cream/40" : "text-cream/80"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
