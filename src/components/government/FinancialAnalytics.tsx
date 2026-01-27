import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Leaf, Package, Truck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from "recharts";

const revenueData = [
  { month: "Jul", revenue: 3200000, costSavings: 2800000, processing: 400000 },
  { month: "Aug", revenue: 3800000, costSavings: 3200000, processing: 450000 },
  { month: "Sep", revenue: 4500000, costSavings: 3900000, processing: 520000 },
  { month: "Oct", revenue: 4200000, costSavings: 3600000, processing: 480000 },
  { month: "Nov", revenue: 5100000, costSavings: 4400000, processing: 580000 },
  { month: "Dec", revenue: 5800000, costSavings: 5000000, processing: 620000 },
];

const diversionData = [
  { month: "Jul", diverted: 1200, total: 1800, target: 1500 },
  { month: "Aug", diverted: 1450, total: 2000, target: 1600 },
  { month: "Sep", diverted: 1680, total: 2200, target: 1700 },
  { month: "Oct", diverted: 1520, total: 2100, target: 1800 },
  { month: "Nov", diverted: 1890, total: 2400, target: 1900 },
  { month: "Dec", diverted: 2100, total: 2600, target: 2000 },
];

const costPerMT = [
  { month: "Jul", traditional: 800, withGreenBridge: 520 },
  { month: "Aug", traditional: 800, withGreenBridge: 480 },
  { month: "Sep", traditional: 800, withGreenBridge: 450 },
  { month: "Oct", traditional: 800, withGreenBridge: 420 },
  { month: "Nov", traditional: 800, withGreenBridge: 400 },
  { month: "Dec", traditional: 800, withGreenBridge: 380 },
];

const co2Impact = [
  { month: "Jul", avoided: 1440, methane: 360 },
  { month: "Aug", avoided: 1740, methane: 435 },
  { month: "Sep", avoided: 2016, methane: 504 },
  { month: "Oct", avoided: 1824, methane: 456 },
  { month: "Nov", avoided: 2268, methane: 567 },
  { month: "Dec", avoided: 2520, methane: 630 },
];

export function FinancialAnalytics() {
  const [period, setPeriod] = useState<"6m" | "12m" | "ytd">("6m");

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cream">Financial & Analytics</h2>
          <p className="font-body text-sm text-cream/60">Revenue, cost savings, and environmental impact</p>
        </div>
        <div className="flex gap-2">
          {[
            { id: "6m", label: "6 Months" },
            { id: "12m", label: "12 Months" },
            { id: "ytd", label: "YTD" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id as typeof period)}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-colors ${
                period === p.id
                  ? "bg-cream/10 text-cream"
                  : "text-cream/60 hover:text-cream hover:bg-cream/5"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-body text-xs">+24%</span>
            </div>
          </div>
          <p className="font-display text-2xl text-cream">₹2.66 Cr</p>
          <p className="font-body text-xs text-cream/60">Total Revenue (6M)</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-body text-xs">-52%</span>
            </div>
          </div>
          <p className="font-display text-2xl text-cream">₹380/MT</p>
          <p className="font-body text-xs text-cream/60">Cost per MT</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-body text-xs">+18%</span>
            </div>
          </div>
          <p className="font-display text-2xl text-cream">9,840 MT</p>
          <p className="font-body text-xs text-cream/60">Waste Diverted</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-body text-xs">+22%</span>
            </div>
          </div>
          <p className="font-display text-2xl text-cream">11,808 MT</p>
          <p className="font-body text-xs text-cream/60">CO₂ Avoided</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Dashboard */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Revenue & Savings</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 220, 200, 0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <YAxis tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(145, 35%, 12%)', 
                    border: '1px solid rgba(230, 220, 200, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(45, 30%, 92%)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(145, 50%, 40%)" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costSavings" fill="hsl(200, 50%, 50%)" name="Cost Savings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diversion Metrics */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Diversion Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 220, 200, 0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <YAxis tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(145, 35%, 12%)', 
                    border: '1px solid rgba(230, 220, 200, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(45, 30%, 92%)'
                  }}
                  formatter={(value: number) => [`${value} MT`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="hsl(45, 70%, 55%)" strokeWidth={2} name="Total Received" dot={{ fill: 'hsl(45, 70%, 55%)' }} />
                <Line type="monotone" dataKey="diverted" stroke="hsl(145, 50%, 40%)" strokeWidth={2} name="Diverted" dot={{ fill: 'hsl(145, 50%, 40%)' }} />
                <Line type="monotone" dataKey="target" stroke="hsl(280, 50%, 55%)" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost per MT */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Cost per MT Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costPerMT}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 220, 200, 0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <YAxis tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(145, 35%, 12%)', 
                    border: '1px solid rgba(230, 220, 200, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(45, 30%, 92%)'
                  }}
                  formatter={(value: number) => [`₹${value}/MT`, '']}
                />
                <Legend />
                <Area type="monotone" dataKey="traditional" stroke="hsl(0, 50%, 50%)" fill="hsl(0, 50%, 50%)" fillOpacity={0.2} name="Traditional (Landfill)" />
                <Area type="monotone" dataKey="withGreenBridge" stroke="hsl(145, 50%, 40%)" fill="hsl(145, 50%, 40%)" fillOpacity={0.3} name="With GreenBridge" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="font-body text-sm text-green-400">
              52% cost reduction achieved: ₹800/MT → ₹380/MT
            </p>
          </div>
        </div>

        {/* CO₂ Impact */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">CO₂ Impact</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2Impact}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 220, 200, 0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <YAxis tick={{ fill: 'hsl(45, 20%, 70%)', fontSize: 12 }} axisLine={{ stroke: 'rgba(230, 220, 200, 0.2)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(145, 35%, 12%)', 
                    border: '1px solid rgba(230, 220, 200, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(45, 30%, 92%)'
                  }}
                  formatter={(value: number) => [`${value} MT CO₂e`, '']}
                />
                <Legend />
                <Area type="monotone" dataKey="avoided" stroke="hsl(145, 50%, 40%)" fill="hsl(145, 50%, 40%)" fillOpacity={0.3} name="CO₂ Avoided" />
                <Area type="monotone" dataKey="methane" stroke="hsl(280, 50%, 55%)" fill="hsl(280, 50%, 55%)" fillOpacity={0.3} name="Methane Reduced" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Ministry Report Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-2xl text-cream mb-1">₹2.29 Cr</p>
            <p className="font-body text-sm text-cream/60">Net Cost Savings</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-2xl text-cream mb-1">78%</p>
            <p className="font-body text-sm text-cream/60">Diversion Rate</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-2xl text-cream mb-1">156</p>
            <p className="font-body text-sm text-cream/60">Active Partners</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-2xl text-cream mb-1">2,560 cars</p>
            <p className="font-body text-sm text-cream/60">Off Road Equivalent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
