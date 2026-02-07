import { useState, useMemo } from "react";
import { Package, Truck, CheckCircle, Clock, XCircle, Eye, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBusinessRequests, useUpdateRequestStatus, useOrders, useInsertOrder, useLogActivity } from "@/hooks/useDashboardData";

const MOCK_NEW = [
  { id: "REQ-2847", company: "GreenFurniture Ltd", material: "Reclaimed Wood", quantity: "75 MT", budget: "₹13.5L", deadline: "Feb 15, 2026", matchScore: 95, submittedDate: "Jan 26, 2026" },
  { id: "REQ-2846", company: "PlastiCycle Industries", material: "Plastic / PET", quantity: "100 MT", budget: "₹18L", deadline: "Feb 20, 2026", matchScore: 88, submittedDate: "Jan 25, 2026" },
];
const MOCK_PENDING = [
  { id: "REQ-2840", company: "EcoPackaging Co.", material: "Plastic / PET", quantity: "60 MT", status: "awaiting_mou", stage: "MOU Signature Required" },
];
const MOCK_ACTIVE = [
  { id: "DEL-1847", company: "GreenFurniture Ltd", material: "Reclaimed Wood", quantity: "50 MT", status: "in_transit", driver: "Ramesh Kumar", eta: "2 hours", progress: 75 },
  { id: "DEL-1846", company: "ReThread Apparel", material: "Textile / Fabric", quantity: "30 MT", status: "loading", driver: "Suresh Patel", eta: "Tomorrow", progress: 25 },
];

