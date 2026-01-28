import { useState } from "react";
import { DollarSign, TrendingDown, Leaf, BarChart3, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Sep", revenue: 35, savings: 28 },
  { month: "Oct", revenue: 42, savings: 32 },
  { month: "Nov", revenue: 38, savings: 30 },
  { month: "Dec", revenue: 55, savings: 45 },
  { month: "Jan", revenue: 65, savings: 52 },
  { month: "Feb", revenue: 72, savings: 58 },
];

const diversionData = [
  { month: "Sep", diverted: 320 },
  { month: "Oct", diverted: 410 },
  { month: "Nov", diverted: 380 },
  { month: "Dec", diverted: 520 },
  { month: "Jan", diverted: 580 },
  { month: "Feb", diverted: 640 },
];

const categoryDiversion = [
  { name: "Wood", value: 25 },
  { name: "Metal", value: 20 },
  { name: "Plastic", value: 18 },
  { name: "Construction", value: 22 },
  { name: "Textile", value: 10 },
  { name: "Electronics", value: 5 },
];

const COLORS = ["#D97706", "#6B7280", "#3B82F6", "#CA8A04", "#EC4899", "#EF4444"];

export function FinancialAnalytics() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs font-body text-green-400 bg-green-400/10 px-2 py-1 rounded">+18%</span>
          </div>
          <p className="font-display text-3xl text-cream mb-1">₹1.4 Cr</p>
          <p className="font-body text-sm text-cream/60">Revenue Generated</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-xs font-body text-green-400 bg-green-400/10 px-2 py-1 rounded">-50%</span>
          </div>
          <p className="font-display text-3xl text-cream mb-1">₹400</p>
          <p className="font-body text-sm text-cream/60">Cost Per MT (vs ₹800)</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="font-display text-3xl text-cream mb-1">2,850 MT</p>
          <p className="font-body text-sm text-cream/60">Waste Diverted (YTD)</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="font-display text-3xl text-cream mb-1">3,420 MT</p>
          <p className="font-body text-sm text-cream/60">CO₂ Avoided</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue & Savings */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl text-cream">Revenue & Savings</h3>
            <button className="btn-outline-elegant text-xs px-3 py-1">
              <Download className="w-3 h-3 mr-1" /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(145, 35%, 12%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`₹${value}L`, ""]}
              />
              <Bar dataKey="revenue" fill="hsl(145, 50%, 35%)" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="hsl(45, 80%, 50%)" name="Savings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-body text-xs text-cream/60">Revenue (₹L)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-body text-xs text-cream/60">Savings (₹L)</span>
            </div>
          </div>
        </div>

        {/* Diversion Trend */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Diversion Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={diversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(145, 35%, 12%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} MT`, "Diverted"]}
              />
              <Line
                type="monotone"
                dataKey="diverted"
                stroke="hsl(200, 60%, 50%)"
                strokeWidth={3}
                dot={{ fill: "hsl(200, 60%, 50%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution & Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Diversion by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryDiversion}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryDiversion.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(145, 35%, 12%)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {categoryDiversion.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="font-body text-xs text-cream/80">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Cost Analysis</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-cream/60">Previous Cost (Landfill Only)</span>
                <span className="font-display text-xl text-red-400">₹800/MT</span>
              </div>
              <div className="h-3 bg-red-500/20 rounded-full">
                <div className="h-full w-full bg-red-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-cream/60">Current Cost (With Diversion)</span>
                <span className="font-display text-xl text-green-400">₹400/MT</span>
              </div>
              <div className="h-3 bg-green-500/20 rounded-full">
                <div className="h-full w-1/2 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="pt-4 border-t border-cream/10">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-cream">Savings Per MT</span>
                <span className="font-display text-2xl text-cream">₹400 (50%)</span>
              </div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg">
              <p className="font-body text-sm text-cream/80">
                Total Savings This Year: <span className="font-display text-xl text-cream">₹1.14 Cr</span>
              </p>
              <p className="font-body text-xs text-cream/60 mt-1">Based on 2,850 MT diverted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
