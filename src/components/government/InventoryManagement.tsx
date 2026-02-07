import { supabase } from "@/lib/supabase";
import * as api from "@/lib/api";

import { useState, useMemo } from "react";
import { Search, Plus, Filter, Package, Edit2, Trash2, ChevronDown, Upload, Camera, QrCode, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory, useInsertInventory, useLogActivity } from "@/hooks/useDashboardData";
import type { InventoryItem } from "@/types/dashboard";

const MOCK_INVENTORY: Array<{ id: number; category: string; quantity: number; unit: string; grade: "A" | "B" | "C"; price: string; location: string; status: string; qrCode: string; lastUpdated: string }> = [
  { id: 1, category: "Reclaimed Wood", quantity: 650, unit: "MT", grade: "A", price: "₹1,800-2,200", location: "Bandhwari Landfill", status: "available", qrCode: "WD-2847-A", lastUpdated: "2026-01-25" },
  { id: 2, category: "Metal / Steel", quantity: 520, unit: "MT", grade: "A", price: "₹2,000-2,400", location: "Okhla Depot", status: "available", qrCode: "MT-1923-A", lastUpdated: "2026-01-24" },
  { id: 3, category: "Plastic / PET", quantity: 380, unit: "MT", grade: "B", price: "₹1,500-2,000", location: "Ghazipur", status: "reserved", qrCode: "PL-3847-B", lastUpdated: "2026-01-23" },
  { id: 4, category: "Construction Debris", quantity: 450, unit: "MT", grade: "B", price: "₹800-1,200", location: "Bandhwari Landfill", status: "available", qrCode: "CD-9283-B", lastUpdated: "2026-01-22" },
  { id: 5, category: "Textile / Fabric", quantity: 470, unit: "MT", grade: "A", price: "₹1,200-1,800", location: "Okhla Depot", status: "available", qrCode: "TX-7462-A", lastUpdated: "2026-01-21" },
  { id: 6, category: "Electronic Waste", quantity: 177, unit: "MT", grade: "C", price: "₹3,000-5,000", location: "Special Facility", status: "processing", qrCode: "EW-5829-C", lastUpdated: "2026-01-20" },
];

const categories = ["All Categories", "Reclaimed Wood", "Metal / Steel", "Plastic / PET", "Construction Debris", "Textile / Fabric", "Electronic Waste"];

function toTableRow(item: InventoryItem) {
  const price = [item.price_min, item.price_max].filter(Boolean).length
    ? `₹${item.price_min ?? ""}-${item.price_max ?? ""}`
    : "—";
  return {
    id: item.id,
    category: item.category,
    quantity: Number(item.quantity),
    unit: item.unit,
    grade: item.grade,
    price,
    location: item.location ?? "—",
    status: item.status,
    qrCode: item.qr_code ?? "—",
    lastUpdated: item.updated_at.slice(0, 10),
  };
}

