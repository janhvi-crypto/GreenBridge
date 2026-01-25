import sectionBg from "@/assets/section-bg.jpg";

const processSteps = [
  { step: "01", title: "Waste Inventory Mapping", description: "AI analyzes landfill contents" },
  { step: "02", title: "Quality Classification", description: "Materials graded by purity" },
  { step: "03", title: "Industry Matching", description: "Connect with verified buyers" },
  { step: "04", title: "Logistics Coordination", description: "Streamlined transport" },
  { step: "05", title: "Documentation", description: "MoU and compliance handled" },
  { step: "06", title: "Impact Tracking", description: "Carbon credits generated" },
];

const wasteCategories = [
  { type: "Reclaimed Wood", quantity: "650 MT" },
  { type: "Metal / Steel", quantity: "520 MT" },
  { type: "Plastic / PET", quantity: "380 MT" },
  { type: "Construction Debris", quantity: "450 MT" },
  { type: "Textile / Fabric", quantity: "470 MT" },
  { type: "Electronic Waste", quantity: "177 MT" },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative min-h-screen py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={sectionBg}
          alt="Dark foliage background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/95 via-forest-dark/80 to-forest-dark/95" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="section-subtitle">How It Works</p>
            <h2 className="section-title">
              Process Flow
            </h2>
            <a href="#partner" className="btn-elegant mt-8 inline-flex">
              Register now
            </a>
          </div>

          {/* Process Timeline */}
          <div className="space-y-0">
            {processSteps.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="timeline-time">{item.step}</span>
                <div>
                  <span className="timeline-label font-medium text-cream">{item.title}</span>
                  <span className="timeline-label ml-4 hidden md:inline">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waste Categories Grid */}
        <div className="mt-24">
          <p className="section-subtitle text-center mb-12">Available Materials</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {wasteCategories.map((category, index) => (
              <div
                key={index}
                className="glass-card text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-display text-lg text-cream mb-1">{category.type}</p>
                <p className="font-body text-2xl font-light text-cream">{category.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
