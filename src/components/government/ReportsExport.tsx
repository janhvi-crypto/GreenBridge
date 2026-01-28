import { useState } from "react";
import { FileText, Download, Calendar, BarChart3, Loader2 } from "lucide-react";

const reportTypes = [
  {
    id: "monthly",
    name: "Monthly Report",
    description: "Waste diversion, revenue, and company activity summary",
    sections: ["Waste Metrics", "Financial Summary", "Company Activity", "Compliance Status"],
  },
  {
    id: "annual",
    name: "Annual Report",
    description: "Comprehensive year-end impact report for Ministry submission",
    sections: ["Executive Summary", "Yearly Metrics", "Case Studies", "Financial Analysis", "Environmental Impact", "Future Projections"],
  },
  {
    id: "impact",
    name: "Impact Report",
    description: "CO₂ avoided, ESG metrics, and sustainability achievements",
    sections: ["Carbon Credits", "ESG Score", "Jobs Created", "Land Recovered"],
  },
  {
    id: "financial",
    name: "Financial Report",
    description: "Detailed revenue, cost savings, and budget analysis",
    sections: ["Revenue Breakdown", "Cost Analysis", "Savings Report", "Budget Projection"],
  },
];

const recentReports = [
  { name: "January 2026 Monthly Report", type: "Monthly", date: "Feb 1, 2026", size: "2.4 MB", format: "PDF" },
  { name: "Q4 2025 Impact Report", type: "Impact", date: "Jan 15, 2026", size: "3.8 MB", format: "PDF" },
  { name: "December 2025 Financial Report", type: "Financial", date: "Jan 5, 2026", size: "1.2 MB", format: "Excel" },
  { name: "Annual Report 2025", type: "Annual", date: "Jan 2, 2026", size: "8.5 MB", format: "PDF" },
];

export function ReportsExport() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: "2026-01-01", end: "2026-01-31" });
  const [format, setFormat] = useState<"pdf" | "excel">("pdf");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Would trigger download
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Report Generator */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" /> Generate Report
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Type Selection */}
          <div>
            <label className="info-label block mb-3">Select Report Type</label>
            <div className="space-y-3">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedReport === report.id
                      ? "bg-cream/10 border border-cream/30"
                      : "bg-cream/5 border border-transparent hover:bg-cream/10"
                  }`}
                >
                  <p className="font-body text-sm text-cream">{report.name}</p>
                  <p className="font-body text-xs text-cream/60 mt-1">{report.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Report Options */}
          <div className="space-y-6">
            {selectedReport && (
              <>
                <div>
                  <label className="info-label block mb-3">Date Range</label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="font-body text-xs text-cream/60 block mb-1">From</label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="input-elegant-filled w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-body text-xs text-cream/60 block mb-1">To</label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="input-elegant-filled w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="info-label block mb-3">Export Format</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormat("pdf")}
                      className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        format === "pdf"
                          ? "bg-red-500/20 border border-red-500/30 text-red-400"
                          : "bg-cream/5 border border-transparent text-cream/60"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                      PDF
                    </button>
                    <button
                      onClick={() => setFormat("excel")}
                      className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        format === "excel"
                          ? "bg-green-500/20 border border-green-500/30 text-green-400"
                          : "bg-cream/5 border border-transparent text-cream/60"
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      Excel
                    </button>
                  </div>
                </div>

                <div>
                  <label className="info-label block mb-3">Sections Included</label>
                  <div className="flex flex-wrap gap-2">
                    {reportTypes.find((r) => r.id === selectedReport)?.sections.map((section, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cream/10 rounded-full text-xs text-cream/80"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="btn-elegant w-full"
                >
                  {generating ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Generate & Download
                    </span>
                  )}
                </button>
              </>
            )}

            {!selectedReport && (
              <div className="flex items-center justify-center h-full text-cream/40">
                <p className="font-body text-sm">Select a report type to continue</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Recent Reports</h3>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-cream/5 rounded-lg hover:bg-cream/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    report.format === "PDF" ? "bg-red-500/20" : "bg-green-500/20"
                  }`}
                >
                  <FileText
                    className={`w-5 h-5 ${report.format === "PDF" ? "text-red-400" : "text-green-400"}`}
                  />
                </div>
                <div>
                  <p className="font-body text-sm text-cream">{report.name}</p>
                  <p className="font-body text-xs text-cream/60">
                    {report.type} • {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <button className="btn-outline-elegant text-xs px-3 py-1">
                <Download className="w-3 h-3 mr-1" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats for Reports */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <p className="font-display text-3xl text-cream">48</p>
          <p className="font-body text-xs text-cream/60">Reports Generated (YTD)</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="font-display text-3xl text-cream">12</p>
          <p className="font-body text-xs text-cream/60">Monthly Reports</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="font-display text-3xl text-cream">4</p>
          <p className="font-body text-xs text-cream/60">Quarterly Reports</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="font-display text-3xl text-cream">1</p>
          <p className="font-body text-xs text-cream/60">Annual Report</p>
        </div>
      </div>
    </div>
  );
}
