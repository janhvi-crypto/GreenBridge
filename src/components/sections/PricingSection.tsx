import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "SME",
    description: "For small & medium enterprises",
    priceRange: "₹1,800 - 2,200",
    unit: "per MT",
    features: [
      "Access to all 6 waste categories",
      "Basic AI matching",
      "Standard quality grades",
      "Email support",
      "Monthly impact reports",
      "Carbon credit certificates",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Mid-Cap",
    description: "For growing businesses",
    priceRange: "₹1,600 - 2,000",
    unit: "per MT",
    features: [
      "Everything in SME",
      "Priority AI matching",
      "Grade A materials first access",
      "Dedicated account manager",
      "Weekly analytics dashboard",
      "Bulk order discounts (10%)",
      "Custom quality specifications",
      "ESG report generation",
    ],
    cta: "Contact Sales",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large corporations",
    priceRange: "Custom",
    unit: "pricing",
    features: [
      "Everything in Mid-Cap",
      "Guaranteed supply agreements",
      "Exclusive material reservations",
      "API access for ERP integration",
      "On-site quality inspections",
      "Custom logistics solutions",
      "White-label product branding",
      "Board-ready sustainability reports",
      "Carbon credit trading platform",
    ],
    cta: "Talk to Us",
    popular: false,
  },
];

const wasteCategories = [
  { type: "Reclaimed Wood", price: "₹1,800 - 2,200/MT" },
  { type: "Metal / Steel", price: "₹2,000 - 2,400/MT" },
  { type: "Plastic / PET", price: "₹1,500 - 2,000/MT" },
  { type: "Construction Debris", price: "₹800 - 1,200/MT" },
  { type: "Textile / Fabric", price: "₹1,200 - 1,800/MT" },
  { type: "Electronic Waste", price: "₹3,000 - 5,000/MT" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-forest-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Pricing</p>
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="font-body text-lg text-cream-muted mt-4 max-w-2xl mx-auto">
            30% cheaper than virgin materials with carbon credits included
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`glass-card p-8 relative ${
                tier.popular ? "border-cream/40 scale-105" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-cream text-forest-dark px-4 py-1 rounded-full text-xs font-body uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-display text-2xl text-cream mb-2">{tier.name}</h3>
              <p className="font-body text-sm text-cream/60 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="font-display text-3xl text-cream">{tier.priceRange}</span>
                <span className="font-body text-sm text-cream/60 ml-2">{tier.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-cream/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#partner"
                className={tier.popular ? "btn-elegant w-full text-center" : "btn-outline-elegant w-full text-center"}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Material Pricing Reference */}
        <div className="glass-card p-8">
          <h3 className="font-display text-xl text-cream mb-6 text-center">
            Material Price Reference
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {wasteCategories.map((category, index) => (
              <div key={index} className="text-center p-4 bg-cream/5 rounded-lg">
                <p className="font-body text-sm text-cream mb-1">{category.type}</p>
                <p className="font-display text-lg text-cream/80">{category.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
