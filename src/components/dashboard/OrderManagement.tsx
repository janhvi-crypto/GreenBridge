import { useState } from "react";
import { Package, Truck, CheckCircle, Clock, MapPin, RefreshCw, Download, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const activeOrders = [
  {
    id: "ORD-2026-001",
    material: "Reclaimed Wood",
    quantity: 75,
    status: "in_transit",
    statusLabel: "In Transit",
    supplier: "Delhi MCD (Bandhwari)",
    amount: "₹13.5L",
    orderedDate: "Jan 15, 2026",
    expectedDelivery: "Jan 30, 2026",
    driver: "Rajesh Kumar",
    driverPhone: "+91 98765 43210",
    currentLocation: "Gurgaon Highway, Near Sector 56",
  },
  {
    id: "ORD-2026-002",
    material: "Metal Scrap",
    quantity: 50,
    status: "quality_check",
    statusLabel: "Quality Check",
    supplier: "South Delhi MCD",
    amount: "₹11.0L",
    orderedDate: "Jan 18, 2026",
    expectedDelivery: "Feb 02, 2026",
    driver: null,
    driverPhone: null,
    currentLocation: "Supplier Warehouse",
  },
  {
    id: "ORD-2026-003",
    material: "Plastic/PET",
    quantity: 100,
    status: "processing",
    statusLabel: "Processing",
    supplier: "East Delhi MCD",
    amount: "₹18.0L",
    orderedDate: "Jan 20, 2026",
    expectedDelivery: "Feb 05, 2026",
    driver: null,
    driverPhone: null,
    currentLocation: "Ghazipur Processing Center",
  },
];

const orderHistory = [
  { id: "ORD-2025-089", material: "Textile Fiber", quantity: 60, amount: "₹9.0L", date: "Dec 15, 2025", status: "delivered" },
  { id: "ORD-2025-078", material: "Construction Debris", quantity: 200, amount: "₹20.0L", date: "Nov 28, 2025", status: "delivered" },
  { id: "ORD-2025-067", material: "Reclaimed Wood", quantity: 45, amount: "₹8.1L", date: "Nov 10, 2025", status: "delivered" },
  { id: "ORD-2025-056", material: "Metal Scrap", quantity: 80, amount: "₹17.6L", date: "Oct 22, 2025", status: "delivered" },
];

const recurringOrders = [
  { id: "REC-001", material: "Plastic/PET", quantity: 50, frequency: "Monthly", nextDelivery: "Feb 15, 2026", discount: "15%", active: true },
  { id: "REC-002", material: "Reclaimed Wood", quantity: 30, frequency: "Bi-weekly", nextDelivery: "Feb 01, 2026", discount: "10%", active: true },
];

const statusConfig = {
  processing: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
  quality_check: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: CheckCircle },
  in_transit: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Truck },
  delivered: { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle },
};

export function OrderManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"active" | "history" | "recurring">("active");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for ${orderId} has been downloaded.`,
    });
  };

  const handleCancelRecurring = (orderId: string) => {
    toast({
      title: "Order Cancelled",
      description: `Recurring order ${orderId} has been cancelled.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Order Management</h2>
        <p className="font-body text-sm text-cream/60">Track and manage your material orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">8</p>
          <p className="font-body text-xs text-cream/60">Active Orders</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-purple-400">3</p>
          <p className="font-body text-xs text-cream/60">In Transit</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-green-400">45</p>
          <p className="font-body text-xs text-cream/60">Completed (YTD)</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">₹2.4 Cr</p>
          <p className="font-body text-xs text-cream/60">Total Value</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream/10 pb-2">
        {[
          { id: "active", label: "Active Orders" },
          { id: "history", label: "Order History" },
          { id: "recurring", label: "Recurring Orders" },
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

      {/* Active Orders */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isExpanded = selectedOrder === order.id;

            return (
              <div key={order.id} className="glass-card overflow-hidden">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-cream" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-lg text-cream">{order.material}</h3>
                          <span className="font-body text-sm text-cream/60">• {order.quantity} MT</span>
                        </div>
                        <p className="font-body text-sm text-cream/60">{order.id} • {order.supplier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-display text-lg text-cream">{order.amount}</p>
                        <p className="font-body text-xs text-cream/60">Expected: {order.expectedDelivery}</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-body text-sm">{order.statusLabel}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-cream/40 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-cream/10 pt-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="font-body text-xs text-cream/60 mb-1">Order Timeline</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="font-body text-sm text-cream">Ordered: {order.orderedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-4 h-4 ${order.status === "in_transit" ? "text-purple-400" : "text-yellow-400"}`} />
                            <span className="font-body text-sm text-cream">{order.statusLabel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cream/40" />
                            <span className="font-body text-sm text-cream/60">Delivery: {order.expectedDelivery}</span>
                          </div>
                        </div>
                      </div>
                      
                      {order.status === "in_transit" && (
                        <div>
                          <p className="font-body text-xs text-cream/60 mb-1">Tracking Details</p>
                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-cream/60 mt-0.5" />
                            <span className="font-body text-sm text-cream">{order.currentLocation}</span>
                          </div>
                          {order.driver && (
                            <div className="font-body text-sm text-cream/60">
                              Driver: {order.driver} ({order.driverPhone})
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <button className="btn-outline-elegant text-sm py-2 flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Track on Map
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDownloadInvoice(order.id); }}
                          className="btn-outline-elegant text-sm py-2 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Order History */}
      {activeTab === "history" && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream/10">
                  <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Order ID</th>
                  <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Material</th>
                  <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Quantity</th>
                  <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Amount</th>
                  <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Date</th>
                  <th className="text-right p-4 font-body text-xs uppercase tracking-wider text-cream/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id} className="border-b border-cream/5 hover:bg-cream/5 transition-colors">
                    <td className="p-4 font-body text-sm text-cream">{order.id}</td>
                    <td className="p-4 font-body text-sm text-cream">{order.material}</td>
                    <td className="p-4 font-body text-sm text-cream">{order.quantity} MT</td>
                    <td className="p-4 font-display text-sm text-cream">{order.amount}</td>
                    <td className="p-4 font-body text-sm text-cream/60">{order.date}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="text-cream/60 hover:text-cream transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recurring Orders */}
      {activeTab === "recurring" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="btn-elegant flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Set Up Recurring Order
            </button>
          </div>
          {recurringOrders.map((order) => (
            <div key={order.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cream">{order.material}</h3>
                    <p className="font-body text-sm text-cream/60">{order.quantity} MT • {order.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-body text-sm text-green-400">{order.discount} discount applied</p>
                    <p className="font-body text-xs text-cream/60">Next: {order.nextDelivery}</p>
                  </div>
                  <button
                    onClick={() => handleCancelRecurring(order.id)}
                    className="btn-outline-elegant text-sm py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
