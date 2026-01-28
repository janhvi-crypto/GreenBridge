import { useState } from "react";
import { Shield, FileText, Link2, CheckCircle, AlertTriangle, Download, ExternalLink } from "lucide-react";

const auditHistory = [
  {
    id: "AUD-2847",
    type: "Safety Inspection",
    company: "GreenFurniture Ltd",
    date: "Jan 15, 2026",
    inspector: "Rajesh Kumar",
    result: "passed",
    score: 92,
    nextDue: "Jul 15, 2026",
  },
  {
    id: "AUD-2846",
    type: "Environmental Compliance",
    company: "PlastiCycle Industries",
    date: "Jan 10, 2026",
    inspector: "Priya Sharma",
    result: "passed",
    score: 88,
    nextDue: "Jul 10, 2026",
  },
  {
    id: "AUD-2845",
    type: "Fire Safety",
    company: "MetalCorp Industries",
    date: "Jan 5, 2026",
    inspector: "Amit Singh",
    result: "issues_found",
    score: 72,
    nextDue: "Feb 5, 2026",
  },
];

const documents = [
  { name: "MOU - GreenFurniture Ltd", type: "MOU", date: "Jan 20, 2026", size: "2.4 MB", verified: true },
  { name: "Supply Agreement - PlastiCycle", type: "Agreement", date: "Jan 18, 2026", size: "1.8 MB", verified: true },
  { name: "Safety Audit Report Q4 2025", type: "Audit", date: "Jan 15, 2026", size: "5.2 MB", verified: true },
  { name: "Environmental Clearance Certificate", type: "Certificate", date: "Jan 10, 2026", size: "892 KB", verified: true },
  { name: "Fire Safety NOC - MetalCorp", type: "NOC", date: "Jan 5, 2026", size: "1.1 MB", verified: false },
];

const blockchainRecords = [
  {
    hash: "0x7a8f...3c2d",
    type: "Waste Batch Registration",
    description: "75 MT Reclaimed Wood - Grade A",
    timestamp: "Jan 28, 2026 14:32:15",
    verified: true,
  },
  {
    hash: "0x9b2e...8f4a",
    type: "Carbon Credit Issuance",
    description: "90 MT CO₂e credited to GreenFurniture Ltd",
    timestamp: "Jan 27, 2026 10:15:42",
    verified: true,
  },
  {
    hash: "0x3d5c...1e7b",
    type: "MOU Execution",
    description: "Supply Agreement with PlastiCycle Industries",
    timestamp: "Jan 25, 2026 16:48:33",
    verified: true,
  },
  {
    hash: "0x6f1a...2c9e",
    type: "Quality Certification",
    description: "Grade A certification for Metal Batch #2841",
    timestamp: "Jan 23, 2026 09:22:18",
    verified: true,
  },
];

export function ComplianceAudits() {
  const [activeTab, setActiveTab] = useState<"audits" | "documents" | "blockchain">("audits");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">45</p>
          <p className="font-body text-xs text-cream/60">Audits Passed (YTD)</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">3</p>
          <p className="font-body text-xs text-cream/60">Pending Re-audits</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">128</p>
          <p className="font-body text-xs text-cream/60">Documents Archived</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">256</p>
          <p className="font-body text-xs text-cream/60">Blockchain Records</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream/10 pb-4">
        {[
          { id: "audits", label: "Safety Audits" },
          { id: "documents", label: "Document Archive" },
          { id: "blockchain", label: "Blockchain Verification" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 font-body text-sm rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:text-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Audits Tab */}
      {activeTab === "audits" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream/5">
              <tr>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Audit ID</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Type</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Company</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Date</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Score</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Result</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {auditHistory.map((audit) => (
                <tr key={audit.id} className="border-t border-cream/10">
                  <td className="p-4 font-body text-sm text-cream">{audit.id}</td>
                  <td className="p-4 font-body text-sm text-cream">{audit.type}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{audit.company}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{audit.date}</td>
                  <td className="p-4">
                    <span
                      className={`font-display text-lg ${
                        audit.score >= 85 ? "text-green-400" : audit.score >= 70 ? "text-yellow-400" : "text-red-400"
                      }`}
                    >
                      {audit.score}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        audit.result === "passed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {audit.result === "passed" ? "Passed" : "Issues Found"}
                    </span>
                  </td>
                  <td className="p-4 font-body text-sm text-cream/60">{audit.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-body text-sm text-cream">{doc.name}</p>
                  <p className="font-body text-xs text-cream/60">
                    {doc.type} • {doc.date} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {doc.verified ? (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-400 text-xs">
                    <AlertTriangle className="w-3 h-3" /> Pending
                  </span>
                )}
                <button className="btn-outline-elegant text-xs px-3 py-1">
                  <Download className="w-3 h-3 mr-1" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blockchain Tab */}
      {activeTab === "blockchain" && (
        <div className="space-y-4">
          {blockchainRecords.map((record, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-cream">{record.type}</p>
                    <p className="font-mono text-xs text-cream/60">{record.hash}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="font-body text-xs text-green-400">Verified</span>
                </div>
              </div>
              <p className="font-body text-sm text-cream/80 mb-2">{record.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-cream/40">{record.timestamp}</span>
                <button className="flex items-center gap-1 text-cream/60 hover:text-cream text-xs">
                  <ExternalLink className="w-3 h-3" /> View on Explorer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
