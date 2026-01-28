import { useState } from "react";
import { FileCheck, Clock, CheckCircle, XCircle, Pen, Eye, Download } from "lucide-react";

const pendingMOUs = [
  {
    id: "MOU-2847",
    company: "GreenFurniture Ltd",
    material: "Reclaimed Wood",
    quantity: "100 MT/month",
    duration: "12 months",
    value: "₹2.4 Cr",
    submittedDate: "Jan 25, 2026",
    legalReview: "approved",
    financeReview: "pending",
  },
  {
    id: "MOU-2846",
    company: "PlastiCycle Industries",
    material: "Plastic / PET",
    quantity: "75 MT/month",
    duration: "6 months",
    value: "₹90L",
    submittedDate: "Jan 24, 2026",
    legalReview: "pending",
    financeReview: "pending",
  },
];

const pendingCertifications = [
  {
    id: "CERT-1245",
    company: "MetalCorp Industries",
    type: "Warehouse Safety",
    submittedDate: "Jan 26, 2026",
    documents: 5,
    status: "under_review",
  },
  {
    id: "CERT-1244",
    company: "EcoPackaging Co.",
    type: "Environmental Compliance",
    submittedDate: "Jan 23, 2026",
    documents: 8,
    status: "approved",
  },
  {
    id: "CERT-1243",
    company: "TechRecycle Hub",
    type: "E-Waste License",
    submittedDate: "Jan 20, 2026",
    documents: 12,
    status: "revision_needed",
  },
];

export function ApprovalWorkflows() {
  const [activeTab, setActiveTab] = useState<"mous" | "certifications">("mous");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">5</p>
          <p className="font-body text-xs text-cream/60">Pending Approvals</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">28</p>
          <p className="font-body text-xs text-cream/60">Approved This Month</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Pen className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">12</p>
          <p className="font-body text-xs text-cream/60">Active MOUs</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">45</p>
          <p className="font-body text-xs text-cream/60">Certifications Valid</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream/10 pb-4">
        <button
          onClick={() => setActiveTab("mous")}
          className={`px-4 py-2 font-body text-sm rounded-lg transition-all ${
            activeTab === "mous"
              ? "bg-cream/10 text-cream"
              : "text-cream/60 hover:text-cream"
          }`}
        >
          MOUs to Review
          <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
            {pendingMOUs.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("certifications")}
          className={`px-4 py-2 font-body text-sm rounded-lg transition-all ${
            activeTab === "certifications"
              ? "bg-cream/10 text-cream"
              : "text-cream/60 hover:text-cream"
          }`}
        >
          Certifications
          <span className="ml-2 px-2 py-0.5 bg-cream/10 rounded-full text-xs">
            {pendingCertifications.length}
          </span>
        </button>
      </div>

      {/* MOUs Tab */}
      {activeTab === "mous" && (
        <div className="space-y-6">
          {pendingMOUs.map((mou) => (
            <div key={mou.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body text-xs text-cream/60">{mou.id}</span>
                    <span className="badge-pending">Pending Approval</span>
                  </div>
                  <h3 className="font-display text-xl text-cream">{mou.company}</h3>
                  <p className="font-body text-sm text-cream/60">
                    {mou.material} • {mou.quantity} • {mou.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-cream">{mou.value}</p>
                  <p className="font-body text-xs text-cream/60">Contract Value</p>
                </div>
              </div>

              {/* Approval Pipeline */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-3 rounded-lg ${mou.legalReview === "approved" ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                  <p className="font-body text-xs text-cream/60 mb-1">Legal Review</p>
                  <div className="flex items-center gap-2">
                    {mou.legalReview === "approved" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="font-body text-sm text-cream capitalize">{mou.legalReview}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${mou.financeReview === "approved" ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                  <p className="font-body text-xs text-cream/60 mb-1">Finance Review</p>
                  <div className="flex items-center gap-2">
                    {mou.financeReview === "approved" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="font-body text-sm text-cream capitalize">{mou.financeReview}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-cream/5">
                  <p className="font-body text-xs text-cream/60 mb-1">Final Approval</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cream/40" />
                    <span className="font-body text-sm text-cream/40">Waiting</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-cream/10">
                <button className="btn-outline-elegant text-xs">
                  <Eye className="w-3 h-3 mr-1" /> View MOU Draft
                </button>
                <button className="btn-outline-elegant text-xs">
                  <Download className="w-3 h-3 mr-1" /> Download Documents
                </button>
                <div className="flex-1" />
                <button className="btn-outline-elegant text-xs text-yellow-400 border-yellow-400/30">
                  Request Changes
                </button>
                <button className="btn-elegant text-xs">
                  <Pen className="w-3 h-3 mr-1" /> Sign & Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream/5">
              <tr>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">ID</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Company</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Type</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Documents</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Status</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCertifications.map((cert) => (
                <tr key={cert.id} className="border-t border-cream/10">
                  <td className="p-4 font-body text-sm text-cream">{cert.id}</td>
                  <td className="p-4 font-body text-sm text-cream">{cert.company}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{cert.type}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{cert.documents} files</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        cert.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : cert.status === "under_review"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {cert.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="btn-outline-elegant text-xs px-2 py-1">View</button>
                      {cert.status !== "approved" && (
                        <button className="btn-elegant text-xs px-2 py-1">Approve</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
