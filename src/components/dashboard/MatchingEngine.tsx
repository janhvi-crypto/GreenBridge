import { useState, useMemo, useRef } from "react";
import { Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from "@/hooks/useDashboardData";
import { useInsertBusinessRequest } from "@/hooks/useDashboardData";
import * as api from "@/lib/api";
import type { InventoryItem } from "@/types/dashboard";

const wasteTypes = [
  "Reclaimed Wood",
  "Metal / Steel",
  "Plastic / PET",
  "Textile / Fabric",
  "Construction Debris",
  "Electronic Waste",
];

const MOCK_MATCHES = [
  { id: "1", type: "Reclaimed Wood", available: "650 MT", quality: "Grade A", location: "Delhi NCR", price: "₹2,500/MT", matchScore: 95 },
  { id: "2", type: "Reclaimed Wood", available: "320 MT", quality: "Grade B", location: "Ghaziabad", price: "₹1,800/MT", matchScore: 82 },
  { id: "3", type: "Reclaimed Wood", available: "180 MT", quality: "Grade A", location: "Noida", price: "₹2,200/MT", matchScore: 78 },
];

function inventoryToMatch(i: InventoryItem, score: number) {
  const price = i.price_min != null ? `₹${i.price_min}/MT` : "Contact";
  return {
    id: i.id,
    type: i.category,
    available: `${i.quantity} ${i.unit}`,
    quality: `Grade ${i.grade}`,
    location: i.location ?? "—",
    price,
    matchScore: score,
  };
}

export function MatchingEngine() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [showMatches, setShowMatches] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    type: string;
    quality: string;
    quantity: string;
    suggestion: string;
  }>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const { data: liveInventory = [] } = useInventory(true);
  const insertRequest = useInsertBusinessRequest();

  const matches = useMemo(() => {
    const filtered = selectedType
      ? liveInventory.filter((i) => i.category === selectedType)
      : liveInventory;
    const fromDb = filtered.slice(0, 10).map((i, idx) => inventoryToMatch(i, 95 - idx * 5));
    return fromDb.length > 0 ? fromDb : MOCK_MATCHES;
  }, [liveInventory, selectedType]);

  const handleSearch = () => {
    if (!selectedType) {
      toast({
        title: "Select material type",
        description: "Please select a waste type to search for matches.",
        variant: "destructive",
      });
      return;
    }
    setShowMatches(true);
  };

  const handlePhotoAnalysis = async () => {
    const file = photoInputRef.current?.files?.[0];
    if (!file) {
      toast({ title: "Choose a photo", description: "Select an image first, then click AI Analyze Photo.", variant: "destructive" });
      return;
    }
    setAnalyzing(true);
    try {
      const data = await api.analyzeWaste(file);
      setAnalysisResult({
        type: data.category,
        quality: `Grade ${data.grade} (${data.confidence}% confidence)`,
        quantity: `Estimated ${data.quantity} MT`,
        suggestion: data.quality,
      });
      setSelectedType(data.category);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const isRateLimit = msg.includes("rate limit") || msg.includes("quota") || msg.includes("429");
      toast({
        title: isRateLimit ? "Rate limit" : "Analysis failed",
        description: isRateLimit ? "API quota reached. Please try again in a minute." : (msg || "Try again."),
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRequestQuote = async (match: { id: string; type: string; available: string; price: string }) => {
    const qty = parseInt(minQuantity, 10) || 50;
    const budget = maxBudget ? `₹${maxBudget}/MT` : undefined;
    try {
      await insertRequest.mutateAsync({
        material_type: match.type,
        quantity: qty,
        budget: budget ?? match.price,
      });
      toast({
        title: "Quota request submitted",
        description: "Government will review and approve. Check Company Requests on the government dashboard.",
      });
    } catch (e) {
      toast({
        title: "Request failed",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search Section */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">Find Materials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="info-label block mb-2">Material Type</label>
            <select
              className="input-elegant-filled"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select type</option>
              {wasteTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="info-label block mb-2">Minimum Quantity (MT)</label>
            <input
              type="number"
              className="input-elegant-filled"
              placeholder="e.g., 100"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
            />
          </div>
          <div>
            <label className="info-label block mb-2">Max Budget (₹/MT)</label>
            <input
              type="number"
              className="input-elegant-filled"
              placeholder="e.g., 3000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleSearch} className="btn-elegant mt-6">
          <Search className="w-4 h-4 mr-2" />
          Search Matches
        </button>
      </div>

      {/* AI Photo Analyzer */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-4">
          AI Waste Photo Analyzer
        </h3>
        <p className="font-body text-sm text-cream/60 mb-6">
          Upload a photo of waste materials for AI-powered classification and quality assessment.
        </p>
        <div className="border-2 border-dashed border-cream/20 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-cream/40 mx-auto mb-4" />
          <p className="font-body text-cream/60 mb-4">
            Drag and drop an image, or click to browse
          </p>
          <input
            ref={photoInputRef}
            type="file"
            className="hidden"
            id="photo-upload"
            accept="image/*"
            onChange={() => setAnalysisResult(null)}
          />
          <label htmlFor="photo-upload" className="btn-outline-elegant cursor-pointer">
            Choose File
          </label>
        </div>
        <button
          onClick={handlePhotoAnalysis}
          disabled={analyzing}
          className="btn-elegant mt-4 w-full"
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            "AI Analyze Photo"
          )}
        </button>

        {analysisResult && (
          <div className="mt-6 p-4 bg-cream/5 rounded-lg border border-cream/10 animate-fade-in">
            <h4 className="font-display text-lg text-cream mb-4">Analysis Result</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-body text-xs text-cream/60 uppercase">Detected Type</p>
                <p className="font-body text-cream">{analysisResult.type}</p>
              </div>
              <div>
                <p className="font-body text-xs text-cream/60 uppercase">Quality Grade</p>
                <p className="font-body text-cream">{analysisResult.quality}</p>
              </div>
              <div>
                <p className="font-body text-xs text-cream/60 uppercase">Est. Quantity</p>
                <p className="font-body text-cream">{analysisResult.quantity}</p>
              </div>
              <div>
                <p className="font-body text-xs text-cream/60 uppercase">Suggested Use</p>
                <p className="font-body text-cream">{analysisResult.suggestion}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Matches Results */}
      {showMatches && (
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="font-display text-xl text-cream mb-6">
            Available Matches for {selectedType || "All Types"}
          </h3>
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="p-4 bg-cream/5 rounded-lg border border-cream/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="font-body text-xs text-cream/60">Type</p>
                    <p className="font-body text-cream">{match.type}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">Available</p>
                    <p className="font-body text-cream">{match.available}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">Quality</p>
                    <p className="font-body text-cream">{match.quality}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">Location</p>
                    <p className="font-body text-cream">{match.location}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/60">Price</p>
                    <p className="font-body text-cream">{match.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-display text-2xl text-green-400">{match.matchScore}%</p>
                    <p className="font-body text-xs text-cream/60">Match</p>
                  </div>
                  <button
                    onClick={() => handleRequestQuote(match)}
                    disabled={insertRequest.isPending}
                    className="btn-elegant text-sm py-2 disabled:opacity-50"
                  >
                    {insertRequest.isPending ? "Submitting..." : "Request Quota"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
