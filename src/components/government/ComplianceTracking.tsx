import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, FileText, Download, TrendingUp } from "lucide-react";

const complianceItems = [
  {
    id: 1,
    title: "Environmental Impact Assessment",
    status: "compliant",
    dueDate: "2024-03-15",
    lastUpdated: "2024-01-10",
    description: "Annual environmental impact assessment for landfill operations",
    progress: 100,
  },
  {
    id: 2,
    title: "Waste Management License",
    status: "expiring",
    dueDate: "2024-02-01",
    lastUpdated: "2023-12-15",
    description: "State-issued waste management operational license",
    progress: 85,
  },
  {
    id: 3,
    title: "Quarterly Emissions Report",
    status: "pending",
    dueDate: "2024-01-31",
    lastUpdated: "2024-01-05",
    description: "Q4 2023 emissions and air quality monitoring report",
    progress: 60,
  },
  {
    id: 4,
    title: "Safety Inspection Certificate",
    status: "compliant",
    dueDate: "2024-06-30",
    lastUpdated: "2024-01-08",
    description: "Annual workplace safety and equipment inspection",
    progress: 100,
  },
  {
    id: 5,
    title: "Groundwater Monitoring Report",
    status: "pending",
    dueDate: "2024-02-15",
    lastUpdated: "2024-01-12",
    description: "Monthly groundwater quality monitoring and analysis",
    progress: 45,
  },
];

const reports = [
  { name: "Annual Compliance Summary 2023", date: "2024-01-01", size: "2.4 MB" },
  { name: "Q4 Environmental Report", date: "2023-12-31", size: "1.8 MB" },
  { name: "Safety Audit Report", date: "2023-11-15", size: "3.2 MB" },
  { name: "Emissions Compliance Report", date: "2023-10-30", size: "1.5 MB" },
];

export function ComplianceTracking() {
  const [selectedItem, setSelectedItem] = useState<typeof complianceItems[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "expiring":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "pending":
        return <Clock className="w-5 h-5 text-cream/60" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return "badge-approved";
      case "expiring":
        return "badge-pending";
      case "pending":
        return "badge-revision";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Compliance Tracking</h2>
        <p className="font-body text-sm text-cream/60">Monitor regulatory compliance and certifications</p>
      </div>

      {/* Compliance Score */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-cream/10"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-success"
                  strokeDasharray={`${94.7 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl text-cream">94.7%</span>
              </div>
            </div>
            <div>
              <p className="font-display text-xl text-cream">Overall Compliance Score</p>
              <p className="font-body text-sm text-cream/60">Based on 5 active requirements</p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 md:ml-auto md:max-w-sm">
            <div className="text-center">
              <p className="font-display text-2xl text-success">2</p>
              <p className="font-body text-xs text-cream/60">Compliant</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl text-warning">1</p>
              <p className="font-body text-xs text-cream/60">Expiring</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl text-cream/60">2</p>
              <p className="font-body text-xs text-cream/60">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Compliance Requirements</h3>
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  {getStatusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg text-cream">{item.title}</h4>
                    <p className="font-body text-sm text-cream/60 truncate">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right">
                    <p className="font-body text-xs text-cream/60">Due Date</p>
                    <p className="font-body text-sm text-cream">{item.dueDate}</p>
                  </div>
                  <span className={`${getStatusBadge(item.status)} capitalize`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-xs text-cream/60">Progress</span>
                  <span className="font-body text-xs text-cream">{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-cream/10 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.progress === 100 ? 'bg-success' : 
                      item.progress >= 80 ? 'bg-warning' : 'bg-cream/40'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-cream">Compliance Reports</h3>
          <button className="btn-outline-elegant text-sm py-2 px-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Generate Report
          </button>
        </div>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-body text-sm text-cream">{report.name}</p>
                  <p className="font-body text-xs text-cream/60">{report.date} · {report.size}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors">
                <Download className="w-5 h-5 text-cream/60 hover:text-cream" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
