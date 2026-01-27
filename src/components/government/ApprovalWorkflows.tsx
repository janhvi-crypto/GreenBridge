import { useState } from "react";
import { FileText, CheckCircle, Clock, AlertCircle, PenTool, Eye, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mouReviews = [
  {
    id: "MOU-2026-015",
    company: "GreenFurniture Ltd",
    type: "Supply Agreement",
    material: "Reclaimed Wood",
    quantity: "500 MT/year",
    value: "₹90L annually",
    term: "24 months",
    submitted: "Jan 25, 2026",
    legalStatus: "approved",
    financeStatus: "approved",
    finalStatus: "pending",
  },
  {
    id: "MOU-2026-014",
    company: "MetalCorp Industries",
    type: "Framework Agreement",
    material: "Metal Scrap",
    quantity: "1000 MT/year",
    value: "₹2.2 Cr annually",
    term: "36 months",
    submitted: "Jan 22, 2026",
    legalStatus: "approved",
    financeStatus: "pending",
    finalStatus: "pending",
  },
  {
    id: "MOU-2026-013",
    company: "EcoPackaging Solutions",
    type: "Pilot Agreement",
    material: "Plastic/PET",
    quantity: "100 MT",
    value: "₹18L",
    term: "6 months",
    submitted: "Jan 20, 2026",
    legalStatus: "pending",
    financeStatus: "pending",
    finalStatus: "pending",
  },
];

const certifications = [
  {
    id: "CERT-2026-089",
    company: "TextileWorks Pvt Ltd",
    type: "Warehouse Safety",
    submitted: "Jan 24, 2026",
    documents: ["Safety Audit Report", "Fire NOC", "Insurance Certificate"],
    status: "under_review",
  },
  {
    id: "CERT-2026-088",
    company: "ConstructMax Builders",
    type: "Quality Assurance",
    submitted: "Jan 22, 2026",
    documents: ["ISO 9001", "Quality Manual", "Process Flow"],
    status: "approved",
  },
  {
    id: "CERT-2026-087",
    company: "BioCycle Industries",
    type: "Environmental Compliance",
    submitted: "Jan 20, 2026",
    documents: ["Pollution Control Board NOC", "Waste Handling License"],
    status: "revision_needed",
  },
];

export function ApprovalWorkflows() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"mou" | "certifications">("mou");
  const [showSignModal, setShowSignModal] = useState<string | null>(null);

  const handleSign = (mouId: string) => {
    setShowSignModal(null);
    toast({
      title: "MOU Signed",
      description: `${mouId} has been digitally signed and sent to the company.`,
    });
  };

  const handleApproveCert = (certId: string) => {
    toast({
      title: "Certification Approved",
      description: `${certId} has been approved.`,
    });
  };

  const handleRequestRevision = (certId: string) => {
    toast({
      title: "Revision Requested",
      description: `Revision request has been sent for ${certId}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-400" />;
      case "revision_needed": return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-cream/40" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400";
      case "pending": case "under_review": return "bg-yellow-500/20 text-yellow-400";
      case "revision_needed": return "bg-red-500/20 text-red-400";
      default: return "bg-cream/10 text-cream/60";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Approval Workflows</h2>
        <p className="font-body text-sm text-cream/60">Review and approve MOUs and certifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">8</p>
          <p className="font-body text-xs text-cream/60">MOUs Pending</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-yellow-400">5</p>
          <p className="font-body text-xs text-cream/60">Certs to Review</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-green-400">45</p>
          <p className="font-body text-xs text-cream/60">Approved (Month)</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">2.3 days</p>
          <p className="font-body text-xs text-cream/60">Avg. Approval Time</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream/10 pb-2">
        {[
          { id: "mou", label: "MOUs to Review" },
          { id: "certifications", label: "Certifications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-body text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:text-cream hover:bg-cream/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MOUs */}
      {activeTab === "mou" && (
        <div className="space-y-4">
          {mouReviews.map((mou) => (
            <div key={mou.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-cream" />
                    <h3 className="font-display text-lg text-cream">{mou.company}</h3>
                    <span className="font-body text-sm text-cream/60">• {mou.id}</span>
                  </div>
                  <p className="font-body text-sm text-cream/60">{mou.type} • {mou.material}</p>
                  <p className="font-body text-xs text-cream/40">
                    {mou.quantity} • {mou.value} • {mou.term}
                  </p>
                </div>
                <p className="font-body text-xs text-cream/40">Submitted: {mou.submitted}</p>
              </div>

              {/* Approval Pipeline */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg border ${mou.legalStatus === "approved" ? "border-green-500/30 bg-green-500/10" : "border-cream/10 bg-cream/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(mou.legalStatus)}
                    <span className="font-body text-sm text-cream">Legal Review</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusClass(mou.legalStatus)}`}>
                    {mou.legalStatus}
                  </span>
                </div>
                <div className={`p-4 rounded-lg border ${mou.financeStatus === "approved" ? "border-green-500/30 bg-green-500/10" : "border-cream/10 bg-cream/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(mou.financeStatus)}
                    <span className="font-body text-sm text-cream">Finance Approval</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusClass(mou.financeStatus)}`}>
                    {mou.financeStatus}
                  </span>
                </div>
                <div className={`p-4 rounded-lg border ${mou.finalStatus === "approved" ? "border-green-500/30 bg-green-500/10" : "border-cream/10 bg-cream/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(mou.finalStatus)}
                    <span className="font-body text-sm text-cream">Final Signature</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusClass(mou.finalStatus)}`}>
                    {mou.finalStatus}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="btn-outline-elegant flex items-center gap-2 text-sm py-2">
                  <Eye className="w-4 h-4" />
                  View MOU Draft
                </button>
                {mou.legalStatus === "approved" && mou.financeStatus === "approved" && (
                  <button
                    onClick={() => setShowSignModal(mou.id)}
                    className="btn-elegant flex items-center gap-2 text-sm py-2"
                  >
                    <PenTool className="w-4 h-4" />
                    Sign Digitally
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {activeTab === "certifications" && (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg text-cream">{cert.company}</h3>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusClass(cert.status)}`}>
                      {cert.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="font-body text-sm text-cream/60">{cert.type} • {cert.id}</p>
                  <p className="font-body text-xs text-cream/40">Submitted: {cert.submitted}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-body text-xs text-cream/60 mb-2">Documents Submitted:</p>
                <div className="flex flex-wrap gap-2">
                  {cert.documents.map((doc, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-cream/5 rounded-lg text-sm text-cream/80 hover:bg-cream/10 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      {doc}
                    </button>
                  ))}
                </div>
              </div>

              {cert.status === "under_review" && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleApproveCert(cert.id)}
                    className="btn-elegant flex items-center gap-2 text-sm py-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequestRevision(cert.id)}
                    className="btn-outline-elegant flex items-center gap-2 text-sm py-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Request Revision
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Digital Signature Modal */}
      {showSignModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-cream">Digital Signature</h3>
              <button
                onClick={() => setShowSignModal(null)}
                className="p-2 rounded-lg hover:bg-cream/10 transition-colors"
              >
                <X className="w-5 h-5 text-cream/60" />
              </button>
            </div>
            <p className="font-body text-cream/60 mb-6">
              By signing this MOU, you authorize the supply agreement between the government department and the company.
            </p>
            <div className="p-4 bg-cream/5 rounded-lg mb-6">
              <p className="font-body text-xs text-cream/60">MOU Reference</p>
              <p className="font-display text-lg text-cream">{showSignModal}</p>
            </div>
            <div className="mb-6">
              <label className="info-label block mb-2">Enter OTP (sent to registered email)</label>
              <input type="text" placeholder="Enter 6-digit OTP" className="input-elegant-filled w-full" maxLength={6} />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowSignModal(null)} className="btn-outline-elegant flex-1">
                Cancel
              </button>
              <button onClick={() => handleSign(showSignModal)} className="btn-elegant flex-1 flex items-center justify-center gap-2">
                <PenTool className="w-4 h-4" />
                Sign MOU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
