import { useState } from "react";
import { Check, X, Eye, Building2, Calendar, Package, FileText } from "lucide-react";

const pendingRequests = [
  {
    id: 1,
    company: "EcoTech Industries",
    type: "Textile Recycling",
    wasteCategory: "Textile Waste",
    quantity: 500,
    submittedDate: "2024-01-15",
    description: "Request to collect and recycle textile waste from Sector A-12 for fabric regeneration.",
    documents: ["Business License", "Environmental Permit", "Processing Capability Report"],
  },
  {
    id: 2,
    company: "GreenCycle Corp",
    type: "Plastic Processing",
    wasteCategory: "Plastic Waste",
    quantity: 800,
    submittedDate: "2024-01-14",
    description: "Proposal for plastic waste collection and conversion into recycled pellets.",
    documents: ["Business License", "Environmental Permit"],
  },
  {
    id: 3,
    company: "MetalWorks Ltd",
    type: "Metal Recycling",
    wasteCategory: "Metal Scrap",
    quantity: 1200,
    submittedDate: "2024-01-13",
    description: "Request for metal scrap collection for industrial recycling purposes.",
    documents: ["Business License", "Safety Certificate", "Equipment Certification"],
  },
];

const approvalHistory = [
  { id: 101, company: "ReNew Materials", status: "approved", date: "2024-01-10", wasteCategory: "Electronic Waste" },
  { id: 102, company: "BioCycle Solutions", status: "rejected", date: "2024-01-08", wasteCategory: "Organic Waste" },
  { id: 103, company: "ConstructRecycle Inc", status: "approved", date: "2024-01-05", wasteCategory: "Construction Debris" },
  { id: 104, company: "EcoFiber Ltd", status: "revision", date: "2024-01-03", wasteCategory: "Textile Waste" },
];

export function CollaborationApprovals() {
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingRequests[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Collaboration Approvals</h2>
        <p className="font-body text-sm text-cream/60">Review and manage partnership requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-warning">3</p>
          <p className="font-body text-xs text-cream/60">Pending</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-success">28</p>
          <p className="font-body text-xs text-cream/60">Approved</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-destructive">5</p>
          <p className="font-body text-xs text-cream/60">Rejected</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">4</p>
          <p className="font-body text-xs text-cream/60">Under Review</p>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Pending Requests</h3>
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-cream" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg text-cream">{request.company}</h4>
                    <p className="font-body text-sm text-cream/60">{request.type}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-cream/40" />
                    <span className="font-body text-cream/80">{request.quantity} MT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cream/40" />
                    <span className="font-body text-cream/80">{request.submittedDate}</span>
                  </div>
                  <span className="badge-pending">{request.wasteCategory}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedRequest(request)}
                    className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-cream" />
                  </button>
                  <button 
                    className="p-2 rounded-lg bg-success/20 hover:bg-success/30 transition-colors"
                    title="Approve"
                  >
                    <Check className="w-5 h-5 text-success" />
                  </button>
                  <button 
                    className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 transition-colors"
                    title="Reject"
                  >
                    <X className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Recent History</h3>
        <div className="space-y-3">
          {approvalHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-cream/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-body text-sm text-cream">{item.company}</p>
                  <p className="font-body text-xs text-cream/60">{item.wasteCategory}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-cream/60">{item.date}</span>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-body capitalize
                  ${item.status === "approved" ? "badge-approved" : ""}
                  ${item.status === "rejected" ? "badge-revision" : ""}
                  ${item.status === "revision" ? "badge-pending" : ""}
                `}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-xl text-cream">{selectedRequest.company}</h3>
                <p className="font-body text-sm text-cream/60">{selectedRequest.type}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-lg hover:bg-cream/10 transition-colors"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="info-label">Waste Category</p>
                  <p className="font-body text-cream">{selectedRequest.wasteCategory}</p>
                </div>
                <div>
                  <p className="info-label">Quantity Requested</p>
                  <p className="font-body text-cream">{selectedRequest.quantity} MT</p>
                </div>
                <div>
                  <p className="info-label">Submitted Date</p>
                  <p className="font-body text-cream">{selectedRequest.submittedDate}</p>
                </div>
              </div>

              <div>
                <p className="info-label">Description</p>
                <p className="font-body text-sm text-cream/80 mt-1">{selectedRequest.description}</p>
              </div>

              <div>
                <p className="info-label">Attached Documents</p>
                <div className="space-y-2 mt-2">
                  {selectedRequest.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded bg-cream/5">
                      <FileText className="w-4 h-4 text-cream/60" />
                      <span className="font-body text-sm text-cream">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="btn-outline-elegant flex-1 flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <button className="btn-elegant flex-1 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
