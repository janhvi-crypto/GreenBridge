import impactBg from "@/assets/impact-bg.jpg";

const successStories = [
  {
    title: "Chennai Landfill to Furniture",
    stats: [
      { value: "1,200 MT", label: "Wood Used" },
      { value: "5,000", label: "Items Made" },
      { value: "₹2.4 Cr", label: "Revenue" },
      { value: "1,440 MT", label: "CO₂ Saved" },
    ],
  },
  {
    title: "Delhi Debris to Roads",
    stats: [
      { value: "3,500 MT", label: "Debris Used" },
      { value: "15 km", label: "Roads Built" },
      { value: "₹7.5 Cr", label: "Cost Saved" },
      { value: "4,200 MT", label: "CO₂ Saved" },
    ],
  },
  {
    title: "Plastic to Housing",
    stats: [
      { value: "800 MT", label: "Plastic Used" },
      { value: "2,400", label: "Homes Built" },
      { value: "₹15 Cr", label: "Revenue" },
      { value: "960 MT", label: "CO₂ Saved" },
    ],
  },
];

const totalImpact = [
  { value: "5,500+", label: "MT Waste Diverted" },
  { value: "₹24.9 Cr", label: "Value Created" },
  { value: "6,600+", label: "MT CO₂ Avoided" },
  { value: "7,400+", label: "Products Made" },
];

export function ImpactSection() {
  return (
    <section id="impact" className="relative min-h-screen py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={impactBg}
          alt="Recycling facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/85 to-forest-dark/70" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="section-subtitle">Real Impact</p>
          <h2 className="section-title">
            Success Stories
          </h2>
          <p className="font-body text-lg text-cream-muted mt-6">
            Transformations that prove the circular economy works—creating 
            jobs, value, and environmental impact.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="glass-card animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="font-display text-2xl text-cream mb-6">{story.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {story.stats.map((stat, sIndex) => (
                  <div key={sIndex}>
                    <p className="font-display text-2xl text-cream">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wider text-cream-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total Impact Stats */}
        <div className="glass-card">
          <p className="section-subtitle text-center mb-8">Total Platform Impact</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {totalImpact.map((item, index) => (
              <div 
                key={index} 
                className="metric-display animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="metric-value">{item.value}</p>
                <p className="metric-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
