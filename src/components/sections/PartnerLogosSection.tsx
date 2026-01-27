const partners = [
  { name: "GreenFurniture", industry: "Furniture" },
  { name: "MetalCorp", industry: "Manufacturing" },
  { name: "EcoPackaging", industry: "Packaging" },
  { name: "TextileWorks", industry: "Textile" },
  { name: "ConstructMax", industry: "Construction" },
  { name: "BioCycle", industry: "Recycling" },
  { name: "ReNew Materials", industry: "Sustainability" },
  { name: "CircularTech", industry: "Technology" },
];

const governmentPartners = [
  "Delhi MCD",
  "Haryana PWD",
  "South Delhi Municipal Corporation",
  "East Delhi Municipal Corporation",
  "North Delhi Municipal Corporation",
  "Gurgaon Municipal Corporation",
];

export function PartnerLogosSection() {
  return (
    <section className="py-20 bg-forest-dark/30" id="partners">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-cream/60 uppercase tracking-widest text-sm mb-4">Trusted By</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream">
            50+ Companies Onboarded
          </h2>
        </div>

        {/* Company Partners */}
        <div className="mb-16">
          <p className="text-center font-body text-sm text-cream/40 uppercase tracking-wider mb-8">
            Business Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="glass-card p-4 text-center hover:bg-cream/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-cream/20 transition-colors">
                  <span className="font-display text-lg text-cream">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <p className="font-body text-sm text-cream">{partner.name}</p>
                <p className="font-body text-xs text-cream/40">{partner.industry}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Government Partners */}
        <div>
          <p className="text-center font-body text-sm text-cream/40 uppercase tracking-wider mb-8">
            Government Partners
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {governmentPartners.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-cream/5 rounded-lg border border-cream/10 hover:border-cream/30 transition-colors"
              >
                <p className="font-body text-sm text-cream/80">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="font-display text-4xl text-cream mb-2">₹1.4 Cr</p>
            <p className="font-body text-sm text-cream/60">Revenue Generated (Y1)</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-cream mb-2">2,847 MT</p>
            <p className="font-body text-sm text-cream/60">Waste Available</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-cream mb-2">3,416 MT</p>
            <p className="font-body text-sm text-cream/60">CO₂ Diverted</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-cream mb-2">50+</p>
            <p className="font-body text-sm text-cream/60">Active Partners</p>
          </div>
        </div>
      </div>
    </section>
  );
}
