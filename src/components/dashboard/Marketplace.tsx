import { useState, useMemo } from "react";
import { Search, QrCode, Truck, ShieldCheck, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory, useInsertBusinessRequest } from "@/hooks/useDashboardData";
import type { InventoryItem } from "@/types/dashboard";

const MOCK_WASTE = [
  { id: 1, type: "Reclaimed Wood", quantity: 650, priceRange: "₹1,800 - 2,200", grade: "A" as const, location: "Bandhwari Landfill", deliveryTime: "15 days", qrCode: "WD-2847-A", available: true },
  { id: 2, type: "Metal / Steel", quantity: 520, priceRange: "₹2,000 - 2,400", grade: "A" as const, location: "Okhla Depot", deliveryTime: "10 days", qrCode: "MT-1923-A", available: true },
  { id: 3, type: "Plastic / PET", quantity: 380, priceRange: "₹1,500 - 2,000", grade: "B" as const, location: "Ghazipur", deliveryTime: "12 days", qrCode: "PL-3847-B", available: true },
  { id: 4, type: "Construction Debris", quantity: 450, priceRange: "₹800 - 1,200", grade: "B" as const, location: "Bandhwari Landfill", deliveryTime: "20 days", qrCode: "CD-9283-B", available: true },
  { id: 5, type: "Textile / Fabric", quantity: 470, priceRange: "₹1,200 - 1,800", grade: "A" as const, location: "Okhla Depot", deliveryTime: "14 days", qrCode: "TX-7462-A", available: true },
  { id: 6, type: "Electronic Waste", quantity: 177, priceRange: "₹3,000 - 5,000", grade: "C" as const, location: "Special Facility", deliveryTime: "25 days", qrCode: "EW-5829-C", available: false },
];

const categories = ["All", "Wood", "Metal", "Plastic", "Construction", "Textile", "Electronics"];
const grades = ["All", "A", "B", "C"];

type MarketplaceItemDisplay = {
  id: string;
  type: string;
  quantity: number;
  priceRange: string;
  grade: string;
  location: string;
  deliveryTime: string;
  qrCode: string;
  available: boolean;
};

function toMarketplaceItem(i: InventoryItem): MarketplaceItemDisplay {
  const priceRange = i.price_min != null || i.price_max != null
    ? `₹${i.price_min ?? "?"} - ${i.price_max ?? "?"}`
    : "Contact";
  return {
    id: i.id,
    type: i.category,
    quantity: Number(i.quantity),
    priceRange,
    grade: i.grade,
    location: i.location ?? "—",
    deliveryTime: "10–15 days",
    qrCode: i.qr_code ?? "—",
    available: i.status === "available",
  };
}

