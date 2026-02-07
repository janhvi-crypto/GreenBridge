import { useState } from "react";
import { Calculator, Leaf, IndianRupee, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as api from "@/lib/api";

const wasteTypes = [
  { type: "Reclaimed Wood", co2Factor: 1.2, revenuePerMT: 2500 },
  { type: "Metal / Steel", co2Factor: 1.8, revenuePerMT: 4500 },
  { type: "Plastic / PET", co2Factor: 2.1, revenuePerMT: 3200 },
  { type: "Textile / Fabric", co2Factor: 0.9, revenuePerMT: 1800 },
  { type: "Construction Debris", co2Factor: 0.5, revenuePerMT: 800 },
  { type: "Electronic Waste", co2Factor: 3.2, revenuePerMT: 8500 },
];

export function ROICalculator() {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState<number>(100);
  const [selectedType, setSelectedType] = useState(wasteTypes[0]);
  const [processingCost, setProcessingCost] = useState<number>(500);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const co2Saved = quantity * selectedType.co2Factor;
  const landfillCostSaved = quantity * 800;
  const revenuePotential = quantity * selectedType.revenuePerMT;
  const netProfit = revenuePotential - quantity * processingCost;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  const handleIssueNFT = async () => {
    if (!walletAddress.trim()) {
      toast({
        title: "Wallet address required",
        description: "Please enter your 0x wallet address to issue the certificate.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await api.createCertificate({
        walletAddress: walletAddress.trim(),
        co2Saved,
        wasteType: selectedType.type,
      });
      setShowNFTModal(false);
      setWalletAddress("");
      toast({
        title: "Carbon Credit Certificate Issued",
        description: `${res.certificateId} · Demo certificate (not on-chain). Tx ref: ${res.txHash.slice(0, 14)}...`,
      });
    } catch (e) {
      toast({
        title: "Certificate failed",
        description: e instanceof Error ? e.message : "Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Calculator Inputs */}
      <div className="glass-card p-6">
        <h3 className="font-display text-xl text-cream mb-6">
          Calculate Your Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="info-label block mb-2">Waste Quantity (MT)</label>
            <input
              type="number"
              className="input-elegant-filled"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label className="info-label block mb-2">Waste Type</label>
            <select
              className="input-elegant-filled"
              value={selectedType.type}
              onChange={(e) =>
                setSelectedType(
                  wasteTypes.find((t) => t.type === e.target.value) || wasteTypes[0]
                )
              }
            >
              {wasteTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="info-label block mb-2">Processing Cost (₹/MT)</label>
            <input
              type="number"
              className="input-elegant-filled"
              value={processingCost}
              onChange={(e) => setProcessingCost(Number(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center animate-scale-in">
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-7 h-7 text-green-400" />
          </div>
          <p className="font-display text-3xl text-cream mb-1">
            {co2Saved.toFixed(1)} MT
          </p>
          <p className="font-body text-sm text-cream/60">CO₂ Emissions Avoided</p>
        </div>

        <div className="glass-card p-6 text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="w-7 h-7 text-blue-400" />
          </div>
          <p className="font-display text-3xl text-cream mb-1">
            {formatCurrency(landfillCostSaved)}
          </p>
          <p className="font-body text-sm text-cream/60">Landfill Cost Saved</p>
        </div>

        <div className="glass-card p-6 text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-amber-400" />
          </div>
          <p className="font-display text-3xl text-cream mb-1">
            {formatCurrency(revenuePotential)}
          </p>
          <p className="font-body text-sm text-cream/60">Revenue Potential</p>
        </div>

        <div className="glass-card p-6 text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-7 h-7 text-purple-400" />
          </div>
          <p className={`font-display text-3xl mb-1 ${netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatCurrency(Math.abs(netProfit))}
          </p>
          <p className="font-body text-sm text-cream/60">
            Net {netProfit >= 0 ? "Profit" : "Loss"}
          </p>
        </div>
      </div>

      {/* Carbon Credit NFT */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-cream mb-2">
              Carbon Credit Certification
            </h3>
            <p className="font-body text-sm text-cream/60">
              Issue a carbon credit certificate (demo – not minted on-chain). Wallet verified via Alchemy/Ethereum.
            </p>
          </div>
          <button
            onClick={() => setShowNFTModal(true)}
            className="btn-elegant"
          >
            Issue Carbon Credit NFT
          </button>
        </div>
      </div>

      {/* NFT Modal */}
      {showNFTModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full animate-scale-in">
            <h3 className="font-display text-2xl text-cream mb-4">
              Issue Carbon Credit NFT
            </h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-cream/5 rounded-lg">
                <p className="font-body text-sm text-cream/60">Carbon Credits</p>
                <p className="font-display text-2xl text-green-400">{co2Saved.toFixed(2)} MT CO₂e</p>
              </div>
              <div>
                <label className="info-label block mb-2">Wallet Address</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowNFTModal(false)}
                className="btn-outline-elegant flex-1"
              >
                Cancel
              </button>
              <button onClick={handleIssueNFT} className="btn-elegant flex-1">
                Issue NFT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