export function InventoryManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadStep, setUploadStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [addForm, setAddForm] = useState({ category: "Plastic / PET", grade: "A" as "A" | "B" | "C", quantity: 120, price: 1800, location: "Bandhwari Landfill", description: "", image_url: "" });
  const [aiDescription, setAiDescription] = useState("");
  const [aiImageUrl, setAiImageUrl] = useState("");
  const [generatingExtras, setGeneratingExtras] = useState(false);

  const { data: liveInventory = [], isLoading, isError } = useInventory(false);
  const insertInventory = useInsertInventory();
  const logActivity = useLogActivity();

  const inventoryRows = useMemo(() => {
    const fromDb = liveInventory.map(toTableRow);
    if (fromDb.length > 0) return fromDb;
    return MOCK_INVENTORY.map((m) => ({ ...m, id: String(m.id) }));
  }, [liveInventory]);

  const filteredInventory = inventoryRows.filter((item) => {
    const loc = (item as { location?: string }).location ?? "";
    const matchesSearch = item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const runAIAnalysis = async (file: File) => {
    try {
      setUploadStep("analyzing");
      const data = await api.analyzeWaste(file);

      const category = data.category || addForm.category;
      const grade = (data.grade?.replace("Grade ", "") || addForm.grade) as "A" | "B" | "C";
      const qtyNum = parseInt(String(data.quantity).replace(/\D/g, ""), 10) || addForm.quantity;
      const priceNum = parseInt(String(data.suggestedPrice).replace(/[^0-9]/g, ""), 10) || addForm.price;

      setAnalysisResults(data);
      setAddForm((f) => ({ ...f, category, grade, quantity: qtyNum, price: priceNum }));

      setGeneratingExtras(true);
      try {
        const [descRes, imgRes] = await Promise.all([
          api.generateInventoryDescription({ category, grade, quantity: qtyNum, location: addForm.location }),
          api.generateInventoryImage({ category, description: data.quality }),
        ]);
        setAiDescription(descRes.description || "");
        setAiImageUrl(imgRes.imageUrl || "");
        setAddForm((f) => ({
          ...f,
          description: descRes.description || f.description,
          image_url: imgRes.imageUrl || f.image_url,
        }));
      } finally {
        setGeneratingExtras(false);
      }

      setUploadStep("results");
    } catch (err) {
      console.error("AI analysis failed:", err);
      const msg = err instanceof Error ? err.message : String(err);
      const isRateLimit = msg.includes("rate limit") || msg.includes("quota") || msg.includes("429");
      const friendly = isRateLimit
        ? "AI analysis is temporarily limited (API quota). Please try again in a minute or check your Gemini quota at aistudio.google.com."
        : msg || "AI analysis failed. Please try again.";
      alert(friendly);
      setUploadStep("upload");
    }
  };
  

  const resetModal = () => {
    setShowAddModal(false);
    setUploadStep("upload");
    setAnalysisResults(null);
    setAiDescription("");
    setAiImageUrl("");
  };

  const totalQuantity = inventoryRows.reduce((acc, item) => acc + Number(item.quantity), 0);

  const handleAddToInventory = async () => {
    try {
      let qrCode: string;
      try {
        const qr = await api.generateQR({
          payload: { type: "inventory", category: addForm.category, quantity: addForm.quantity, location: addForm.location, ts: Date.now() },
          size: 200,
        });
        qrCode = qr.payload;
      } catch {
        qrCode = `${addForm.category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${addForm.grade}`;
      }
      await insertInventory.mutateAsync({
        category: addForm.category,
        quantity: addForm.quantity,
        grade: addForm.grade,
        price_min: addForm.price,
        price_max: addForm.price,
        location: addForm.location,
        status: "available",
        qr_code: qrCode,
        description: addForm.description || aiDescription || undefined,
        image_url: addForm.image_url || aiImageUrl || undefined,
      });
      await logActivity.mutateAsync({ actor_role: "government", action: "Inventory batch added", detail: `${addForm.category} - ${addForm.quantity} MT` });
      resetModal();
      toast({ title: "Added to inventory", description: `${addForm.category} (${addForm.quantity} MT) is now in the Business Marketplace.` });
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      toast({
        title: "Add failed",
        description: msg.includes("inventory") ? msg : msg + " (Run supabase/create_inventory.sql in Supabase SQL Editor if the table is missing.)",
        variant: "destructive",
      });
    }
  };

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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto rounded-xl border border-cream/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-cream flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Add New Waste Batch
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                AI connected
              </span>
            </div>

            {uploadStep === "upload" && (
              <div className="space-y-5">
                <label className="info-label block text-cream/80">
                  Upload photo for AI analysis
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  id="waste-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) runAIAnalysis(file);
                  }}
                />
                <label
                  htmlFor="waste-upload"
                  className="block border-2 border-dashed border-cream/30 rounded-xl p-8 text-center cursor-pointer hover:border-cream/50 hover:bg-cream/5 transition-all"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-cream/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-cream/60" />
                    </div>
                    <p className="font-body text-sm text-cream">
                      Upload a photo of the waste batch
                    </p>
                    <p className="font-body text-xs text-cream/60">
                      AI will auto-categorize and suggest pricing
                    </p>
                    <span className="btn-outline-elegant text-xs mt-2 inline-flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Choose file
                    </span>
                  </div>
                </label>
                <p className="font-body text-xs text-cream/50 text-center">
                  Selecting a file starts AI analysis automatically
                </p>
              </div>
            )}

            {uploadStep === "analyzing" && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-cream/10 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-cream/20 border-t-cream rounded-full animate-spin" />
                </div>
                <p className="font-display text-lg text-cream mb-1">Analyzing photo…</p>
                <p className="font-body text-sm text-cream/60">Detecting waste type and quality</p>
              </div>
            )}

            {uploadStep === "results" && analysisResults && (
              <div className="space-y-5">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
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

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <p className="font-body text-xs text-cream/60 mb-1">AI suggested price</p>
                  <p className="font-display text-xl text-cream">{analysisResults.suggestedPrice}/MT</p>
                  <p className="font-body text-xs text-cream/60 mt-1">{analysisResults.quality}</p>
                </div>

                <div className="border-t border-cream/10 pt-4">
                  <p className="info-label mb-3 text-cream/80">Edit if needed</p>
                  <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="info-label block mb-2">Category</label>
                      <select
                        className="input-elegant-filled w-full"
                        value={addForm.category}
                        onChange={(e) => setAddForm((f) => ({ ...f, category: e.target.value }))}
                      >
                        {categories.slice(1).map((cat) => (
                          <option key={cat} value={cat} className="bg-forest-dark">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="info-label block mb-2">Grade</label>
                      <select
                        className="input-elegant-filled w-full"
                        value={addForm.grade}
                        onChange={(e) => setAddForm((f) => ({ ...f, grade: e.target.value as "A" | "B" | "C" }))}
                      >
                        <option value="A" className="bg-forest-dark">Grade A</option>
                        <option value="B" className="bg-forest-dark">Grade B</option>
                        <option value="C" className="bg-forest-dark">Grade C</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="info-label block mb-2">Quantity (MT)</label>
                      <input
                        type="number"
                        className="input-elegant-filled w-full"
                        value={addForm.quantity}
                        onChange={(e) => setAddForm((f) => ({ ...f, quantity: Number(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <label className="info-label block mb-2">Price (₹/MT)</label>
                      <input
                        type="number"
                        className="input-elegant-filled w-full"
                        value={addForm.price}
                        onChange={(e) => setAddForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="info-label block mb-2">Location</label>
                    <select
                      className="input-elegant-filled w-full"
                      value={addForm.location}
                      onChange={(e) => setAddForm((f) => ({ ...f, location: e.target.value }))}
                    >
                      <option className="bg-forest-dark">Bandhwari Landfill</option>
                      <option className="bg-forest-dark">Okhla Depot</option>
                      <option className="bg-forest-dark">Ghazipur</option>
                      <option className="bg-forest-dark">Special Facility</option>
                    </select>
                  </div>
                  </div>
                </div>

                {generatingExtras && (
                  <p className="font-body text-xs text-cream/60 flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-cream/20 border-t-cream rounded-full animate-spin" />
                    Generating description & image with AI...
                  </p>
                )}
                {(aiDescription || aiImageUrl) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aiImageUrl && (
                      <div className="rounded-xl overflow-hidden bg-cream/5 border border-cream/10">
                        <img src={aiImageUrl} alt="AI generated" className="w-full h-28 object-cover" />
                      </div>
                    )}
                    {aiDescription && (
                      <p className="font-body text-xs text-cream/80 line-clamp-4">{aiDescription}</p>
                    )}
                  </div>
                )}
                <div className="p-4 bg-cream/5 rounded-xl flex items-center gap-4 border border-cream/10">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-forest-dark" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-cream">QR Code will be auto-generated</p>
                    <p className="font-mono text-xs text-cream/60">{addForm.category.slice(0, 2).toUpperCase()}-****-{addForm.grade}</p>
                    <p className="font-body text-xs text-cream/40 mt-1">Blockchain verified</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={resetModal} className="btn-outline-elegant flex-1 py-2.5">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToInventory}
                    disabled={insertInventory.isPending}
                    className="btn-elegant flex-1 py-2.5 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {insertInventory.isPending ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" /> Adding…</span>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Add to inventory</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "upload" && (
              <button onClick={resetModal} className="btn-outline-elegant w-full mt-4 py-2.5">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
