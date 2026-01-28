import { useState } from "react";
import { Leaf, DollarSign, Award, FileText, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const carbonData = [
  { month: "Sep", credits: 85 },
  { month: "Oct", credits: 120 },
  { month: "Nov", credits: 95 },
  { month: "Dec", credits: 150 },
  { month: "Jan", credits: 180 },
  { month: "Feb", credits: 200 },
];

const impactBreakdown = [
  { name: "Landfill Diversion", value: 40 },
  { name: "Manufacturing Offset", value: 30 },
  { name: "Transport Savings", value: 20 },
  { name: "Processing Efficiency", value: 10 },
];

const COLORS = ["hsl(145, 50%, 35%)", "hsl(45, 80%, 50%)", "hsl(200, 60%, 50%)", "hsl(280, 50%, 50%)"];

const csrMetrics = [
  { label: "Landfill Acres Recovered", value: "2.5", unit: "acres" },
  { label: "Jobs Created (Indirect)", value: "45", unit: "jobs" },
  { label: "Government Cost Saved", value: "₹12L", unit: "" },
  { label: "Families Benefited", value: "120", unit: "families" },
];

export function ImpactDashboard() {
  const [totalCredits] = useState(1250);
  const creditValue = totalCredits * 7.5;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Carbon Credits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <span className="badge-approved">Verified</span>
          </div>
          <p className="font-display text-4xl text-cream mb-1">{totalCredits.toLocaleString()} MT</p>
          <p className="font-body text-sm text-cream/60">Total CO₂e Credits Earned</p>
          <div className="mt-4 pt-4 border-t border-cream/10">
            <p className="font-body text-xs text-cream/60">Market Value</p>
            <p className="font-display text-2xl text-cream">₹{creditValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="font-display text-3xl text-cream mb-1">₹85L</p>
          <p className="font-body text-sm text-cream/60">Product Revenue</p>
          <p className="font-body text-xs text-green-400 mt-2">+18% vs last quarter</p>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <p className="font-display text-3xl text-cream mb-1">+7</p>
          <p className="font-body text-sm text-cream/60">ESG Score Impact</p>
          <p className="font-body text-xs text-cream/40 mt-2">Points improvement</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carbon Credits Over Time */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Carbon Credits Earned</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(145, 35%, 12%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(45, 30%, 92%)" }}
              />
              <Bar dataKey="credits" fill="hsl(145, 50%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Breakdown */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Impact Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={impactBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(145, 35%, 12%)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {impactBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="font-body text-xs text-cream/80">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSR Impact Metrics */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-cream">CSR Impact Metrics</h3>
          <Award className="w-6 h-6 text-cream/60" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {csrMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-cream/5 rounded-lg">
              <p className="font-display text-3xl text-cream">{metric.value}</p>
              <p className="font-body text-xs text-cream/60 mt-1">{metric.unit}</p>
              <p className="font-body text-xs text-cream/40 mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ESG Report Generator */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-cream" />
            </div>
            <div>
              <h3 className="font-display text-xl text-cream">ESG Report Generator</h3>
              <p className="font-body text-sm text-cream/60">
                Auto-generate investor-ready sustainability reports
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline-elegant">
              <Download className="w-4 h-4 mr-2" /> Download Certificate
            </button>
            <button className="btn-elegant">
              Generate ESG Report
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-cream/5 rounded-lg">
          <p className="font-body text-sm text-cream/80 italic">
            "Your company recovered 2.5 acres of landfill land, creating 45 indirect jobs and saving 
            ₹12L in government waste management costs. Total CO₂ offset: 1,250 MT CO₂e, equivalent 
            to 270 cars off the road for one year."
          </p>
          <p className="font-body text-xs text-cream/40 mt-2">— Auto-generated narrative for investors</p>
        </div>
      </div>
    </div>
  );
}
