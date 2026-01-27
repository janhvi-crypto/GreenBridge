import { useState } from "react";
import { Search, Filter, Package, QrCode, Truck, Star, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inventoryListings = [
  {
    id: 1,
    name: "Grade A Reclaimed Wood",
    category: "Wood",
    quantity: 650,
    priceRange: "₹1,800-2,200/MT",
    price: 2000,
    grade: "A",
    location: "Bandhwari, Sector 32",
    carbonOffset: "780 MT CO₂e",
    deliveryTime: "15 days",
    supplier: "Delhi MCD",
    inStock: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Premium Metal Scrap",
    category: "Metal",
    quantity: 520,
    priceRange: "₹2,000-2,400/MT",
    price: 2200,
    grade: "A",
    location: "Okhla Industrial",
    carbonOffset: "936 MT CO₂e",
    deliveryTime: "10 days",
    supplier: "South Delhi MCD",
    inStock: true,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Processed Plastic/PET",
    category: "Plastic",
    quantity: 380,
    priceRange: "₹1,500-2,000/MT",
    price: 1800,
    grade: "B",
    location: "Ghazipur",
    carbonOffset: "798 MT CO₂e",
    deliveryTime: "12 days",
    supplier: "East Delhi MCD",
    inStock: true,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Construction Aggregate",
    category: "Construction",
    quantity: 450,
    priceRange: "₹800-1,200/MT",
    price: 1000,
    grade: "B",
    location: "Narela",
    carbonOffset: "225 MT CO₂e",
    deliveryTime: "7 days",
    supplier: "North Delhi MCD",
    inStock: true,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Textile Fiber Mix",
    category: "Textile",
    quantity: 470,
    priceRange: "₹1,200-1,800/MT",
    price: 1500,
    grade: "A",
    location: "Seelampur",
    carbonOffset: "423 MT CO₂e",
    deliveryTime: "14 days",
    supplier: "North East Delhi MCD",
    inStock: true,
    rating: 4.7,
  },
  {
    id: 6,
    name: "E-Waste Components",
    category: "Electronics",
    quantity: 177,
    priceRange: "₹3,000-5,000/MT",
    price: 4000,
    grade: "A",
    location: "Mayapuri",
    carbonOffset: "566 MT CO₂e",
    deliveryTime: "20 days",
    supplier: "West Delhi MCD",
    inStock: false,
    rating: 4.9,
  },
];

const categories = ["All Categories", "Wood", "Metal", "Plastic", "Construction", "Textile", "Electronics"];
const grades = ["All Grades", "A", "B", "C"];

export function Marketplace() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [qtyRange, setQtyRange] = useState({ min: 0, max: 1000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredListings = inventoryListings.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesGrade = selectedGrade === "All Grades" || item.grade === selectedGrade;
    const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
    const matchesQty = item.quantity >= qtyRange.min && item.quantity <= qtyRange.max;
    const matchesStock = !inStockOnly || item.inStock;
    return matchesSearch && matchesCategory && matchesGrade && matchesPrice && matchesQty && matchesStock;
  });

  const handleRequestQuote = (itemId: number) => {
    toast({
      title: "Quote Requested",
      description: "The supplier will respond within 24-48 hours.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-cream">Marketplace</h2>
        <p className="font-body text-sm text-cream/60">Browse available waste materials from verified government sources</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant-filled pl-12 w-full"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-elegant-filled w-full appearance-none pr-10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-forest-dark text-cream">{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input-elegant-filled w-full appearance-none pr-10"
            >
              {grades.map((grade) => (
                <option key={grade} value={grade} className="bg-forest-dark text-cream">{grade}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40 pointer-events-none" />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-cream/20 bg-cream/5 text-cream"
            />
            <label htmlFor="inStock" className="font-body text-sm text-cream/80">In Stock Only</label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="info-label block mb-2">Price Range (₹/MT)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min || ""}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className="input-elegant-filled w-full"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max === 10000 ? "" : priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 10000 })}
                className="input-elegant-filled w-full"
              />
            </div>
          </div>
          <div>
            <label className="info-label block mb-2">Quantity Range (MT)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={qtyRange.min || ""}
                onChange={(e) => setQtyRange({ ...qtyRange, min: Number(e.target.value) })}
                className="input-elegant-filled w-full"
              />
              <input
                type="number"
                placeholder="Max"
                value={qtyRange.max === 1000 ? "" : qtyRange.max}
                onChange={(e) => setQtyRange({ ...qtyRange, max: Number(e.target.value) || 1000 })}
                className="input-elegant-filled w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div key={item.id} className="glass-card overflow-hidden animate-scale-in">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cream">{item.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${item.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.inStock ? "In Stock" : "Reserved"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-body text-sm text-cream">{item.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-body text-xs text-cream/60">Quantity</p>
                  <p className="font-display text-lg text-cream">{item.quantity} MT</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Price</p>
                  <p className="font-display text-lg text-cream">{item.priceRange}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Grade</p>
                  <p className="font-body text-cream">Grade {item.grade}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-cream/60">Carbon Offset</p>
                  <p className="font-body text-green-400">{item.carbonOffset}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cream/60 mb-4">
                <Truck className="w-4 h-4" />
                <span className="font-body text-sm">{item.deliveryTime} delivery</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-cream/60">
                <QrCode className="w-4 h-4" />
                <span className="font-body text-sm">Blockchain verified</span>
              </div>

              <div className="font-body text-xs text-cream/40 mb-4">
                {item.location} • {item.supplier}
              </div>

              <button
                onClick={() => handleRequestQuote(item.id)}
                disabled={!item.inStock}
                className={`w-full ${item.inStock ? "btn-elegant" : "btn-outline-elegant opacity-50 cursor-not-allowed"}`}
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Package className="w-16 h-16 text-cream/20 mx-auto mb-4" />
          <p className="font-display text-xl text-cream mb-2">No materials found</p>
          <p className="font-body text-cream/60">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
