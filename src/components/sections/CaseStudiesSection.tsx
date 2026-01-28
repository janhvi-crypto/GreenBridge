import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const caseStudies = [
  {
    title: "Chennai Landfill to Premium Furniture",
    company: "GreenFurniture Ltd",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    stats: [
      { value: "1,200 MT", label: "Wood Recovered" },
      { value: "5,000+", label: "Items Made" },
      { value: "₹2.4 Cr", label: "Revenue" },
      { value: "1,440 MT", label: "CO₂ Avoided" },
    ],
    quote: "We transformed landfill waste into premium furniture, achieving 40% higher margins than virgin materials.",
  },
  {
    title: "Delhi C&D Waste to Roads",
    company: "National Highways Authority",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800",
    stats: [
      { value: "3,500 MT", label: "Debris Used" },
      { value: "15 km", label: "Roads Built" },
      { value: "₹7.5 Cr", label: "Cost Saved" },
      { value: "4,200 MT", label: "CO₂ Avoided" },
    ],
    quote: "GreenBridge helped us achieve our sustainability targets while reducing infrastructure costs by 35%.",
  },
  {
    title: "Plastic Waste to Affordable Housing",
    company: "EcoHomes Foundation",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    stats: [
      { value: "800 MT", label: "Plastic Used" },
      { value: "2,400", label: "Homes Built" },
      { value: "₹15 Cr", label: "Project Value" },
      { value: "960 MT", label: "CO₂ Avoided" },
    ],
    quote: "Each home contains recycled plastic bricks, proving that sustainability and affordability can coexist.",
  },
  {
    title: "Textile Waste to Fashion",
    company: "ReThread Apparel",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800",
    stats: [
      { value: "450 MT", label: "Textile Recovered" },
      { value: "12,000+", label: "Garments Made" },
      { value: "₹1.8 Cr", label: "Revenue" },
      { value: "540 MT", label: "CO₂ Avoided" },
    ],
    quote: "Our 'Landfill to Runway' collection sold out in 48 hours. Consumers love the sustainability story.",
  },
];

export function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentStudy = caseStudies[currentIndex];

  return (
    <section id="case-studies" className="relative py-24 bg-forest-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-subtitle">Success Stories</p>
          <h2 className="section-title">Case Studies</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="h-64 lg:h-auto">
                <img
                  src={currentStudy.image}
                  alt={currentStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <p className="font-body text-xs uppercase tracking-wider text-cream/60 mb-2">
                  {currentStudy.company}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl text-cream mb-6">
                  {currentStudy.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {currentStudy.stats.map((stat, index) => (
                    <div key={index}>
                      <p className="font-display text-xl text-cream">{stat.value}</p>
                      <p className="font-body text-xs text-cream/60">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="font-body text-sm text-cream/80 italic border-l-2 border-cream/30 pl-4">
                  "{currentStudy.quote}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-forest-dark transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-cream w-6" : "bg-cream/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-forest-dark transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
