import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Leaf, 
  Recycle, 
  TreePine, 
  Heart,
  Star,
  Filter,
  Search,
  ArrowLeft,
  QrCode,
  Award,
  TrendingDown,
  Trash2,
  Apple,
  Newspaper,
  Zap,
  Droplets,
  CheckCircle2,
  ArrowRight,
  FileText,
  ChevronDown,
  ChevronUp,
  Wallet,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConsumerProducts } from "@/hooks/useDashboardData";
import { useMetaMask } from "@/hooks/useMetaMask";
import { formatAddress } from "@/lib/wallet";
import * as api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  { id: "all", name: "All Products", icon: Recycle },
  { id: "furniture", name: "Furniture", icon: TreePine },
  { id: "home-decor", name: "Home Decor", icon: Heart },
  { id: "garden", name: "Garden & Outdoor", icon: Leaf },
  { id: "accessories", name: "Accessories", icon: Star },
];

const products = [
  {
    id: 1,
    name: "Recycled Plastic Lounge Chair",
    category: "furniture",
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    company: "GreenFurniture Ltd",
    rating: 4.8,
    reviews: 124,
    wasteUsed: "12 kg plastic",
    co2Saved: "14.4 kg",
    landfillCleared: "0.5 sq ft",
    verified: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Upcycled Wood Coffee Table",
    category: "furniture",
    price: 15000,
    originalPrice: 22000,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop",
    company: "EcoWood Creations",
    rating: 4.9,
    reviews: 89,
    wasteUsed: "25 kg wood",
    co2Saved: "30 kg",
    landfillCleared: "1.2 sq ft",
    verified: true,
    badge: "Premium",
  },
  {
    id: 3,
    name: "Textile Waste Wall Art",
    category: "home-decor",
    price: 3500,
    originalPrice: 5000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=300&fit=crop",
    company: "ArtFromWaste Studio",
    rating: 4.7,
    reviews: 56,
    wasteUsed: "2 kg textile",
    co2Saved: "2.4 kg",
    landfillCleared: "0.1 sq ft",
    verified: true,
    badge: null,
  },
  {
    id: 4,
    name: "Metal Scrap Planters (Set of 3)",
    category: "garden",
    price: 4200,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
    company: "MetalCraft Eco",
    rating: 4.6,
    reviews: 78,
    wasteUsed: "8 kg metal",
    co2Saved: "9.6 kg",
    landfillCleared: "0.3 sq ft",
    verified: true,
    badge: "New",
  },
  {
    id: 5,
    name: "E-Waste Circuit Board Coasters",
    category: "accessories",
    price: 1200,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    company: "TechRecycle India",
    rating: 4.5,
    reviews: 203,
    wasteUsed: "0.5 kg e-waste",
    co2Saved: "0.6 kg",
    landfillCleared: "0.02 sq ft",
    verified: true,
    badge: "Eco Choice",
  },
  {
    id: 6,
    name: "Construction Debris Bookshelf",
    category: "furniture",
    price: 12000,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=300&fit=crop",
    company: "BuildGreen Interiors",
    rating: 4.8,
    reviews: 45,
    wasteUsed: "40 kg C&D waste",
    co2Saved: "48 kg",
    landfillCleared: "2 sq ft",
    verified: true,
    badge: null,
  },
  {
    id: 7,
    name: "Recycled Glass Vase Collection",
    category: "home-decor",
    price: 2800,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&h=300&fit=crop",
    company: "GlassCraft Studio",
    rating: 4.9,
    reviews: 167,
    wasteUsed: "3 kg glass",
    co2Saved: "3.6 kg",
    landfillCleared: "0.15 sq ft",
    verified: true,
    badge: "Top Rated",
  },
  {
    id: 8,
    name: "Plastic Waste Garden Bench",
    category: "garden",
    price: 9500,
    originalPrice: 14000,
    image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=400&h=300&fit=crop",
    company: "GreenFurniture Ltd",
    rating: 4.7,
    reviews: 92,
    wasteUsed: "35 kg plastic",
    co2Saved: "42 kg",
    landfillCleared: "1.5 sq ft",
    verified: true,
    badge: null,
  },
];

const impactStats = {
  totalCo2Saved: "3,416 MT",
  landfillCleared: "2.5 acres",
  productsCreated: "12,500+",
  happyCustomers: "8,200+",
};

type ProductCard = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  company: string;
  rating: number;
  reviews: number;
  wasteUsed: string;
  co2Saved: string;
  landfillCleared: string;
  verified: boolean;
  badge: string | null;
  story: string | null;
};