export function Marketplace() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [quotaModal, setQuotaModal] = useState<{
    item: MarketplaceItemDisplay;
    quantity: string;
    budget: string;
  } | null>(null);
  const { data: liveInventory = [] } = useInventory(true);
  const insertRequest = useInsertBusinessRequest();
  const wasteInventory = useMemo(() => {
    const fromDb = liveInventory.map(toMarketplaceItem);
    return fromDb.length > 0 ? fromDb : MOCK_WASTE.map((m) => ({ ...m, id: String(m.id) }));
  }, [liveInventory]);

  const filteredInventory = wasteInventory.filter((item) => {
    const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.type.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesGrade = selectedGrade === "All" || item.grade === selectedGrade;
    return matchesSearch && matchesCategory && matchesGrade;
  });

  const handleRequestQuota = (item: MarketplaceItemDisplay) => {
    setQuotaModal({
      item,
      quantity: String(Math.min(50, item.quantity) || 50),
      budget: "",
    });
  };

  const handleSubmitQuota = async () => {
    if (!quotaModal) return;
    const qty = parseInt(quotaModal.quantity, 10) || 50;
    if (qty <= 0) {
      toast({ title: "Invalid quantity", description: "Enter a positive quantity (MT).", variant: "destructive" });
      return;
    }
    try {
      await insertRequest.mutateAsync({
        material_type: quotaModal.item.type,
        quantity: qty,
        budget: quotaModal.budget ? `₹${quotaModal.budget}/MT` : quotaModal.item.priceRange,
      });
      toast({
        title: "Quota request submitted",
        description: "Government will review and approve. Check Company Requests on the government dashboard.",
      });
      setQuotaModal(null);
    } catch (e) {
      toast({
        title: "Request failed",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant-filled pl-12 w-full"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-elegant-filled w-full lg:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="input-elegant-filled w-full lg:w-32"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-cream/10">
          <div>
            <p className="font-body text-xs text-cream/60">Total Available</p>
            <p className="font-display text-xl text-cream">2,847 MT</p>
          </div>
          <div>
            <p className="font-body text-xs text-cream/60">Categories</p>
            <p className="font-display text-xl text-cream">6 Types</p>
          </div>
          <div>
            <p className="font-body text-xs text-cream/60">Avg Price</p>
            <p className="font-display text-xl text-cream">₹1,850/MT</p>
          </div>
          <div>
            <p className="font-body text-xs text-cream/60">Active Orders</p>
            <p className="font-display text-xl text-cream">8</p>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className={`glass-card p-6 ${!item.available ? "opacity-60" : ""}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-xl text-cream">{item.type}</h3>
                <p className="font-body text-xs text-cream/60">{item.location}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-body ${
                  item.grade === "A"
                    ? "bg-green-500/20 text-green-400"
                    : item.grade === "B"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                Grade {item.grade}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-cream/60">Quantity</span>
                <span className="font-body text-sm text-cream">{item.quantity} MT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-cream/60">Price</span>
                <span className="font-display text-lg text-cream">{item.priceRange}/MT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-cream/60 flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Delivery
                </span>
                <span className="font-body text-sm text-cream">{item.deliveryTime}</span>
              </div>
            </div>

            {/* QR & Verification */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-cream/5 rounded-lg">
              <QrCode className="w-5 h-5 text-cream/60" />
              <span className="font-body text-xs text-cream/60">QR: {item.qrCode}</span>
              <ShieldCheck className="w-4 h-4 text-green-400 ml-auto" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                disabled={!item.available}
                onClick={() => item.available && handleRequestQuota(item)}
                className="btn-elegant flex-1 text-center text-sm disabled:opacity-50"
              >
                {item.available ? "Request Quota" : "Sold Out"}
              </button>
              <button className="btn-outline-elegant px-4">
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Quota modal */}
      {quotaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={() => setQuotaModal(null)}>
          <div className="glass-card p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-cream mb-1">Request Quota</h3>
            <p className="font-body text-sm text-cream/60 mb-4">{quotaModal.item.type} • Grade {quotaModal.item.grade}</p>
            <div className="space-y-4">
              <div>
                <label className="info-label block mb-2">Quantity (MT)</label>
                <input
                  type="number"
                  min={1}
                  max={quotaModal.item.quantity}
                  className="input-elegant-filled w-full"
                  value={quotaModal.quantity}
                  onChange={(e) => setQuotaModal((m) => m ? { ...m, quantity: e.target.value } : null)}
                />
                <p className="font-body text-xs text-cream/50 mt-1">Available: {quotaModal.item.quantity} MT</p>
              </div>
              <div>
                <label className="info-label block mb-2">Budget (₹/MT, optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  className="input-elegant-filled w-full"
                  value={quotaModal.budget}
                  onChange={(e) => setQuotaModal((m) => m ? { ...m, budget: e.target.value } : null)}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setQuotaModal(null)} className="btn-outline-elegant flex-1">
                Cancel
              </button>
              <button
                onClick={handleSubmitQuota}
                disabled={insertRequest.isPending}
                className="btn-elegant flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {insertRequest.isPending ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Request</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
