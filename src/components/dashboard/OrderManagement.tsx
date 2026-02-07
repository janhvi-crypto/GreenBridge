import { useState, useMemo } from "react";
import { Package, Truck, CheckCircle, Clock, MapPin, FileText, RefreshCw, QrCode } from "lucide-react";
import { useOrders } from "@/hooks/useDashboardData";
import * as api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const MOCK_ACTIVE = [
  { id: "ORD-2847", material: "Reclaimed Wood", quantity: "75 MT", status: "in_transit", supplier: "Delhi MCD", deliveryDate: "Feb 15, 2026", amount: "₹13.5L", progress: 65, driver: "Ramesh Kumar", eta: "2 days" },
  { id: "ORD-2846", material: "Metal / Steel", quantity: "50 MT", status: "processing", supplier: "Haryana PWD", deliveryDate: "Feb 20, 2026", amount: "₹10.0L", progress: 35, driver: "Pending Assignment", eta: "7 days" },
];
const MOCK_HISTORY = [
  { id: "ORD-2840", material: "Construction Debris", quantity: "200 MT", status: "delivered", date: "Jan 28, 2026", amount: "₹20.0L" },
  { id: "ORD-2835", material: "Textile / Fabric", quantity: "60 MT", status: "delivered", date: "Jan 15, 2026", amount: "₹9.0L" },
];
const recurringOrders = [
  { material: "Plastic / PET", quantity: "50 MT", frequency: "Monthly", nextDelivery: "Mar 1, 2026", discount: "10%", active: true },
  { material: "Reclaimed Wood", quantity: "30 MT", frequency: "Bi-weekly", nextDelivery: "Feb 14, 2026", discount: "15%", active: true },
];

const statusConfig = {
  processing: { label: "Processing", color: "bg-yellow-500", icon: Clock },
  quality_check: { label: "Quality Check", color: "bg-blue-500", icon: CheckCircle },
  in_transit: { label: "In Transit", color: "bg-purple-500", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle },
};

export function OrderManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"active" | "history" | "recurring">("active");
  const [invoiceModal, setInvoiceModal] = useState<{ orderId: string; amount: string; material: string; supplier: string } | null>(null);
  const [qrModal, setQrModal] = useState<{ orderId: string; payload: string } | null>(null);
  const [invoiceResult, setInvoiceResult] = useState<api.InvoiceResult | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: myOrders = [] } = useOrders(true);
  const activeOrders = useMemo(() => {
    const active = myOrders.filter((o) => o.status !== "delivered").map((o) => ({
      id: o.id,
      material: o.material_type,
      quantity: o.quantity,
      status: o.status,
      supplier: o.supplier ?? "Government",
      deliveryDate: o.delivery_date ?? "—",
      amount: o.amount ?? "—",
      progress: o.progress ?? 0,
      driver: "—",
      eta: "—",
    }));
    return active.length > 0 ? active : MOCK_ACTIVE;
  }, [myOrders]);
  const orderHistory = useMemo(() => {
    const delivered = myOrders.filter((o) => o.status === "delivered").map((o) => ({
      id: o.id,
      material: o.material_type,
      quantity: o.quantity,
      status: "delivered" as const,
      date: o.updated_at.slice(0, 10),
      amount: o.amount ?? "—",
    }));
    return delivered.length > 0 ? delivered : MOCK_HISTORY;
  }, [myOrders]);

  const handleInvoice = async (order: { id: string; material: string; amount: string; supplier?: string }) => {
    setInvoiceModal({ orderId: order.id, amount: order.amount, material: order.material, supplier: order.supplier ?? "Government" });
    setInvoiceResult(null);
    setLoading(true);
    try {
      const res = await api.generateInvoice({
        orderId: order.id,
        amount: order.amount,
        items: [{ material: order.material, quantity: "-" }],
        supplier: order.supplier ?? "Government",
      });
      setInvoiceResult(res);
    } catch (e) {
      toast({ title: "Invoice failed", description: e instanceof Error ? e.message : "Is the API server running? (npm run api)", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleQr = async (order: { id: string; material: string; quantity: string }) => {
    setQrModal({ orderId: order.id, payload: JSON.stringify({ type: "order", id: order.id, material: order.material, quantity: order.quantity }) });
    setQrDataUrl(null);
    setLoading(true);
    try {
      const res = await api.generateQR({
        payload: { type: "order", id: order.id, material: order.material, quantity: order.quantity },
        size: 256,
      });
      setQrDataUrl(res.qrDataUrl);
    } catch (e) {
      toast({ title: "QR failed", description: e instanceof Error ? e.message : "Is the API server running? (npm run api)", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
                    <button
                      onClick={() => handleInvoice({ id: order.id, material: order.material, amount: order.amount, supplier: order.supplier })}
                      className="btn-outline-elegant text-xs px-3 py-1"
                    >
                      <FileText className="w-3 h-3 mr-1" /> Invoice
                    </button>
                    <button
                      onClick={() => handleQr({ id: order.id, material: order.material, quantity: order.quantity })}
                      className="btn-outline-elegant text-xs px-3 py-1"
                    >
                      <QrCode className="w-3 h-3 mr-1" /> QR
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
                    <button
                      onClick={() => handleInvoice({ id: order.id, material: order.material, amount: order.amount })}
                      className="btn-outline-elegant text-xs px-3 py-1 mr-1"
                    >
                      <FileText className="w-3 h-3 mr-1 inline" /> Invoice
                    </button>
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

      {/* Invoice Modal */}
      {invoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setInvoiceModal(null)}>
          <div className="glass-card p-6 max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-cream mb-4">Invoice</h3>
            {loading && <p className="text-cream/60 text-sm">Generating...</p>}
            {invoiceResult && (
              <div className="space-y-3 text-sm">
                <p><span className="text-cream/60">Order:</span> {invoiceResult.orderId}</p>
                <p><span className="text-cream/60">Amount:</span> {invoiceResult.amount}</p>
                <p><span className="text-cream/60">Date:</span> {invoiceResult.date}</p>
                <p><span className="text-cream/60">Supplier:</span> {invoiceResult.supplier}</p>
                {invoiceResult.invoiceImageUrl && (
                  <a href={invoiceResult.invoiceImageUrl} target="_blank" rel="noreferrer" className="text-green-400 underline">View invoice image</a>
                )}
                <p className="text-cream/50 text-xs mt-2">{invoiceResult.message}</p>
              </div>
            )}
            <button onClick={() => setInvoiceModal(null)} className="btn-outline-elegant w-full mt-4">Close</button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setQrModal(null)}>
          <div className="glass-card p-6 max-w-sm w-full animate-scale-in text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-cream mb-4">Order QR Code</h3>
            {loading && <p className="text-cream/60 text-sm">Generating...</p>}
            {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-48 h-48 mx-auto rounded-lg bg-white p-2" />}
            <p className="font-mono text-xs text-cream/60 mt-3 break-all">{qrModal?.orderId}</p>
            <button onClick={() => setQrModal(null)} className="btn-outline-elegant w-full mt-4">Close</button>
          </div>
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