const mockToCard = (p: (typeof products)[0]): ProductCard => ({
  id: String(p.id),
  name: p.name,
  category: p.category,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.image,
  company: p.company,
  rating: p.rating,
  reviews: p.reviews,
  wasteUsed: p.wasteUsed,
  co2Saved: p.co2Saved,
  landfillCleared: p.landfillCleared,
  verified: p.verified,
  badge: p.badge,
  story: null,
});

export default function ConsumerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [cart, setCart] = useState<string[]>([]);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const [downloadingGuide, setDownloadingGuide] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");

  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();
  const {
    account,
    formattedAddress,
    isConnected,
    isConnecting: isWalletConnecting,
    connect: connectWallet,
    disconnect: disconnectWallet,
    signMessage,
    hasProvider: hasMetaMask,
  } = useMetaMask();

  const { data: consumerProducts = [] } = useConsumerProducts();
  const productsList = useMemo((): ProductCard[] => {
    if (consumerProducts.length > 0) {
      return consumerProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : 0,
        image: p.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        company: p.company_name || "GreenBridge Partner",
        rating: 4.7,
        reviews: 0,
        wasteUsed: p.waste_used || "—",
        co2Saved: p.co2_saved || "—",
        landfillCleared: "—",
        verified: !!p.verified,
        badge: p.badge,
        story: p.story || null,
      }));
    }
    return products.map(mockToCard);
  }, [consumerProducts]);

  const filteredProducts = productsList.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const addToCart = (productId: string) => {
    setCart((c) => (c.includes(productId) ? c : [...c, productId]));
  };

  const removeFromCart = (productId: string) => {
    setCart((c) => c.filter((id) => id !== productId));
  };

  const cartItems = productsList.filter((p) => cart.includes(p.id));
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  const handlePurchaseWithMetaMask = async () => {
    if (cart.length === 0) {
      toast({ title: "Cart empty", description: "Add products to cart first.", variant: "destructive" });
      return;
    }
    if (!hasMetaMask) {
      toast({
        title: "MetaMask required",
        description: "Install MetaMask to pay with your wallet.",
        variant: "destructive",
      });
      return;
    }
    let payAccount = account;
    if (!payAccount) {
      payAccount = await connectWallet();
      if (!payAccount) {
        toast({ title: "Connection needed", description: "Connect MetaMask to continue.", variant: "destructive" });
        return;
      }
    }
    setPurchasing(true);
    try {
      const orderSummary = cartItems.map((p) => `${p.name} (₹${p.price.toLocaleString()})`).join("; ");
      const message = `GreenBridge Market – Confirm purchase\nTotal: ₹${cartTotal.toLocaleString()}\nItems: ${orderSummary}\nTimestamp: ${new Date().toISOString()}`;
      await signMessage(message);
      setCart([]);
      setCartOpen(false);
      toast({
        title: "Order confirmed",
        description: `Payment confirmed with ${payAccount ? formatAddress(payAccount) : "your wallet"}. You will receive order details by email.`,
      });
    } catch (e) {
      toast({
        title: "Payment cancelled or failed",
        description: e instanceof Error ? e.message : "Please try again or use another payment method.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-forest-dark text-cream sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-cream/60 hover:text-cream transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-cream/20 hidden sm:block" />
              <h1 className="font-display text-xl md:text-2xl italic">GreenBridge Market</h1>
            </div>
            <div className="flex items-center gap-2">
              {hasMetaMask && (
                <div className="flex items-center gap-2 mr-2">
                  {isConnected ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream/10 border border-cream/20">
                      <Wallet className="w-4 h-4 text-green-400" />
                      <span className="font-mono text-sm text-cream">{formattedAddress}</span>
                      <button
                        type="button"
                        onClick={disconnectWallet}
                        className="p-1 rounded hover:bg-cream/10 text-cream/60 hover:text-cream"
                        title="Disconnect wallet"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cream/30 text-cream hover:bg-cream/10"
                      disabled={isWalletConnecting}
                      onClick={() => connectWallet()}
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      {isWalletConnecting ? "Connecting…" : "Connect MetaMask"}
                    </Button>
                  )}
                </div>
              )}
              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative text-cream hover:text-cream/80 hover:bg-cream/10">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md bg-forest-dark border-cream/10 text-cream">
                  <SheetHeader>
                    <SheetTitle className="text-cream">Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-cream/60 text-sm">Your cart is empty.</p>
                    ) : ( 
                      <>
                      
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-2 p-3 rounded-lg bg-cream/5">
                            <div className="min-w-0 flex-1">
                              <p className="font-body text-sm text-cream truncate">{item.name}</p>
                              <p className="font-body text-xs text-cream/60">₹{item.price.toLocaleString()}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 shrink-0" onClick={() => removeFromCart(item.id)}>Remove</Button>
                          </div>
                        ))}
                        <div className="border-t border-cream/10 pt-4">
                          <p className="font-display text-lg text-cream">Total: ₹{cartTotal.toLocaleString()}</p>
                          <div className="space-y-3 mb-4">
  <Input
    placeholder="Enter delivery address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="bg-cream/5 border-cream/20 text-cream"
  />

  <Input
    placeholder="Enter phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="bg-cream/5 border-cream/20 text-cream"
  />
