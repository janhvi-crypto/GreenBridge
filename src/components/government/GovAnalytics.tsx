import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jul", processed: 1200, received: 1400, diverted: 1100 },
  { month: "Aug", processed: 1350, received: 1550, diverted: 1250 },
  { month: "Sep", processed: 1500, received: 1700, diverted: 1400 },
  { month: "Oct", processed: 1420, received: 1600, diverted: 1320 },
  { month: "Nov", processed: 1650, received: 1800, diverted: 1550 },
  { month: "Dec", processed: 1800, received: 2000, diverted: 1700 },
];

const categoryDistribution = [
  { name: "Textile", value: 25, color: "hsl(145, 50%, 40%)" },
  { name: "Plastic", value: 20, color: "hsl(45, 80%, 55%)" },
  { name: "Metal", value: 30, color: "hsl(200, 50%, 50%)" },
  { name: "E-Waste", value: 10, color: "hsl(280, 50%, 55%)" },
  { name: "Construction", value: 15, color: "hsl(20, 60%, 55%)" },
];

const partnerPerformance = [
  { name: "EcoTech", compliance: 98, volume: 450, rating: 4.8 },
  { name: "GreenCycle", compliance: 95, volume: 380, rating: 4.6 },
  { name: "MetalWorks", compliance: 92, volume: 520, rating: 4.4 },
  { name: "ReNew", compliance: 88, volume: 290, rating: 4.2 },
  { name: "BioCycle", compliance: 96, volume: 340, rating: 4.7 },
];

const emissionsData = [
  { month: "Jul", co2: 45, methane: 12 },
  { month: "Aug", co2: 42, methane: 11 },
  { month: "Sep", co2: 38, methane: 10 },
  { month: "Oct", co2: 35, methane: 9 },
  { month: "Nov", co2: 32, methane: 8 },
  { month: "Dec", co2: 28, methane: 7 },
];

export function GovAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Analytics Dashboard</h2>
        <p className="font-body text-sm text-cream/60">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">10,920</p>
          <p className="font-body text-xs text-cream/60">Total MT Processed</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-success">78%</p>
          <p className="font-body text-xs text-cream/60">Diversion Rate</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">156</p>
          <p className="font-body text-xs text-cream/60">Active Partners</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-warning">-38%</p>
          <p className="font-body text-xs text-cream/60">Emissions Reduction</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Processing Trends */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Waste Processing Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
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
                <Bar dataKey="received" fill="hsl(45, 70%, 55%)" name="Received" radius={[4, 4, 0, 0]} />
                <Bar dataKey="processed" fill="hsl(145, 50%, 40%)" name="Processed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="diverted" fill="hsl(200, 50%, 50%)" name="Diverted" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Waste Category Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: 'hsl(45, 20%, 70%)' }}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(145, 35%, 12%)', 
                    border: '1px solid rgba(230, 220, 200, 0.2)',
                    borderRadius: '8px',
                    color: 'hsl(45, 30%, 92%)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Tracking */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Emissions Tracking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionsData}>
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
                <Area type="monotone" dataKey="co2" stroke="hsl(45, 70%, 55%)" fill="hsl(45, 70%, 55%)" fillOpacity={0.3} name="CO2 (tons)" />
                <Area type="monotone" dataKey="methane" stroke="hsl(280, 50%, 55%)" fill="hsl(280, 50%, 55%)" fillOpacity={0.3} name="Methane (tons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Partner Performance */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl text-cream mb-6">Partner Performance</h3>
          <div className="space-y-4">
            {partnerPerformance.map((partner, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 font-body text-sm text-cream truncate">{partner.name}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-xs text-cream/60">Compliance</span>
                    <span className="font-body text-xs text-cream">{partner.compliance}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-cream/10 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-success transition-all duration-500"
                      style={{ width: `${partner.compliance}%` }}
                    />
                  </div>
                </div>
                <div className="text-right w-20">
                  <p className="font-display text-sm text-cream">{partner.volume} MT</p>
                  <p className="font-body text-xs text-cream/60">Volume</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
