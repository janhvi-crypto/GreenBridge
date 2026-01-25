import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from "lucide-react";

const monthlyData = [
  { month: "Aug", waste: 180, revenue: 4.5 },
  { month: "Sep", waste: 220, revenue: 5.5 },
  { month: "Oct", waste: 310, revenue: 7.8 },
  { month: "Nov", waste: 280, revenue: 7.0 },
  { month: "Dec", waste: 420, revenue: 10.5 },
  { month: "Jan", waste: 380, revenue: 9.5 },
];

const kpiMetrics = [
  { label: "Waste Processed", value: "1,790 MT", change: "+23%", positive: true },
  { label: "Total Revenue", value: "₹44.8 L", change: "+18%", positive: true },
  { label: "Avg. Match Time", value: "2.3 days", change: "-15%", positive: true },
  { label: "Partner Retention", value: "94%", change: "+2%", positive: true },
];

const categoryBreakdown = [
  { category: "Wood", percentage: 28, color: "bg-amber-500" },
  { category: "Metal", percentage: 22, color: "bg-slate-400" },
  { category: "Plastic", percentage: 18, color: "bg-blue-500" },
  { category: "Textile", percentage: 16, color: "bg-pink-500" },
  { category: "Construction", percentage: 12, color: "bg-yellow-600" },
  { category: "Electronic", percentage: 4, color: "bg-red-500" },
];

export function Analytics() {
  const [animatedValues, setAnimatedValues] = useState(monthlyData.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(monthlyData.map((d) => d.waste));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const maxWaste = Math.max(...monthlyData.map((d) => d.waste));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <div
            key={index}
            className="glass-card p-6 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="font-body text-sm text-cream/60 mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl text-cream">{metric.value}</p>
              <div
                className={`flex items-center gap-1 text-sm ${
                  metric.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl text-cream">Monthly Trend</h3>
            <BarChart3 className="w-5 h-5 text-cream/40" />
          </div>
          <div className="flex items-end justify-between h-48 gap-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-cream/10 rounded-t-lg relative overflow-hidden" style={{ height: "180px" }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-1000 ease-out"
                    style={{
                      height: `${(animatedValues[index] / maxWaste) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-body text-xs text-cream/60">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-cream/10 flex items-center justify-between">
            <span className="font-body text-sm text-cream/60">Waste Processed (MT)</span>
            <span className="font-body text-sm text-green-400">6-month trend</span>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl text-cream">Category Distribution</h3>
            <PieChart className="w-5 h-5 text-cream/40" />
          </div>
          <div className="space-y-4">
            {categoryBreakdown.map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-cream/80">{item.category}</span>
                  <span className="font-body text-sm text-cream">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-cream">Live Platform Activity</h3>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="font-body text-sm text-green-400">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-4xl text-cream mb-2">47</p>
            <p className="font-body text-sm text-cream/60">Active Sessions</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-4xl text-cream mb-2">12</p>
            <p className="font-body text-sm text-cream/60">Pending Matches</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-4xl text-cream mb-2">₹2.1L</p>
            <p className="font-body text-sm text-cream/60">Today's Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
