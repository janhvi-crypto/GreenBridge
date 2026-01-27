import { useState } from "react";
import { Building, Package, Clock, CheckCircle, XCircle, Eye, MessageSquare, Truck, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const newRequests = [
  {
    id: "REQ-2026-045",
    company: "GreenFurniture Ltd",
    material: "Reclaimed Wood",
    quantity: 75,
    budget: "₹13.5L",
    deadline: "Feb 15, 2026",
    matchScore: 95,
    gstVerified: true,
    pastOrders: 5,
    notes: "Urgent requirement for new product line",
  },
  {
    id: "REQ-2026-046",
    company: "MetalCorp Industries",
    material: "Metal Scrap",
    quantity: 120,
    budget: "₹26.4L",
    deadline: "Feb 20, 2026",
    matchScore: 88,
    gstVerified: true,
    pastOrders: 3,
    notes: "Looking for Grade A only",
  },
  {
    id: "REQ-2026-047",
    company: "EcoPackaging Solutions",
    material: "Plastic/PET",
    quantity: 50,
    budget: "₹9L",
    deadline: "Feb 10, 2026",
    matchScore: 78,
    gstVerified: true,
    pastOrders: 0,
    notes: "First-time buyer",
  },
];

const pendingApprovals = [
  {
    id: "MOU-2026-012",
    company: "TextileWorks Pvt Ltd",
    material: "Textile Fiber",
    quantity: 80,
    terms: "₹1,500/MT • 12-month contract",
    submitted: "Jan 22, 2026",
    status: "legal_review",
    statusLabel: "Legal Review",
  },
  {
    id: "MOU-2026-011",
    company: "ConstructMax Builders",
    material: "Construction Debris",
    quantity: 200,
    terms: "₹1,000/MT • 6-month contract",
    submitted: "Jan 20, 2026",
    status: "finance_review",
    statusLabel: "Finance Approval",
  },
];

const activeDeliveries = [
  {
    id: "DEL-2026-008",
    company: "GreenFurniture Ltd",
    material: "Reclaimed Wood",
    quantity: 50,
    status: "in_transit",
    driver: "Amit Singh",
    driverPhone: "+91 98765 12345",
    eta: "Jan 28, 2026 • 2:30 PM",
    location: "Gurgaon Highway, Near Sector 56",
  },
  {
    id: "DEL-2026-009",
    company: "MetalCorp Industries",
    material: "Metal Scrap",
    quantity: 80,
    status: "loading",
    driver: "Pending Assignment",
    driverPhone: null,
    eta: "Jan 29, 2026",
    location: "Warehouse A-12",
  },
];

export function CompanyRequests() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"new" | "pending" | "deliveries">("new");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    toast({
      title: "Request Approved",
      description: `Request ${id} has been approved. MOU will be sent to the company.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Request Rejected",
      description: `Request ${id} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleSuggestAlternative = (id: string) => {
    toast({
      title: "Suggestion Sent",
      description: `Alternative suggestion has been sent for ${id}.`,
    });
  };

  const handleConfirmDelivery = (id: string) => {
    toast({
      title: "Delivery Confirmed",
      description: `Delivery ${id} has been marked as completed.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Company Requests</h2>
        <p className="font-body text-sm text-cream/60">Manage incoming requests and active deliveries</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">12</p>
          <p className="font-body text-xs text-cream/60">New Requests</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-yellow-400">5</p>
          <p className="font-body text-xs text-cream/60">Pending Approval</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-purple-400">8</p>
          <p className="font-body text-xs text-cream/60">Active Deliveries</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-green-400">156</p>
          <p className="font-body text-xs text-cream/60">Completed (YTD)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream/10 pb-2">
        {[
          { id: "new", label: "New Requests", count: 12 },
          { id: "pending", label: "Pending Approvals", count: 5 },
          { id: "deliveries", label: "Active Deliveries", count: 8 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:text-cream hover:bg-cream/5"
            }`}
          >
            {tab.label}
            <span className="px-2 py-0.5 rounded-full text-xs bg-cream/10">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* New Requests */}
      {activeTab === "new" && (
        <div className="space-y-4">
          {newRequests.map((request) => {
            const isExpanded = selectedRequest === request.id;
            
            return (
              <div key={request.id} className="glass-card overflow-hidden">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedRequest(isExpanded ? null : request.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                        <Building className="w-6 h-6 text-cream" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-lg text-cream">{request.company}</h3>
                          {request.gstVerified && (
                            <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">GST Verified</span>
                          )}
                        </div>
                        <p className="font-body text-sm text-cream/60">
                          {request.material} • {request.quantity} MT • Budget: {request.budget}
                        </p>
                        <p className="font-body text-xs text-cream/40">Deadline: {request.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-display text-2xl text-green-400">{request.matchScore}%</p>
                        <p className="font-body text-xs text-cream/60">Match</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-cream/40 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-cream/10 pt-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="font-body text-xs text-cream/60 mb-2">Company Details</p>
                        <div className="space-y-2">
                          <p className="font-body text-sm text-cream">Past Orders: {request.pastOrders}</p>
                          <p className="font-body text-sm text-cream">Notes: {request.notes}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-body text-xs text-cream/60 mb-2">Inventory Match</p>
                        <div className="p-3 bg-cream/5 rounded-lg">
                          <p className="font-body text-sm text-cream">Available: 650 MT {request.material}</p>
                          <p className="font-body text-sm text-green-400">Sufficient stock for this order</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleApprove(request.id); }}
                        className="btn-elegant flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSuggestAlternative(request.id); }}
                        className="btn-outline-elegant flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Suggest Alternative
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleReject(request.id); }}
                        className="btn-outline-elegant text-red-400 border-red-500/30 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pending Approvals */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg text-cream">{approval.company}</h3>
                    <span className="font-body text-sm text-cream/60">• {approval.id}</span>
                  </div>
                  <p className="font-body text-sm text-cream/60">
                    {approval.material} • {approval.quantity} MT
                  </p>
                  <p className="font-body text-xs text-cream/40">{approval.terms}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`px-3 py-1.5 rounded-full text-sm ${
                      approval.status === "legal_review" 
                        ? "bg-blue-500/20 text-blue-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {approval.statusLabel}
                    </span>
                    <p className="font-body text-xs text-cream/40 mt-1">Submitted: {approval.submitted}</p>
                  </div>
                  <button className="btn-outline-elegant text-sm py-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Deliveries */}
      {activeTab === "deliveries" && (
        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cream">{delivery.company}</h3>
                    <p className="font-body text-sm text-cream/60">
                      {delivery.material} • {delivery.quantity} MT
                    </p>
                    <p className="font-body text-xs text-cream/40 mt-1">
                      Driver: {delivery.driver} {delivery.driverPhone && `(${delivery.driverPhone})`}
                    </p>
                    <p className="font-body text-xs text-cream/40">Location: {delivery.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm ${
                    delivery.status === "in_transit" 
                      ? "bg-purple-500/20 text-purple-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {delivery.status === "in_transit" ? "In Transit" : "Loading"}
                  </span>
                  <p className="font-body text-xs text-cream/60">ETA: {delivery.eta}</p>
                  {delivery.status === "in_transit" && (
                    <button
                      onClick={() => handleConfirmDelivery(delivery.id)}
                      className="btn-elegant text-sm py-2"
                    >
                      Confirm Delivery
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
