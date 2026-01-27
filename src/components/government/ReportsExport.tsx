import { useState } from "react";
import { FileText, Download, Calendar, BarChart3, Leaf, Building, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentReports = [
  { id: "RPT-2026-001", name: "Monthly Impact Report - January 2026", type: "monthly", generated: "Jan 25, 2026", size: "2.4 MB" },
  { id: "RPT-2025-012", name: "Monthly Impact Report - December 2025", type: "monthly", generated: "Jan 05, 2026", size: "2.1 MB" },
  { id: "RPT-2025-Q4", name: "Quarterly Report - Q4 2025", type: "quarterly", generated: "Jan 02, 2026", size: "5.8 MB" },
  { id: "RPT-2025-ANN", name: "Annual Report - 2025", type: "annual", generated: "Jan 01, 2026", size: "12.4 MB" },
];

const reportTemplates = [
  { id: "monthly", name: "Monthly Impact Report", description: "Waste diverted, revenue, CO₂ impact for the month", icon: Calendar },
  { id: "quarterly", name: "Quarterly Summary", description: "Comprehensive 3-month analysis with trends", icon: BarChart3 },
  { id: "annual", name: "Annual Report", description: "Full year report for Ministry submission", icon: FileText },
  { id: "environmental", name: "Environmental Impact", description: "CO₂ savings, land recovery, SDG alignment", icon: Leaf },
  { id: "partner", name: "Partner Performance", description: "Company-wise breakdown and compliance scores", icon: Building },
];

export function ReportsExport() {
  const { toast } = useToast();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");

  const handleDownload = (reportId: string, format: string) => {
    toast({
      title: "Download Started",
      description: `${reportId} is being downloaded as ${format.toUpperCase()}.`,
    });
  };

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowGenerateModal(false);
      toast({
        title: "Report Generated",
        description: "Your report has been generated and is ready for download.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cream">Reports & Export</h2>
          <p className="font-body text-sm text-cream/60">Generate and download reports for stakeholders</p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="btn-elegant flex items-center gap-2 w-fit"
        >
          <FileText className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">24</p>
          <p className="font-body text-xs text-cream/60">Reports Generated</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">156</p>
          <p className="font-body text-xs text-cream/60">Downloads (Month)</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-green-400">12</p>
          <p className="font-body text-xs text-cream/60">Ministry Submissions</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">Jan 25</p>
          <p className="font-body text-xs text-cream/60">Last Generated</p>
        </div>
      </div>

      {/* Report Templates */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Quick Generate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template.id);
                setShowGenerateModal(true);
              }}
              className="p-4 bg-cream/5 rounded-lg border border-cream/10 hover:border-cream/30 transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <template.icon className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-display text-cream">{template.name}</p>
                  <p className="font-body text-xs text-cream/60 mt-1">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/10">
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Report Name</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Type</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Generated</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Size</th>
                <th className="text-right p-4 font-body text-xs uppercase tracking-wider text-cream/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-cream/5 hover:bg-cream/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-cream/60" />
                      <span className="font-body text-sm text-cream">{report.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                      report.type === "annual" ? "bg-purple-500/20 text-purple-400" :
                      report.type === "quarterly" ? "bg-blue-500/20 text-blue-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 font-body text-sm text-cream/60">{report.generated}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{report.size}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(report.id, "pdf")}
                        className="px-3 py-1.5 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors font-body text-xs text-cream flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleDownload(report.id, "excel")}
                        className="px-3 py-1.5 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors font-body text-xs text-cream flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Excel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Scheduled Reports</h3>
        <div className="space-y-4">
          {[
            { name: "Monthly Impact Report", schedule: "1st of every month", recipients: "Commissioner, Ministry", active: true },
            { name: "Weekly Summary", schedule: "Every Monday", recipients: "Department Heads", active: true },
            { name: "Partner Performance", schedule: "15th of every month", recipients: "Operations Team", active: false },
          ].map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-cream/5 rounded-lg">
              <div>
                <p className="font-body text-cream">{schedule.name}</p>
                <p className="font-body text-xs text-cream/60">{schedule.schedule} • {schedule.recipients}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={schedule.active}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-cream/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-lg w-full animate-scale-in">
            <h3 className="font-display text-2xl text-cream mb-6">Generate Report</h3>
            
            <div className="space-y-6">
              <div>
                <label className="info-label block mb-2">Report Type</label>
                <select
                  value={selectedTemplate || "monthly"}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="input-elegant-filled w-full"
                >
                  {reportTemplates.map((t) => (
                    <option key={t.id} value={t.id} className="bg-forest-dark">{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="info-label block mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="input-elegant-filled" defaultValue="2025-12-01" />
                  <input type="date" className="input-elegant-filled" defaultValue="2025-12-31" />
                </div>
              </div>

              <div>
                <label className="info-label block mb-2">Export Format</label>
                <div className="flex gap-4">
                  {["pdf", "excel"].map((format) => (
                    <label key={format} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        checked={exportFormat === format}
                        onChange={() => setExportFormat(format as typeof exportFormat)}
                        className="w-4 h-4"
                      />
                      <span className="font-body text-cream uppercase">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="info-label block mb-2">Include Sections</label>
                <div className="space-y-2">
                  {["Executive Summary", "Financial Overview", "Environmental Impact", "Partner Analysis", "Compliance Status"].map((section) => (
                    <label key={section} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                      <span className="font-body text-sm text-cream/80">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowGenerateModal(false)} className="btn-outline-elegant flex-1">
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className="btn-elegant flex-1 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
