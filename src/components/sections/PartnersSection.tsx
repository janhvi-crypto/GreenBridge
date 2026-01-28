const partners = [
  { name: "EcoFurniture Co.", category: "Furniture" },
  { name: "GreenBuild India", category: "Construction" },
  { name: "ReThread Apparel", category: "Textile" },
  { name: "MetalCorp Industries", category: "Manufacturing" },
  { name: "PlastiCycle Ltd.", category: "Packaging" },
  { name: "TechRecycle Hub", category: "Electronics" },
  { name: "WoodWorks Studio", category: "Furniture" },
  { name: "EcoPackaging Co.", category: "Packaging" },
];

const governmentPartners = [
  "Delhi Municipal Corporation",
  "Haryana Urban Development",
  "Ministry of Environment",
  "NHAI",
];

export function PartnersSection() {
  return (
    <section className="py-20 bg-forest-dark border-y border-cream/10">
      <div className="container mx-auto px-6">
        {/* Government Partners */}
        <div className="text-center mb-12">
          <p className="section-subtitle">Government Partners</p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {governmentPartners.map((partner, index) => (
              <div
                key={index}
                className="px-8 py-4 border border-cream/20 rounded-lg"
              >
                <p className="font-body text-sm text-cream/80">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Partners */}
        <div className="text-center mt-16">
          <p className="section-subtitle">50+ Companies Onboarded</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover:bg-cream/10 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream/10 flex items-center justify-center">
                  <span className="font-display text-2xl text-cream">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <p className="font-body text-sm text-cream">{partner.name}</p>
                <p className="font-body text-xs text-cream/50">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