</div>

                          {hasMetaMask ? (
                            <>
                              {isConnected && (
                                <p className="text-xs text-cream/60 mt-1 flex items-center gap-1">
                                  <Wallet className="w-3 h-3 text-green-400" />
                                  Paying with {formattedAddress}
                                </p>
                              )}
                              <Button
                                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                                disabled={purchasing}
                                onClick={handlePurchaseWithMetaMask}
                              >
                                {purchasing ? "Confirm in MetaMask…" : `Pay ₹${cartTotal.toLocaleString()} with MetaMask`}
                              </Button>
                            </>
                          ) : (
                            <p className="text-sm text-cream/60 mt-2">
                              Install <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">MetaMask</a> to pay with your wallet.
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-dark via-forest-dark/95 to-forest-medium text-cream py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-cream/10 text-cream border-cream/20 mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              Every Purchase Clears Landfills
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl mb-4 italic">
              Shop With Purpose
            </h2>
            <p className="font-body text-cream/70 text-lg mb-8">
              Beautiful products made from recovered landfill materials. 
              Each purchase helps clear Delhi's 35 lakh MT waste crisis.
            </p>
            
            {/* Impact Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-cream/5 backdrop-blur-sm rounded-lg p-4 border border-cream/10">
                <TrendingDown className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-display text-2xl text-cream">{impactStats.totalCo2Saved}</p>
                <p className="text-cream/60 text-sm">CO₂ Saved</p>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm rounded-lg p-4 border border-cream/10">
                <TreePine className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-display text-2xl text-cream">{impactStats.landfillCleared}</p>
                <p className="text-cream/60 text-sm">Landfill Cleared</p>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm rounded-lg p-4 border border-cream/10">
                <Recycle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-display text-2xl text-cream">{impactStats.productsCreated}</p>
                <p className="text-cream/60 text-sm">Products Created</p>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm rounded-lg p-4 border border-cream/10">
                <Heart className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-display text-2xl text-cream">{impactStats.happyCustomers}</p>
                <p className="text-cream/60 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-muted/30 border-b border-border py-4 sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search eco-friendly products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap"
                >
                  <cat.icon className="w-4 h-4 mr-1" />
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] bg-background">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <p className="text-muted-foreground">
              Showing {sortedProducts.length} products
            </p>
            {consumerProducts.length === 0 && sortedProducts.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Sample products. Sign in as a business and use Publish Product to list here.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  {product.verified && (
                    <div className="absolute top-3 right-3 bg-green-500/90 text-white p-1.5 rounded-full" title="Blockchain Verified">
                      <QrCode className="w-4 h-4" />
                    </div>
                  )}
                  
                  {/* Quick Impact Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Leaf className="w-3 h-3 text-green-400" />
                      <span>{product.co2Saved} CO₂ saved</span>
                      <span className="text-white/50">•</span>
                      <span>{product.wasteUsed} recovered</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Company */}
                  <div className="flex items-center gap-1 mb-2">
                    <Award className="w-3 h-3 text-primary" />
                    <span className="text-xs text-muted-foreground">{product.company}</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-display text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                  </div>

                  {/* AI-generated Story */}
                  {product.story && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setExpandedStoryId((id) => (id === product.id ? null : product.id))}
                        className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-medium"
                      >
                        <FileText className="w-3 h-3" />
                        {expandedStoryId === product.id ? "Hide story" : "Read story"}
                        {expandedStoryId === product.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      {expandedStoryId === product.id && (
                        <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded-lg whitespace-pre-wrap">{product.story}</p>
                      )}
                    </div>
                  )}

                  {/* Impact Info */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2 mb-4">
                    <p className="text-xs text-green-700 dark:text-green-400">
                      🌱 Your purchase clears {product.landfillCleared} of landfill
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-xl text-foreground">₹{product.price.toLocaleString()}</p>
                      {product.originalPrice > 0 && (
                        <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product.id)}
                      className="bg-forest-dark hover:bg-forest-medium text-cream"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Awareness Banner */}
      <section className="bg-forest-dark text-cream py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Recycle className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="font-display text-2xl md:text-3xl mb-4 italic">
              Every Product Has a Story
            </h3>
            <p className="text-cream/70 mb-6">
              Scan the QR code on any product to trace its journey from landfill to your home. 
              See exactly which landfill the materials came from, how much CO₂ was saved, 
              and the artisans who crafted it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-cream/10 px-4 py-2 rounded-full">
                <QrCode className="w-4 h-4" />
                <span className="text-sm">Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-cream/10 px-4 py-2 rounded-full">
                <Leaf className="w-4 h-4" />
                <span className="text-sm">Carbon Offset Included</span>
              </div>
              <div className="flex items-center gap-2 bg-cream/10 px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                <span className="text-sm">Certified Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Segregation Awareness Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
              <Trash2 className="w-3 h-3 mr-1" />
              Be Part of the Solution
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 italic">
              It Starts at Your Home
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Proper waste segregation at source makes recycling possible. 
              Learn how your simple daily actions can help clear Delhi's landfills.
            </p>
          </div>

          {/* Segregation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl mb-2 text-green-800 dark:text-green-400">Wet Waste</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Kitchen scraps, food leftovers, vegetable peels, fruit waste
                </p>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                  <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                    → Becomes organic compost
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl mb-2 text-blue-800 dark:text-blue-400">Dry Waste</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Paper, cardboard, plastic bottles, metal cans, glass
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                    → Recycled into new products
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl mb-2 text-red-800 dark:text-red-400">E-Waste</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Batteries, electronics, cables, mobile phones, chargers
                </p>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                  <p className="text-xs text-red-700 dark:text-red-400 font-medium">
                    → Safe disposal & recovery
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl mb-2 text-amber-800 dark:text-amber-400">Hazardous</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Medicines, chemicals, paints, cleaning products
                </p>
                <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-3">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    → Special treatment required
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why Segregation Matters */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-6 text-foreground italic">
                  Why Your Action Matters
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Reduces Landfill Burden</p>
                      <p className="text-sm text-muted-foreground">
                        Segregated waste means 60% less goes to landfills
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Enables Recycling</p>
                      <p className="text-sm text-muted-foreground">
                        Clean, sorted waste can become products you buy here
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Creates Jobs</p>
                      <p className="text-sm text-muted-foreground">
                        Supports waste workers and circular economy businesses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Saves the Environment</p>
                      <p className="text-sm text-muted-foreground">
                        Reduces greenhouse emissions and soil contamination
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-forest-dark to-forest-medium rounded-xl p-6 text-cream">
                <h4 className="font-display text-xl mb-4 italic">Your Impact Potential</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-cream/20 pb-3">
                    <span className="text-cream/70">If you segregate for 1 year:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="font-display text-3xl text-green-400">365 kg</p>
                      <p className="text-xs text-cream/60">Waste properly sorted</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-3xl text-green-400">219 kg</p>
                      <p className="text-xs text-cream/60">Diverted from landfill</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-3xl text-green-400">263 kg</p>
                      <p className="text-xs text-cream/60">CO₂ emissions avoided</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-3xl text-green-400">12</p>
                      <p className="text-xs text-cream/60">Trees worth of impact</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-cream/20">
                    <p className="text-sm text-cream/80 text-center">
                      Join 8,200+ conscious citizens making a difference
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Start segregating today. Buy eco-products. Close the loop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-forest-dark hover:bg-forest-medium text-cream"
                disabled={downloadingGuide}
                onClick={async () => {
                  setDownloadingGuide(true);
                  try {
                    const blob = await api.generateWasteReportPdf({});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "waste-segregation-guide.pdf";
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch {
                    // API may be down; no toast on consumer page
                  } finally {
                    setDownloadingGuide(false);
                  }
                }}
              >
                {downloadingGuide ? "Generating…" : "Download Segregation Guide"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.google.com/maps/search/waste+collection+centre+delhi" target="_blank" rel="noopener noreferrer">
                  Find Collection Centers Near You
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-dark/95 text-cream py-8 border-t border-cream/10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-lg italic mb-2">GreenBridge Market</p>
          <p className="text-cream/60 text-sm">
            Part of the GreenBridge circular economy platform. 
            Transforming Delhi's landfill crisis into beautiful products.
          </p>
          <div className="mt-4">
            <Link to="/" className="text-cream/60 hover:text-cream text-sm underline">
              Learn more about our mission →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
