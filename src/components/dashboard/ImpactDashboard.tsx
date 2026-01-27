import { useState } from "react";
import { Leaf, TrendingUp, Award, FileText, Download, DollarSign, Trees, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

const carbonData = [
  { month: "Aug", earned: 120, sold: 80 },
  { month: "Sep", earned: 145, sold: 100 },
  { month: "Oct", earned: 180, sold: 130 },
  { month: "Nov", earned: 210, sold: 160 },
  { month: "Dec", earned: 250, sold: 180 },
  { month: "Jan", earned: 300, sold: 220 },
];

const revenueData = [
  { month: "Aug", materials: 850000, credits: 60000 },
  { month: "Sep", materials: 920000, credits: 75000 },
  { month: "Oct", materials: 1100000, credits: 97500 },
  { month: "Nov", materials: 1250000, credits: 120000 },
  { month: "Dec", materials: 1400000, credits: 135000 },
  { month: "Jan", materials: 1650000, credits: 165000 },
];

const certificates = [
  { id: "CC-2026-001", date: "Jan 20, 2026", amount: "90 MT CO₂e", value: "₹6,750", status: "active" },
  { id: "CC-2026-002", date: "Dec 15, 2025", amount: "75 MT CO₂e", value: "₹5,625", status: "sold" },
  { id: "CC-2025-089", date: "Nov 28, 2025", amount: "120 MT CO₂e", value: "₹9,000", status: "active" },
  { id: "CC-2025-078", date: "Nov 10, 2025", amount: "60 MT CO₂e", value: "₹4,500", status: "used" },
];

export function ImpactDashboard() {
  const { toast } = useToast();
  const [showESGModal, setShowESGModal] = useState(false);

  const handleDownloadCertificate = (certId: string) => {
    toast({
      title: "Certificate Downloaded",
      description: `Carbon credit certificate ${certId} has been downloaded.`,
    });
  };

  const handleGenerateESGReport = () => {
    setShowESGModal(false);
    toast({
      title: "ESG Report Generated",
      description: "Your investor-ready ESG report is being prepared.",
    });
  };

  const handleSellCredits = (certId: string) => {
    toast({
      title: "Credits Listed",
      description: `Carbon credits ${certId} have been listed on the market.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cream">Impact Dashboard</h2>
          <p className="font-body text-sm text-cream/60">Track your environmental and financial impact</p>
        </div>
        <button onClick={() => setShowESGModal(true)} className="btn-elegant flex items-center gap-2 w-fit">
          <FileText className="w-4 h-4" />
          Generate ESG Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <p className="font-body text-xs text-cream/60">Carbon Credits</p>
          </div>
          <p className="font-display text-2xl text-cream">1,250 MT</p>
          <p className="font-body text-xs text-green-400">CO₂e saved</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <p className="font-body text-xs text-cream/60">Credit Value</p>
          </div>
          <p className="font-display text-2xl text-cream">₹93,750</p>
          <p className="font-body text-xs text-cream/60">@ ₹75/MT CO₂e</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Trees className="w-5 h-5 text-amber-400" />
            </div>
            <p className="font-body text-xs text-cream/60">Trees Equivalent</p>
          </div>
          <p className="font-display text-2xl text-cream">15,625</p>
          <p className="font-body text-xs text-cream/60">trees planted</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <p className="font-body text-xs text-cream/60">ESG Score</p>
          </div>
          <p className="font-display text-2xl text-cream">+12 pts</p>
          <p className="font-body text-xs text-green-400">improvement</p>
        </div>
      </div>

      {/* CSR Impact Narrative */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-4">Your Impact Story</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-3xl text-green-400 mb-2">2.5 acres</p>
            <p className="font-body text-sm text-cream/80">Landfill land recovered</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-3xl text-blue-400 mb-2">45 jobs</p>
            <p className="font-body text-sm text-cream/80">Indirect employment created</p>
          </div>
          <div className="text-center p-4 bg-cream/5 rounded-lg">
            <p className="font-display text-3xl text-amber-400 mb-2">₹12L</p>
            <p className="font-body text-sm text-cream/80">Government cost saved</p>
          </div>
        </div>
        <p className="font-body text-cream/60 mt-6 italic">
          "Your company has transformed 1,250 MT of landfill waste into valuable products, 
          equivalent to taking 270 cars off the road for a year. This contribution has directly 
          recovered 2.5 acres of previously unusable landfill land and supported 45 families 
          through indirect employment in waste processing and logistics."
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Credits Chart */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Carbon Credits Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonData}>
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
                />
                <Legend />
                <Bar dataKey="earned" fill="hsl(145, 50%, 40%)" name="Earned" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sold" fill="hsl(200, 50%, 50%)" name="Sold/Used" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Tracking */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Revenue Tracking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
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
                  formatter={(value: number) => [`₹${(value/100000).toFixed(1)}L`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="materials" stroke="hsl(45, 70%, 55%)" strokeWidth={2} name="Product Revenue" dot={{ fill: 'hsl(45, 70%, 55%)' }} />
                <Line type="monotone" dataKey="credits" stroke="hsl(145, 50%, 40%)" strokeWidth={2} name="Carbon Credits" dot={{ fill: 'hsl(145, 50%, 40%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Carbon Certificates */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Carbon Credit Certificates</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/10">
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Certificate ID</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Date</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Amount</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Value</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Status</th>
                <th className="text-right p-4 font-body text-xs uppercase tracking-wider text-cream/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-b border-cream/5 hover:bg-cream/5 transition-colors">
                  <td className="p-4 font-body text-sm text-cream">{cert.id}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{cert.date}</td>
                  <td className="p-4 font-display text-sm text-green-400">{cert.amount}</td>
                  <td className="p-4 font-display text-sm text-cream">{cert.value}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-body capitalize ${
                      cert.status === "active" ? "bg-green-500/20 text-green-400" :
                      cert.status === "sold" ? "bg-blue-500/20 text-blue-400" :
                      "bg-cream/10 text-cream/60"
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadCertificate(cert.id)}
                        className="p-2 rounded-lg hover:bg-cream/10 transition-colors"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4 text-cream/60 hover:text-cream" />
                      </button>
                      {cert.status === "active" && (
                        <button
                          onClick={() => handleSellCredits(cert.id)}
                          className="btn-outline-elegant text-xs py-1 px-3"
                        >
                          Sell
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ESG Report Modal */}
      {showESGModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-lg w-full animate-scale-in">
            <h3 className="font-display text-2xl text-cream mb-4">Generate ESG Report</h3>
            <p className="font-body text-cream/60 mb-6">
              Create an investor-ready ESG impact report showcasing your company's environmental contributions.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="info-label block mb-2">Report Period</label>
                <select className="input-elegant-filled w-full">
                  <option className="bg-forest-dark">Last 6 months</option>
                  <option className="bg-forest-dark">Last 12 months</option>
                  <option className="bg-forest-dark">Year to Date</option>
                  <option className="bg-forest-dark">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="info-label block mb-2">Include Sections</label>
                <div className="space-y-2">
                  {["Carbon Credits Summary", "Environmental Impact", "Financial Metrics", "SDG Alignment", "Future Projections"].map((section) => (
                    <label key={section} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-cream/20" />
                      <span className="font-body text-sm text-cream/80">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowESGModal(false)} className="btn-outline-elegant flex-1">
                Cancel
              </button>
              <button onClick={handleGenerateESGReport} className="btn-elegant flex-1">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
