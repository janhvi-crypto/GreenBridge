import { useState, useMemo } from "react";
import { Calculator, Leaf, Wallet, TrendingUp, Coins, Link2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";

const wasteTypes = [
  "Reclaimed Wood",
  "Metal/Steel",
  "Plastic/PET",
  "Textile/Fabric",
  "Construction Debris",
  "Electronic Waste",
];

export function ROICalculator() {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState<string>("100");
  const [wasteType, setWasteType] = useState<string>("Plastic/PET");
  const [processingCost, setProcessingCost] = useState<string>("500");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showNFTModal, setShowNFTModal] = useState(false);

  const calculations = useMemo(() => {
    const qty = parseFloat(quantity) || 0;
    const cost = parseFloat(processingCost) || 0;

    const co2Saved = qty * 1.2;
    const landfillSaved = qty * 800;
    const revenuePotential = qty * 2500;
    const netProfit = revenuePotential - landfillSaved - (qty * cost);

    return {
      co2Saved: co2Saved.toFixed(2),
      landfillSaved: landfillSaved.toLocaleString('en-IN'),
      revenuePotential: revenuePotential.toLocaleString('en-IN'),
      netProfit: netProfit.toLocaleString('en-IN'),
    };
  }, [quantity, processingCost]);

  const handleIssueNFT = () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please enter a wallet address to issue the NFT.",
        variant: "destructive",
      });
      return;
    }
    setShowNFTModal(true);
    toast({
      title: "NFT Issued Successfully!",
      description: "Carbon credit NFT has been minted to your wallet.",
    });
  };

  return (
    <div className="tab-content-enter space-y-8">
      {/* Calculator Form */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">ROI Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="quantity">Waste Quantity to Divert (MT)</Label>
            <Input
              id="quantity"
              type="number"
              className="form-input"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wasteType">Waste Type</Label>
            <Select value={wasteType} onValueChange={setWasteType}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {wasteTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="processingCost">Processing Cost per MT (₹)</Label>
            <Input
              id="processingCost"
              type="number"
              className="form-input"
              placeholder="Enter cost"
              value={processingCost}
              onChange={(e) => setProcessingCost(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-success text-white rounded-2xl p-6 shadow-lg card-hover animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">CO₂ Emissions Avoided</span>
          </div>
          <p className="text-3xl font-bold">{calculations.co2Saved}</p>
          <p className="text-sm opacity-80">MT CO₂e</p>
        </div>

        <div className="bg-gradient-success text-white rounded-2xl p-6 shadow-lg card-hover animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">Landfill Cost Saved</span>
          </div>
          <p className="text-3xl font-bold">₹{calculations.landfillSaved}</p>
        </div>

        <div className="bg-gradient-success text-white rounded-2xl p-6 shadow-lg card-hover animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">Revenue Potential</span>
          </div>
          <p className="text-3xl font-bold">₹{calculations.revenuePotential}</p>
        </div>

        <div className="bg-gradient-success text-white rounded-2xl p-6 shadow-lg card-hover animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">Net Profit Margin</span>
          </div>
          <p className="text-3xl font-bold">₹{calculations.netProfit}</p>
        </div>
      </div>

      {/* NFT Issuance */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Carbon Credit NFT Issuance</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              className="form-input mt-2"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <Button onClick={handleIssueNFT} className="btn-primary self-end">
            ⛓️ Issue Carbon Credit NFT
          </Button>
        </div>
      </div>

      {/* NFT Modal */}
      <Dialog open={showNFTModal} onOpenChange={setShowNFTModal}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              🎉 NFT Minted Successfully!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your carbon credit NFT has been issued.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-success/10 rounded-xl border border-success/30">
              <p className="text-sm text-muted-foreground mb-1">Token ID</p>
              <p className="font-mono text-foreground">GBC-{Date.now()}</p>
            </div>
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Carbon Credits</p>
              <p className="text-2xl font-bold text-primary">{calculations.co2Saved} tCO₂e</p>
            </div>
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
              <p className="font-mono text-xs text-foreground break-all">{walletAddress}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
