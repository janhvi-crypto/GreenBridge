import { useState } from "react";
import { Search, Plus, Filter, Package, Edit2, Trash2, ChevronDown, Upload, Camera, QrCode, CheckCircle, Sparkles } from "lucide-react";

const inventoryData = [
  { id: 1, category: "Reclaimed Wood", quantity: 650, unit: "MT", grade: "A", price: "₹1,800-2,200", location: "Bandhwari Landfill", status: "available", qrCode: "WD-2847-A", lastUpdated: "2026-01-25" },
  { id: 2, category: "Metal / Steel", quantity: 520, unit: "MT", grade: "A", price: "₹2,000-2,400", location: "Okhla Depot", status: "available", qrCode: "MT-1923-A", lastUpdated: "2026-01-24" },
  { id: 3, category: "Plastic / PET", quantity: 380, unit: "MT", grade: "B", price: "₹1,500-2,000", location: "Ghazipur", status: "reserved", qrCode: "PL-3847-B", lastUpdated: "2026-01-23" },
  { id: 4, category: "Construction Debris", quantity: 450, unit: "MT", grade: "B", price: "₹800-1,200", location: "Bandhwari Landfill", status: "available", qrCode: "CD-9283-B", lastUpdated: "2026-01-22" },
  { id: 5, category: "Textile / Fabric", quantity: 470, unit: "MT", grade: "A", price: "₹1,200-1,800", location: "Okhla Depot", status: "available", qrCode: "TX-7462-A", lastUpdated: "2026-01-21" },
  { id: 6, category: "Electronic Waste", quantity: 177, unit: "MT", grade: "C", price: "₹3,000-5,000", location: "Special Facility", status: "processing", qrCode: "EW-5829-C", lastUpdated: "2026-01-20" },
];