export function CompanyRequests() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"new" | "pending" | "active">("new");
  const { data: allRequests = [] } = useBusinessRequests(false);
  const { data: allOrders = [] } = useOrders(false);
  const updateStatus = useUpdateRequestStatus();
  const insertOrder = useInsertOrder();
  const logActivity = useLogActivity();
  const realRequestIds = useMemo(() => new Set(allRequests.map((r) => r.id)), [allRequests]);

  const newRequests = useMemo(() => {
    const submitted = allRequests.filter((r) => r.status === "submitted").map((r) => ({
      id: r.id,
      company: r.company_name ?? "Business",
      material: r.material_type,
      quantity: `${r.quantity} ${r.quantity_unit}`,
      budget: r.budget ?? "—",
      deadline: r.deadline ?? "—",
      matchScore: 90,
      submittedDate: r.submitted_at?.slice(0, 10) ?? r.created_at.slice(0, 10),
    }));
    return submitted.length > 0 ? submitted : MOCK_NEW;
  }, [allRequests]);

  const pendingApprovals = useMemo(() => {
    const pending = allRequests.filter((r) => ["mou_pending", "approved"].includes(r.status)).map((r) => ({
      id: r.id,
      company: r.company_name ?? "Business",
      material: r.material_type,
      quantity: `${r.quantity} MT`,
      status: r.status === "mou_pending" ? "awaiting_mou" : "quality_pending",
      stage: r.status === "mou_pending" ? "MOU Signature Required" : "Quality Certification",
    }));
    return pending.length > 0 ? pending : MOCK_PENDING;
  }, [allRequests]);

  const activeDeliveries = useMemo(() => {
    const orders = allOrders.filter((o) => !["delivered"].includes(o.status)).map((o) => ({
      id: o.id,
      company: "Business",
      material: o.material_type,
      quantity: o.quantity,
      status: o.status === "in_transit" ? "in_transit" : "loading",
      driver: "—",
      eta: o.delivery_date ?? "—",
      progress: o.progress ?? 0,
    }));
    return orders.length > 0 ? orders : MOCK_ACTIVE;
  }, [allOrders]);

  const handleApprove = async (requestId: string, company: string, material: string, quantity: string, budget: string) => {
    if (!realRequestIds.has(requestId)) {
      toast({ title: "Demo data", description: "Submit a request from the Business dashboard to approve real requests.", variant: "destructive" });
      return;
    }
    try {
      await updateStatus.mutateAsync({ id: requestId, status: "approved" });
      const req = allRequests.find((r) => r.id === requestId);
      if (req) {
        await insertOrder.mutateAsync({
          request_id: requestId,
          business_user_id: req.business_user_id,
          material_type: material,
          quantity: String(req.quantity) + " " + (req.quantity_unit || "MT"),
          amount: budget,
          supplier: "Government",
        });
      }
      await logActivity.mutateAsync({ actor_role: "government", action: "Request approved", detail: `${company} - ${material}` });
      toast({ title: "Approved", description: `${company} request approved.` });
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      const isRls = /permission|policy|row-level|RLS|denied/i.test(msg);
      toast({
        title: "Approval failed",
        description: isRls
          ? "Your account may not have Government role set. Sign out and sign in again from the Government login, or set user_metadata.role = 'government' in Supabase Auth."
          : msg || "Try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string) => {
    if (!realRequestIds.has(requestId)) {
      toast({ title: "Demo data", description: "Submit a request from the Business dashboard to reject real requests.", variant: "destructive" });
      return;
    }
    try {
      await updateStatus.mutateAsync({ id: requestId, status: "rejected" });
      await logActivity.mutateAsync({ actor_role: "government", action: "Request rejected", detail: requestId });
      toast({ title: "Rejected", description: "Request rejected." });
    } catch (e) {
      console.error(e);
      toast({ title: "Rejection failed", description: e instanceof Error ? e.message : "Try again.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">{newRequests.length}</p>
          <p className="font-body text-xs text-cream/60">New Requests</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">{pendingApprovals.length}</p>
          <p className="font-body text-xs text-cream/60">Pending Approval</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">{activeDeliveries.length}</p>
          <p className="font-body text-xs text-cream/60">Active Deliveries</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="font-display text-2xl text-cream">24</p>
          <p className="font-body text-xs text-cream/60">Completed (This Month)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream/10 pb-4">
        {[
          { id: "new", label: "New Requests", count: newRequests.length },
          { id: "pending", label: "Pending Approvals", count: pendingApprovals.length },
          { id: "active", label: "Active Deliveries", count: activeDeliveries.length },
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
            <span className="ml-2 px-2 py-0.5 bg-cream/10 rounded-full text-xs">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* New Requests */}
      {activeTab === "new" && (
        <div className="space-y-4">
          {newRequests.map((request) => (
            <div key={request.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body text-xs text-cream/60">{request.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        request.matchScore >= 90
                          ? "bg-green-500/20 text-green-400"
                          : request.matchScore >= 80
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-cream/10 text-cream/60"
                      }`}
                    >
                      {request.matchScore}% Match
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-cream">{request.company}</h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-cream">{request.budget}</p>
                  <p className="font-body text-xs text-cream/60">Budget</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="font-body text-xs text-cream/60">Material</p>
                  <p className="font-body text-sm text-cream">{request.material}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Quantity</p>
                  <p className="font-body text-sm text-cream">{request.quantity}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Deadline</p>
                  <p className="font-body text-sm text-cream">{request.deadline}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Submitted</p>
                  <p className="font-body text-sm text-cream">{request.submittedDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-cream/10">
                <button className="btn-outline-elegant text-xs">
                  <Eye className="w-3 h-3 mr-1" /> View Details
                </button>
                <button className="btn-outline-elegant text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" /> Suggest Alternative
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => handleReject(request.id)}
                  disabled={updateStatus.isPending || !realRequestIds.has(request.id)}
                  className="btn-outline-elegant text-xs text-red-400 border-red-400/30 disabled:opacity-50"
                  title={!realRequestIds.has(request.id) ? "Demo data – submit from Business dashboard" : undefined}
                >
                  <XCircle className="w-3 h-3 mr-1" /> Reject
                </button>
                <button
                  onClick={() => handleApprove(request.id, request.company, request.material, request.quantity, request.budget)}
                  disabled={updateStatus.isPending || !realRequestIds.has(request.id)}
                  className="btn-elegant text-xs disabled:opacity-50"
                  title={!realRequestIds.has(request.id) ? "Demo data – submit a quota request from Business Marketplace" : "Approve this quota request"}
                >
                  {updateStatus.isPending ? "..." : <><CheckCircle className="w-3 h-3 mr-1" /> Approve Quota</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending Approvals */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="glass-card p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body text-xs text-cream/60">{item.id}</span>
                  <span className="badge-pending">{item.stage}</span>
                </div>
                <h3 className="font-display text-lg text-cream">{item.company}</h3>
                <p className="font-body text-sm text-cream/60">{item.material} • {item.quantity}</p>
              </div>
              <button className="btn-elegant text-sm">Complete Step</button>
            </div>
          ))}
        </div>
      )}

      {/* Active Deliveries */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-body text-xs text-cream/60">{delivery.id}</p>
                  <h3 className="font-display text-xl text-cream">{delivery.company}</h3>
                  <p className="font-body text-sm text-cream/60">{delivery.material} • {delivery.quantity}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      delivery.status === "in_transit" ? "bg-purple-500/20 text-purple-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {delivery.status === "in_transit" ? "In Transit" : "Loading"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-cream/60">Progress</span>
                  <span className="font-body text-xs text-cream">{delivery.progress}%</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${delivery.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-cream/60">
                  <Truck className="w-4 h-4 inline mr-1" /> {delivery.driver}
                </span>
                <span className="text-cream">ETA: {delivery.eta}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
