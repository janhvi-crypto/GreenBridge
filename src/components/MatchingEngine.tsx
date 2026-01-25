import { useState } from "react";
import { Search, Upload, Sparkles, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";

const wasteTypes = [
  "Reclaimed Wood",
  "Metal/Steel",
  "Plastic/PET",
  "Textile/Fabric",
  "Construction Debris",
  "Electronic Waste",
];

interface FormData {
  companyName: string;
  email: string;
  wasteType: string;
  quantity: string;
  budget: string;
  contactPerson: string;
}

export function MatchingEngine() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    wasteType: "",
    quantity: "",
    budget: "",
    contactPerson: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<null | {
    type: string;
    quality: string;
    quantity: string;
    suggestion: string;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.wasteType || !formData.quantity || !formData.budget || !formData.contactPerson) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowResults(true);
    
    toast({
      title: "Matches Found!",
      description: "We found 3 potential matches for your requirements.",
    });
  };

  const handleAIAnalysis = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    setAiAnalysis({
      type: "Mixed Plastic (HDPE/PET)",
      quality: "Grade A - Recyclable",
      quantity: "Approximately 45 MT",
      suggestion: "Suitable for recycled packaging materials, construction panels, or textile fiber production.",
    });
    
    toast({
      title: "AI Analysis Complete",
      description: "Waste material has been analyzed successfully.",
    });
  };

  return (
    <div className="tab-content-enter space-y-8">
      {/* Registration Form */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Register Company Requirement</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              className="form-input"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              className="form-input"
              placeholder="email@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wasteType">Waste Type Needed</Label>
            <Select value={formData.wasteType} onValueChange={(value) => setFormData({ ...formData, wasteType: value })}>
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
            <Label htmlFor="quantity">Quantity Needed (MT)</Label>
            <Input
              id="quantity"
              type="number"
              className="form-input"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              className="form-input"
              placeholder="Enter budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              className="form-input"
              placeholder="Enter contact person name"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="btn-primary w-full md:w-auto" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Finding Matches...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Find Matches
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* AI Photo Analyzer */}
      <div className="bg-card rounded-2xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">AI Photo Analyzer</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1">
            <Label htmlFor="photoUpload" className="block mb-2">Upload Waste Photo</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">Drag & drop or click to upload</p>
              <input type="file" id="photoUpload" className="hidden" accept="image/*" />
            </div>
          </div>
          
          <Button onClick={handleAIAnalysis} className="btn-primary" disabled={isLoading}>
            🤖 AI Analyze Photo
          </Button>
        </div>

        {aiAnalysis && (
          <div className="mt-6 p-6 bg-success/10 rounded-xl border border-success/30 animate-scale-in">
            <h4 className="font-semibold text-success mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              AI Analysis Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Waste Type Detected</p>
                <p className="font-semibold text-foreground">{aiAnalysis.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quality Grade</p>
                <p className="font-semibold text-foreground">{aiAnalysis.quality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Quantity</p>
                <p className="font-semibold text-foreground">{aiAnalysis.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suggested Use</p>
                <p className="font-semibold text-foreground">{aiAnalysis.suggestion}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Matching Results */}
      {showResults && (
        <div className="bg-card rounded-2xl p-8 shadow-lg animate-slide-up">
          <h2 className="text-2xl font-bold text-foreground mb-6">Matching Results</h2>
          
          <div className="space-y-4">
            {/* Match 1 */}
            <div className="p-5 bg-gradient-card rounded-xl border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Waste Available at Ghazipur Landfill
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    {formData.wasteType} • {parseInt(formData.quantity) + 50} MT available
                  </p>
                </div>
                <span className="badge-approved">95% Match</span>
              </div>
            </div>

            {/* Match 2 */}
            <div className="p-5 bg-gradient-card rounded-xl border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-warning" />
                    Matching Score Analysis
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Budget alignment: ₹{parseInt(formData.budget).toLocaleString()} • Quality certification pending
                  </p>
                </div>
                <span className="badge-pending">85% Match</span>
              </div>
            </div>

            {/* Match 3 */}
            <div className="p-5 bg-gradient-card rounded-xl border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    Next Steps
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Government contact initiated • Expected response in 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
