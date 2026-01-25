import { Sofa, Recycle, Factory } from "lucide-react";

const stories = [
  {
    icon: <Sofa className="w-8 h-8" />,
    emoji: "🛋️",
    title: "Chennai Landfill → Premium Furniture",
    description: "Reclaimed wood from Chennai's largest landfill transformed into high-quality sustainable furniture, creating jobs and reducing environmental impact.",
    metrics: [
      { label: "Waste Used", value: "1,200 MT", sublabel: "Wood" },
      { label: "Products Made", value: "5,000", sublabel: "Furniture Items" },
      { label: "Revenue", value: "₹2.4 Cr", sublabel: "Generated" },
      { label: "CO₂ Avoided", value: "1,440", sublabel: "MT CO₂e" },
    ],
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    emoji: "♻️",
    title: "Delhi Construction Waste → Roads",
    description: "Construction debris from Delhi NCR repurposed into durable road materials, reducing virgin resource extraction and infrastructure costs.",
    metrics: [
      { label: "Waste Used", value: "3,500 MT", sublabel: "Debris" },
      { label: "Roads Built", value: "15 km", sublabel: "Highway" },
      { label: "Cost Saved", value: "₹7.5 Cr", sublabel: "Infrastructure" },
      { label: "CO₂ Avoided", value: "4,200", sublabel: "MT CO₂e" },
    ],
  },
  {
    icon: <Factory className="w-8 h-8" />,
    emoji: "🏭",
    title: "Plastic Waste → Affordable Housing",
    description: "Innovative recycling technology converting plastic waste into construction blocks for affordable housing projects across India.",
    metrics: [
      { label: "Waste Used", value: "800 MT", sublabel: "Plastic" },
      { label: "Homes Built", value: "2,400", sublabel: "Units" },
      { label: "Revenue", value: "₹15 Cr", sublabel: "Generated" },
      { label: "CO₂ Avoided", value: "960", sublabel: "MT CO₂e" },
    ],
  },
];

export function SuccessStories() {
  return (
    <div className="tab-content-enter space-y-8">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-3">Impact Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real transformations from waste to value, creating environmental and economic impact across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <div
            key={index}
            className="story-card animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {story.icon}
              </div>
              <span className="text-3xl">{story.emoji}</span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-3">{story.title}</h3>
            <p className="text-muted-foreground text-sm mb-6">{story.description}</p>

            <div className="grid grid-cols-2 gap-4">
              {story.metrics.map((metric, mIndex) => (
                <div
                  key={mIndex}
                  className="p-3 bg-muted/50 rounded-lg text-center"
                >
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-lg font-bold text-primary">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-primary text-white rounded-2xl p-8 shadow-glow animate-scale-in mt-12">
        <h3 className="text-2xl font-bold text-center mb-8">Total Platform Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold">5,500+</p>
            <p className="text-white/80 text-sm mt-1">MT Waste Diverted</p>
          </div>
          <div>
            <p className="text-4xl font-bold">₹24.9 Cr</p>
            <p className="text-white/80 text-sm mt-1">Economic Value Created</p>
          </div>
          <div>
            <p className="text-4xl font-bold">6,600+</p>
            <p className="text-white/80 text-sm mt-1">MT CO₂ Avoided</p>
          </div>
          <div>
            <p className="text-4xl font-bold">7,400+</p>
            <p className="text-white/80 text-sm mt-1">Products Created</p>
          </div>
        </div>
      </div>
    </div>
  );
}
