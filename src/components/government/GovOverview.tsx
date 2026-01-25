import { useState, useEffect } from "react";
import { Package, FileCheck, AlertTriangle, TrendingUp, Clock, Users } from "lucide-react";

const metrics = [
  { label: "Total Inventory", value: "12,450", unit: "MT", icon: Package, trend: "+8.2%" },
  { label: "Pending Approvals", value: "24", unit: "", icon: FileCheck, trend: "12 new" },
  { label: "Compliance Rate", value: "94.7", unit: "%", icon: AlertTriangle, trend: "+2.1%" },
  { label: "Active Partners", value: "156", unit: "", icon: Users, trend: "+18" },
];

const recentActivity = [
  { time: "2 hours ago", action: "New collaboration request from EcoTech Industries", status: "pending" },
  { time: "5 hours ago", action: "Inventory update: 500 MT textile waste added", status: "completed" },
  { time: "1 day ago", action: "Compliance report submitted for Q4", status: "completed" },
  { time: "2 days ago", action: "Partnership approved: GreenCycle Corp", status: "approved" },
  { time: "3 days ago", action: "Revision requested for waste classification", status: "revision" },
];

export function GovOverview() {
  const [counter, setCounter] = useState(12450);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cream/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="relative">
          <p className="section-subtitle">Government Portal</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="font-body text-cream/70 max-w-2xl">
            Manage landfill inventory, review partnership requests, and track environmental compliance 
            from your centralized government portal.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-cream" />
              </div>
              <span className="font-body text-xs text-success px-2 py-1 rounded-full bg-success/20">
                {metric.trend}
              </span>
            </div>
            <p className="font-display text-3xl text-cream mb-1">
              {metric.label === "Total Inventory" ? counter.toLocaleString() : metric.value}
              <span className="text-lg text-cream/60">{metric.unit}</span>
            </p>
            <p className="font-body text-sm text-cream/60">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-4 p-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-cream" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-cream">Update Inventory</p>
                <p className="font-body text-xs text-cream/60">Add new waste entries</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-cream" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-cream">Review Requests</p>
                <p className="font-body text-xs text-cream/60">24 pending approvals</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cream" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-cream">Generate Report</p>
                <p className="font-body text-xs text-cream/60">Export analytics data</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-cream/10 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-cream/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-cream line-clamp-2">{activity.action}</p>
                  <p className="font-body text-xs text-cream/60 mt-1">{activity.time}</p>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-body flex-shrink-0
                  ${activity.status === "pending" ? "badge-pending" : ""}
                  ${activity.status === "completed" ? "badge-approved" : ""}
                  ${activity.status === "approved" ? "badge-approved" : ""}
                  ${activity.status === "revision" ? "badge-revision" : ""}
                `}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
