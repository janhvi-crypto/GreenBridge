import { useState } from "react";
import { Package, Truck, CheckCircle, Clock, MapPin, FileText, RefreshCw } from "lucide-react";

const activeOrders = [
  {
    id: "ORD-2847",
    material: "Reclaimed Wood",
    quantity: "75 MT",
    status: "in_transit",
    supplier: "Delhi MCD",
    deliveryDate: "Feb 15, 2026",
    amount: "₹13.5L",
    progress: 65,
    driver: "Ramesh Kumar",
    eta: "2 days",
  },
  {
    id: "ORD-2846",
    material: "Metal / Steel",
    quantity: "50 MT",
    status: "processing",
    supplier: "Haryana PWD",
    deliveryDate: "Feb 20, 2026",
    amount: "₹10.0L",
    progress: 35,
    driver: "Pending Assignment",
    eta: "7 days",
  },
  {
    id: "ORD-2845",
    material: "Plastic / PET",
    quantity: "100 MT",
    status: "quality_check",
    supplier: "Delhi MCD",
    deliveryDate: "Feb 10, 2026",
    amount: "₹18.0L",
    progress: 85,
    driver: "Suresh Patel",
    eta: "1 day",
  },
];

const orderHistory = [
  {
    id: "ORD-2840",
    material: "Construction Debris",
    quantity: "200 MT",
    status: "delivered",
    date: "Jan 28, 2026",
    amount: "₹20.0L",
  },
  {
    id: "ORD-2835",
    material: "Textile / Fabric",
    quantity: "60 MT",
    status: "delivered",
    date: "Jan 15, 2026",
    amount: "₹9.0L",
  },
  {
    id: "ORD-2830",
    material: "Reclaimed Wood",
    quantity: "45 MT",
    status: "delivered",
    date: "Jan 5, 2026",
    amount: "₹8.1L",
  },
];

const recurringOrders = [
  {
    material: "Plastic / PET",
    quantity: "50 MT",
    frequency: "Monthly",
    nextDelivery: "Mar 1, 2026",
    discount: "10%",
    active: true,
  },
  {
    material: "Reclaimed Wood",
    quantity: "30 MT",
    frequency: "Bi-weekly",
    nextDelivery: "Feb 14, 2026",
    discount: "15%",
    active: true,
  },
];

const statusConfig = {
  processing: { label: "Processing", color: "bg-yellow-500", icon: Clock },
  quality_check: { label: "Quality Check", color: "bg-blue-500", icon: CheckCircle },
  in_transit: { label: "In Transit", color: "bg-purple-500", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle },
};

export function OrderManagement() {
  const [activeTab, setActiveTab] = useState<"active" | "history" | "recurring">("active");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream/10 pb-4">
        {[
          { id: "active", label: "Active Orders", count: activeOrders.length },
          { id: "history", label: "Order History", count: orderHistory.length },
          { id: "recurring", label: "Recurring Orders", count: recurringOrders.length },
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
            <span className="ml-2 px-2 py-0.5 bg-cream/10 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Active Orders */}
      {activeTab === "active" && (
        <div className="space-y-6">
          {activeOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
            return (
              <div key={order.id} className="glass-card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-cream" />
                    </div>
                    <div>
                      <p className="font-display text-xl text-cream">{order.material}</p>
                      <p className="font-body text-sm text-cream/60">
                        {order.id} • {order.quantity} • {order.supplier}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-body flex items-center gap-2 ${
                        statusConfig[order.status as keyof typeof statusConfig].color
                      }/20 text-cream`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </span>
                    <span className="font-display text-xl text-cream">{order.amount}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs text-cream/60">Order Progress</span>
                    <span className="font-body text-xs text-cream">{order.progress}%</span>
                  </div>
                  <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusConfig[order.status as keyof typeof statusConfig].color} rounded-full transition-all`}
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-cream/10">
                  <div>
                    <p className="font-body text-xs text-cream/60">Delivery Date</p>
                    <p className="font-body text-sm text-cream">{order.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">Driver</p>
                    <p className="font-body text-sm text-cream">{order.driver}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">ETA</p>
                    <p className="font-body text-sm text-cream">{order.eta}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline-elegant text-xs px-3 py-1">
                      <MapPin className="w-3 h-3 mr-1" /> Track
                    </button>
                    <button className="btn-outline-elegant text-xs px-3 py-1">
                      <FileText className="w-3 h-3 mr-1" /> Invoice
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order History */}
      {activeTab === "history" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream/5">
              <tr>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Order ID</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Material</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Quantity</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Date</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Amount</th>
                <th className="text-left p-4 font-body text-xs text-cream/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id} className="border-t border-cream/10">
                  <td className="p-4 font-body text-sm text-cream">{order.id}</td>
                  <td className="p-4 font-body text-sm text-cream">{order.material}</td>
                  <td className="p-4 font-body text-sm text-cream">{order.quantity}</td>
                  <td className="p-4 font-body text-sm text-cream/60">{order.date}</td>
                  <td className="p-4 font-display text-cream">{order.amount}</td>
                  <td className="p-4">
                    <button className="btn-outline-elegant text-xs px-3 py-1">
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recurring Orders */}
      {activeTab === "recurring" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="btn-elegant text-sm">
              <RefreshCw className="w-4 h-4 mr-2" /> Set Up New Recurring Order
            </button>
          </div>
          {recurringOrders.map((order, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl text-cream">{order.material}</h3>
                  <p className="font-body text-sm text-cream/60">
                    {order.quantity} • {order.frequency}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="badge-approved">{order.discount} OFF</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={order.active} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-cream/20 peer-checked:bg-green-500 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-cream after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2 text-cream/60">
                <Clock className="w-4 h-4" />
                <span className="font-body text-sm">Next delivery: {order.nextDelivery}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
