import { useState } from "react";
import { Package, Sparkles, FileText, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInsertConsumerProduct } from "@/hooks/useDashboardData";
import * as api from "@/lib/api";

const categories = [
  { id: "furniture", name: "Furniture" },
  { id: "home-decor", name: "Home Decor" },
  { id: "garden", name: "Garden & Outdoor" },
  { id: "accessories", name: "Accessories" },
];

export function PublishProduct() {
  const { toast } = useToast();
  const insertProduct = useInsertConsumerProduct();
  const [form, setForm] = useState({
    name: "",
    category: "furniture",
    materials_source: "",
    price: 0,
    original_price: 0,
    waste_used: "",
    co2_saved: "",
    description: "",
    story: "",
    image_url: "",
  });
  const [generating, setGenerating] = useState(false);

  const generateWithAI = async () => {
    if (!form.name.trim()) {
      toast({ title: "Enter product name", variant: "destructive" });
      return;
    }
    setGenerating(true);
    try {
      const [imgRes, storyRes] = await Promise.all([
        api.generateProductImage({
          productName: form.name,
          materials: form.materials_source || "recovered waste",
          category: form.category,
        }),
        api.generateProductStory({
          productName: form.name,
          materials: form.materials_source || "recovered waste",
          category: form.category,
        }),
      ]);
      setForm((f) => ({
        ...f,
        image_url: imgRes.imageUrl || f.image_url,
        story: storyRes.story || f.story,
      }));
      toast({ title: "Generated", description: "AI image and story added." });
    } catch (e) {
      toast({
        title: "Generation failed",
        description: e instanceof Error ? e.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!form.name.trim() || form.price <= 0) {
      toast({ title: "Name and price required", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: form.price,
        ...(form.description?.trim() && { description: form.description.trim() }),
        ...(form.story?.trim() && { story: form.story.trim() }),
        ...(form.image_url?.trim() && { image_url: form.image_url.trim() }),
        ...(form.original_price > 0 && { original_price: form.original_price }),
        ...(form.waste_used?.trim() && { waste_used: form.waste_used.trim() }),
        ...(form.co2_saved?.trim() && { co2_saved: form.co2_saved.trim() }),
        ...(form.materials_source?.trim() && { materials_source: form.materials_source.trim() }),
      };
      await insertProduct.mutateAsync(payload);
      toast({ title: "Published", description: "Product is live on the Consumer Marketplace." });
      setForm({
        name: "",
        category: "furniture",
        materials_source: "",
        price: 0,
        original_price: 0,
        waste_used: "",
        co2_saved: "",
        description: "",
        story: "",
        image_url: "",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({
        title: "Publish failed",
        description: msg.includes("auth") ? "Sign in as a business user to publish." : msg || "Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl text-cream">Publish Finished Product</h2>
        <p className="font-body text-sm text-cream/60">
          List products made from waste/gov material on the consumer marketplace. AI can generate the image and story.
        </p>
      </div>

      <div className="glass-card p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="info-label block mb-2">Product Name *</label>
            <input
              className="input-elegant-filled w-full"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Recycled Plastic Lounge Chair"
            />
          </div>
          <div>
            <label className="info-label block mb-2">Category</label>
            <select
              className="input-elegant-filled w-full"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="bg-forest-dark">{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="info-label block mb-2">Materials (waste / source)</label>
            <input
              className="input-elegant-filled w-full"
              value={form.materials_source}
              onChange={(e) => setForm((f) => ({ ...f, materials_source: e.target.value }))}
              placeholder="e.g. 12 kg plastic from Bandhwari, reclaimed wood"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="info-label block mb-2">Price (₹) *</label>
              <input
                type="number"
                className="input-elegant-filled w-full"
                value={form.price || ""}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
                placeholder="8500"
              />
            </div>
            <div>
              <label className="info-label block mb-2">Original price (₹)</label>
              <input
                type="number"
                className="input-elegant-filled w-full"
                value={form.original_price || ""}
                onChange={(e) => setForm((f) => ({ ...f, original_price: Number(e.target.value) || 0 }))}
                placeholder="12000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="info-label block mb-2">Waste used</label>
              <input
                className="input-elegant-filled w-full"
                value={form.waste_used}
                onChange={(e) => setForm((f) => ({ ...f, waste_used: e.target.value }))}
                placeholder="e.g. 12 kg plastic"
              />
            </div>
            <div>
              <label className="info-label block mb-2">CO₂ saved</label>
              <input
                className="input-elegant-filled w-full"
                value={form.co2_saved}
                onChange={(e) => setForm((f) => ({ ...f, co2_saved: e.target.value }))}
                placeholder="e.g. 14.4 kg"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={generateWithAI}
              disabled={generating}
              className="btn-elegant flex items-center gap-2"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate image & story with AI
            </button>
          </div>

          {form.image_url && (
            <div className="rounded-lg overflow-hidden bg-cream/5 max-w-xs">
              <img src={form.image_url} alt="Product" className="w-full aspect-square object-cover" />
            </div>
          )}
          {form.story && (
            <div className="p-4 bg-cream/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-cream/60" />
                <span className="info-label">Story (for consumers)</span>
              </div>
              <p className="font-body text-sm text-cream/80 whitespace-pre-wrap">{form.story}</p>
            </div>
          )}

          <div>
            <label className="info-label block mb-2">Short description (optional)</label>
            <textarea
              className="input-elegant-filled w-full min-h-[80px]"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief product description"
            />
          </div>

          <button
            onClick={handlePublish}
            disabled={insertProduct.isPending}
            className="btn-elegant w-full flex items-center justify-center gap-2"
          >
            {insertProduct.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Publish to Consumer Marketplace
          </button>
        </div>
      </div>

      <div className="glass-card p-4 text-cream/60 text-sm">
        <Package className="w-4 h-4 inline mr-2" />
        Published products appear on the <strong className="text-cream">Consumer Marketplace</strong> (/shop) for end consumers.
      </div>
    </div>
  );
}
