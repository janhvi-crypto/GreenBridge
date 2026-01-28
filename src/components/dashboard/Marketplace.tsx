import { useState } from "react";
import { Search, Filter, QrCode, Truck, ShieldCheck } from "lucide-react";

const wasteInventory = [
  {
    id: 1,
    type: "Reclaimed Wood",
    quantity: 650,
    priceRange: "₹1,800 - 2,200",
    grade: "A",
    location: "Bandhwari Landfill",
    deliveryTime: "15 days",
    qrCode: "WD-2847-A",
    available: true,
  },
  {
    id: 2,
    type: "Metal / Steel",
    quantity: 520,
    priceRange: "₹2,000 - 2,400",
    grade: "A",
    location: "Okhla Depot",
    deliveryTime: "10 days",
    qrCode: "MT-1923-A",
    available: true,
  },
  {
    id: 3,
    type: "Plastic / PET",
    quantity: 380,
    priceRange: "₹1,500 - 2,000",
    grade: "B",
    location: "Ghazipur",
    deliveryTime: "12 days",
    qrCode: "PL-3847-B",
    available: true,
  },
  {
    id: 4,
    type: "Construction Debris",
    quantity: 450,
    priceRange: "₹800 - 1,200",
    grade: "B",
    location: "Bandhwari Landfill",
    deliveryTime: "20 days",
    qrCode: "CD-9283-B",
    available: true,
  },
  {
    id: 5,
    type: "Textile / Fabric",
    quantity: 470,
    priceRange: "₹1,200 - 1,800",
    grade: "A",
    location: "Okhla Depot",
    deliveryTime: "14 days",
    qrCode: "TX-7462-A",
    available: true,
  },
  {
    id: 6,
    type: "Electronic Waste",
    quantity: 177,
    priceRange: "₹3,000 - 5,000",
    grade: "C",
    location: "Special Facility",
    deliveryTime: "25 days",
    qrCode: "EW-5829-C",
    available: false,
  },
];

const categories = ["All", "Wood", "Metal", "Plastic", "Construction", "Textile", "Electronics"];
const grades = ["All", "A", "B", "C"];

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [quantityRange, setQuantityRange] = useState([0, 1000]);

  const filteredInventory = wasteInventory.filter((item) => {
    const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.type.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesGrade = selectedGrade === "All" || item.grade === selectedGrade;
    return matchesSearch && matchesCategory && matchesGrade;
  });

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
                className="btn-elegant flex-1 text-center text-sm"
              >
                {item.available ? "Request Quote" : "Sold Out"}
              </button>
              <button className="btn-outline-elegant px-4">
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
