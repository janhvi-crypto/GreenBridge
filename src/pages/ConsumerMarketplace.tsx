import { useState } from "react";
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
  TrendingDown
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

export default function ConsumerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter((product) => {
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

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="relative text-cream hover:text-cream/80 hover:bg-cream/10">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
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
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {sortedProducts.length} products
            </p>
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
                      <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</p>
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
