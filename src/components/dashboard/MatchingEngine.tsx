import { useState } from "react";
import { Search, Upload, Check, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const wasteTypes = [
  "Reclaimed Wood",
  "Metal / Steel",
  "Plastic / PET",
  "Textile / Fabric",
  "Construction Debris",
  "Electronic Waste",
];

const mockMatches = [
  {
    id: 1,
    type: "Reclaimed Wood",
    available: "650 MT",
    quality: "Grade A",
    location: "Delhi NCR",
    price: "₹2,500/MT",
    matchScore: 95,
  },
  {
    id: 2,
    type: "Reclaimed Wood",
    available: "320 MT",
    quality: "Grade B",
    location: "Ghaziabad",
    price: "₹1,800/MT",
    matchScore: 82,
  },
  {
    id: 3,
    type: "Reclaimed Wood",
    available: "180 MT",
    quality: "Grade A",
    location: "Noida",
    price: "₹2,200/MT",
    matchScore: 78,
  },
];

export function MatchingEngine() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showMatches, setShowMatches] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    type: string;
    quality: string;
    quantity: string;
    suggestion: string;
  }>(null);

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

  const handlePhotoAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        type: "Reclaimed Wood",
        quality: "Grade A (87% purity)",
        quantity: "Estimated 45-50 MT",
        suggestion: "Suitable for furniture manufacturing, particle board production",
      });
    }, 2000);
  };

  const handleRequestQuote = (matchId: number) => {
    toast({
      title: "Quote Requested",
      description: "The supplier will respond within 24-48 hours.",
    });
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
            />
          </div>
          <div>
            <label className="info-label block mb-2">Max Budget (₹/MT)</label>
            <input
              type="number"
              className="input-elegant-filled"
              placeholder="e.g., 3000"
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
          <input type="file" className="hidden" id="photo-upload" accept="image/*" />
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
            {mockMatches.map((match) => (
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
                    onClick={() => handleRequestQuote(match.id)}
                    className="btn-elegant text-sm py-2"
                  >
                    Request Quote
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