const categories = ["All Categories", "Reclaimed Wood", "Metal / Steel", "Plastic / PET", "Construction Debris", "Textile / Fabric", "Electronic Waste"];

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadStep, setUploadStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch = item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const simulateAIAnalysis = () => {
    setUploadStep("analyzing");
    setTimeout(() => {
      setAnalysisResults({
        category: "Plastic / PET",
        confidence: 96,
        contamination: 3,
        grade: "A",
        suggestedPrice: "₹1,700-1,900",
        quantity: "100-150 MT",
        quality: "High purity, suitable for food-grade containers",
      });
      setUploadStep("results");
    }, 2500);
  };

  const resetModal = () => {
    setShowAddModal(false);
    setUploadStep("upload");
    setAnalysisResults(null);
  };

  const totalQuantity = inventoryData.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cream">Inventory Management</h2>
          <p className="font-body text-sm text-cream/60">Upload, track, and certify landfill waste inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-elegant flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          Add New Waste Batch
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">{totalQuantity.toLocaleString()}</p>
          <p className="font-body text-xs text-cream/60">Total MT Available</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">6</p>
          <p className="font-body text-xs text-cream/60">Categories</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-green-400">4</p>
          <p className="font-body text-xs text-cream/60">Available</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-yellow-400">1</p>
          <p className="font-body text-xs text-cream/60">Reserved</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-blue-400">1</p>
          <p className="font-body text-xs text-cream/60">Processing</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">12</p>
          <p className="font-body text-xs text-cream/60">Companies Interested</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant-filled pl-12 w-full"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-elegant-filled pl-12 pr-10 appearance-none cursor-pointer min-w-[200px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-forest-dark text-cream">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/10 bg-cream/5">
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Category</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Quantity</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Grade</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60 hidden md:table-cell">Price/MT</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60 hidden lg:table-cell">Location</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">QR Code</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Status</th>
                <th className="text-right p-4 font-body text-xs uppercase tracking-wider text-cream/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-cream/5 hover:bg-cream/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-cream" />
                      </div>
                      <span className="font-body text-sm text-cream">{item.category}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-display text-lg text-cream">{item.quantity.toLocaleString()}</span>
                    <span className="font-body text-sm text-cream/60 ml-1">{item.unit}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-body ${
                      item.grade === "A" ? "bg-green-500/20 text-green-400" :
                      item.grade === "B" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      Grade {item.grade}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="font-body text-sm text-cream">{item.price}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="font-body text-sm text-cream/80">{item.location}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-cream/60" />
                      <span className="font-mono text-xs text-cream/80">{item.qrCode}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-body capitalize
                      ${item.status === "available" ? "bg-green-500/20 text-green-400" : ""}
                      ${item.status === "reserved" ? "bg-yellow-500/20 text-yellow-400" : ""}
                      ${item.status === "processing" ? "bg-blue-500/20 text-blue-400" : ""}
                    `}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors" title="View QR">
                        <QrCode className="w-4 h-4 text-cream/60 hover:text-cream" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-cream/60 hover:text-cream" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-cream/60 hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entry Modal with AI Analysis */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Add New Waste Batch
            </h3>

            {uploadStep === "upload" && (
              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="info-label block mb-3">Upload Photos (AI Analysis)</label>
                  <div 
                    onClick={simulateAIAnalysis}
                    className="border-2 border-dashed border-cream/30 rounded-lg p-8 text-center cursor-pointer hover:border-cream/50 hover:bg-cream/5 transition-all"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-cream/10 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-cream/60" />
                      </div>
                      <div>
                        <p className="font-body text-sm text-cream">Upload 3-5 photos of the waste batch</p>
                        <p className="font-body text-xs text-cream/60 mt-1">AI will auto-categorize and suggest pricing</p>
                      </div>
                      <button className="btn-outline-elegant text-xs mt-2">
                        <Upload className="w-3 h-3 mr-1" /> Choose Files
                      </button>
                    </div>
                  </div>
                </div>

                <p className="font-body text-xs text-cream/40 text-center">
                  Click above to simulate AI photo analysis
                </p>
              </div>
            )}

            {uploadStep === "analyzing" && (
              <div className="py-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream/10 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-cream/20 border-t-cream rounded-full animate-spin" />
                </div>
                <p className="font-display text-xl text-cream mb-2">Analyzing Photos...</p>
                <p className="font-body text-sm text-cream/60">AI is detecting waste type and quality</p>
              </div>
            )}

            {uploadStep === "results" && analysisResults && (
              <div className="space-y-6">
                {/* AI Results */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-body text-sm text-green-400">AI Analysis Complete</span>
                    <span className="ml-auto font-body text-xs text-cream/60">{analysisResults.confidence}% confidence</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-cream/60 text-xs">Detected Category</p>
                      <p className="text-cream font-medium">{analysisResults.category}</p>
                    </div>
                    <div>
                      <p className="text-cream/60 text-xs">Quality Grade</p>
                      <p className="text-cream font-medium">Grade {analysisResults.grade}</p>
                    </div>
                    <div>
                      <p className="text-cream/60 text-xs">Contamination</p>
                      <p className="text-cream font-medium">{analysisResults.contamination}%</p>
                    </div>
                    <div>
                      <p className="text-cream/60 text-xs">Est. Quantity</p>
                      <p className="text-cream font-medium">{analysisResults.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Suggested Pricing */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="font-body text-xs text-cream/60 mb-1">AI Suggested Price Range</p>
                  <p className="font-display text-2xl text-cream">{analysisResults.suggestedPrice}/MT</p>
                  <p className="font-body text-xs text-cream/60 mt-2">{analysisResults.quality}</p>
                </div>

                {/* Manual Override Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="info-label block mb-2">Category</label>
                      <select className="input-elegant-filled w-full" defaultValue={analysisResults.category}>
                        {categories.slice(1).map((cat) => (
                          <option key={cat} value={cat} className="bg-forest-dark">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="info-label block mb-2">Grade</label>
                      <select className="input-elegant-filled w-full" defaultValue={analysisResults.grade}>
                        <option value="A" className="bg-forest-dark">Grade A</option>
                        <option value="B" className="bg-forest-dark">Grade B</option>
                        <option value="C" className="bg-forest-dark">Grade C</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="info-label block mb-2">Quantity (MT)</label>
                      <input type="number" defaultValue="120" className="input-elegant-filled w-full" />
                    </div>
                    <div>
                      <label className="info-label block mb-2">Price (₹/MT)</label>
                      <input type="number" defaultValue="1800" className="input-elegant-filled w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="info-label block mb-2">Location</label>
                    <select className="input-elegant-filled w-full">
                      <option className="bg-forest-dark">Bandhwari Landfill</option>
                      <option className="bg-forest-dark">Okhla Depot</option>
                      <option className="bg-forest-dark">Ghazipur</option>
                      <option className="bg-forest-dark">Special Facility</option>
                    </select>
                  </div>
                </div>

                {/* QR Code Preview */}
                <div className="p-4 bg-cream/5 rounded-lg flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-forest-dark" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-cream">QR Code will be auto-generated</p>
                    <p className="font-mono text-xs text-cream/60">PL-{Math.floor(Math.random() * 9000) + 1000}-A</p>
                    <p className="font-body text-xs text-cream/40 mt-1">Blockchain verified</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={resetModal} className="btn-outline-elegant flex-1">
                    Cancel
                  </button>
                  <button onClick={resetModal} className="btn-elegant flex-1">
                    <CheckCircle className="w-4 h-4 mr-1" /> Add to Inventory
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "upload" && (
              <button onClick={resetModal} className="btn-outline-elegant w-full mt-4">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
