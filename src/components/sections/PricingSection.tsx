import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricingTiers = [
  {
    name: "SME Partner",
    description: "For small and medium enterprises",
    price: "₹2,000",
    unit: "/MT",
    features: [
      { text: "Access to marketplace", included: true },
      { text: "Basic ROI calculator", included: true },
      { text: "Email support", included: true },
      { text: "Monthly impact reports", included: true },
      { text: "Carbon credit certificates", included: true },
      { text: "Bulk order discounts", included: false },
      { text: "Priority matching", included: false },
      { text: "Dedicated account manager", included: false },
      { text: "API access", included: false },
    ],
    highlight: false,
  },
  {
    name: "Mid-Cap Partner",
    description: "For growing businesses",
    price: "₹1,900",
    unit: "/MT",
    badge: "Most Popular",
    features: [
      { text: "Access to marketplace", included: true },
      { text: "Advanced ROI calculator", included: true },
      { text: "Priority email + phone support", included: true },
      { text: "Weekly impact reports", included: true },
      { text: "Carbon credit certificates", included: true },
      { text: "10% bulk order discounts", included: true },
      { text: "Priority matching", included: true },
      { text: "Dedicated account manager", included: false },
      { text: "API access", included: false },
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "For large corporations",
    price: "Custom",
    unit: "",
    features: [
      { text: "Access to marketplace", included: true },
      { text: "Custom ROI modeling", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Real-time impact dashboard", included: true },
      { text: "Carbon credit certificates", included: true },
      { text: "15% bulk order discounts", included: true },
      { text: "Priority matching + AI recommendations", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Full API access + ERP integration", included: true },
    ],
    highlight: false,
  },
];

const benefits = [
  { label: "30% Cheaper Materials", description: "vs virgin raw materials" },
  { label: "Carbon Credits", description: "₹5-10/MT CO₂e" },
  { label: "ESG Auto-Reports", description: "Investor-ready" },
  { label: "Blockchain Verification", description: "No greenwashing" },
  { label: "ROI Calculator", description: "Instant profitability check" },
  { label: "Guaranteed Supply", description: "Via government partnerships" },
  { label: "Premium Positioning", description: "Ikea model" },
];

export function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-forest-dark/50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cream/60 uppercase tracking-widest text-sm mb-4">Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-lg text-cream/70 max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include access to verified government waste inventory.
          </p>
        </div>

        {/* Benefits Bar */}
        <div className="mb-16 overflow-x-auto">
          <div className="flex gap-6 justify-center flex-wrap">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center px-4 py-3 bg-cream/5 rounded-lg border border-cream/10"
              >
                <p className="font-body text-sm text-cream">{benefit.label}</p>
                <p className="font-body text-xs text-cream/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative glass-card p-8 ${
                tier.highlight
                  ? "border-2 border-cream/40 scale-105 shadow-2xl"
                  : "border border-cream/10"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-cream text-forest-dark font-body text-sm rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl text-cream mb-2">{tier.name}</h3>
                <p className="font-body text-sm text-cream/60 mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-4xl text-cream">{tier.price}</span>
                  <span className="font-body text-cream/60">{tier.unit}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-cream/30 flex-shrink-0" />
                    )}
                    <span className={`font-body text-sm ${feature.included ? "text-cream/80" : "text-cream/40"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/login")}
                className={tier.highlight ? "btn-elegant w-full" : "btn-outline-elegant w-full"}
              >
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        {/* Commission Note */}
        <p className="text-center font-body text-sm text-cream/40 mt-12">
          All prices are base rates. A 5-8% transaction commission applies to successful orders.
        </p>
      </div>
    </section>
  );
}
