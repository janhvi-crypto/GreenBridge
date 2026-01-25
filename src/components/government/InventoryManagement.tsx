import { useState } from "react";
import { Search, Plus, Filter, Package, Edit2, Trash2, ChevronDown } from "lucide-react";

const inventoryData = [
  { id: 1, category: "Textile Waste", quantity: 2500, unit: "MT", location: "Sector A-12", status: "available", lastUpdated: "2024-01-15" },
  { id: 2, category: "Plastic Waste", quantity: 1800, unit: "MT", location: "Sector B-04", status: "reserved", lastUpdated: "2024-01-14" },
  { id: 3, category: "Metal Scrap", quantity: 3200, unit: "MT", location: "Sector C-08", status: "available", lastUpdated: "2024-01-13" },
  { id: 4, category: "Electronic Waste", quantity: 450, unit: "MT", location: "Sector D-02", status: "processing", lastUpdated: "2024-01-12" },
  { id: 5, category: "Construction Debris", quantity: 5600, unit: "MT", location: "Sector E-15", status: "available", lastUpdated: "2024-01-11" },
  { id: 6, category: "Organic Waste", quantity: 890, unit: "MT", location: "Sector F-07", status: "reserved", lastUpdated: "2024-01-10" },
];

const categories = ["All Categories", "Textile Waste", "Plastic Waste", "Metal Scrap", "Electronic Waste", "Construction Debris", "Organic Waste"];

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch = item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cream">Inventory Management</h2>
          <p className="font-body text-sm text-cream/60">Manage and track landfill waste inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-elegant flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">14,440</p>
          <p className="font-body text-xs text-cream/60">Total MT</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-cream">6</p>
          <p className="font-body text-xs text-cream/60">Categories</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-success">4</p>
          <p className="font-body text-xs text-cream/60">Available</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="font-display text-2xl text-warning">2</p>
          <p className="font-body text-xs text-cream/60">Reserved</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/10">
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Category</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Quantity</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60 hidden md:table-cell">Location</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60">Status</th>
                <th className="text-left p-4 font-body text-xs uppercase tracking-wider text-cream/60 hidden lg:table-cell">Last Updated</th>
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
                  <td className="p-4 hidden md:table-cell">
                    <span className="font-body text-sm text-cream/80">{item.location}</span>
                  </td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-body capitalize
                      ${item.status === "available" ? "badge-approved" : ""}
                      ${item.status === "reserved" ? "badge-pending" : ""}
                      ${item.status === "processing" ? "badge-revision" : ""}
                    `}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="font-body text-sm text-cream/60">{item.lastUpdated}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors">
                        <Edit2 className="w-4 h-4 text-cream/60 hover:text-cream" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-cream/10 transition-colors">
                        <Trash2 className="w-4 h-4 text-cream/60 hover:text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entry Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-md animate-scale-in">
            <h3 className="font-display text-xl text-cream mb-6">Add Inventory Entry</h3>
            <div className="space-y-4">
              <div>
                <label className="info-label block mb-2">Category</label>
                <select className="input-elegant-filled w-full">
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat} className="bg-forest-dark">{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="info-label block mb-2">Quantity (MT)</label>
                <input type="number" placeholder="Enter quantity" className="input-elegant-filled w-full" />
              </div>
              <div>
                <label className="info-label block mb-2">Location</label>
                <input type="text" placeholder="e.g., Sector A-12" className="input-elegant-filled w-full" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="btn-outline-elegant flex-1">
                  Cancel
                </button>
                <button onClick={() => setShowAddModal(false)} className="btn-elegant flex-1">
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
