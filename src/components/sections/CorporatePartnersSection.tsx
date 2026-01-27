import { useState } from "react";
import { Building, CheckCircle, ArrowRight, Users, TrendingUp, Leaf, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const onboardingSteps = [
  {
    step: "01",
    title: "Register & Verify",
    description: "Sign up with your company details and GST number. Our team verifies your business within 24 hours.",
    icon: Building,
  },
  {
    step: "02",
    title: "Browse & Match",
    description: "Explore available materials from government landfills. Our AI matches you with the best options for your needs.",
    icon: Users,
  },
  {
    step: "03",
    title: "Calculate ROI",
    description: "Use our calculator to see exact profit margins, carbon credits, and ESG impact for any material.",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Order & Track",
    description: "Place orders with transparent pricing. Track deliveries with GPS and verify quality on arrival.",
    icon: CheckCircle,
  },
];

const benefits = [
  {
    title: "30% Cost Savings",
    description: "Recovered materials cost 30% less than virgin raw materials",
    icon: TrendingUp,
  },
  {
    title: "Carbon Credits",
    description: "Earn ₹5-10 per MT CO₂e avoided, verified on blockchain",
    icon: Leaf,
  },
  {
    title: "ESG Compliance",
    description: "Auto-generated investor-ready ESG reports",
    icon: Shield,
  },
  {
    title: "Guaranteed Supply",
    description: "Government-backed inventory ensures reliable supply chain",
    icon: Building,
  },
];

export function CorporatePartnersSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <section className="py-24 bg-forest-dark" id="corporate-partners">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cream/60 uppercase tracking-widest text-sm mb-4">B2B Onboarding</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            Become a Corporate Partner
          </h2>
          <p className="font-body text-lg text-cream/70 max-w-3xl mx-auto">
            Join 50+ companies transforming landfill waste into premium products. 
            Get access to verified materials, carbon credits, and ESG reporting tools.
          </p>
        </div>

        {/* Onboarding Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {onboardingSteps.map((step, index) => (
            <div
              key={index}
              className="glass-card p-6 relative group hover:bg-cream/5 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream/20 transition-colors">
                  <step.icon className="w-6 h-6 text-cream" />
                </div>
                <span className="font-display text-3xl text-cream/20">{step.step}</span>
              </div>
              <h3 className="font-display text-xl text-cream mb-2">{step.title}</h3>
              <p className="font-body text-sm text-cream/60">{step.description}</p>
              {index < onboardingSteps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 text-cream/20 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Benefits & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div>
            <h3 className="font-display text-2xl text-cream mb-8">
              Why Partner With GreenBridge?
            </h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-cream/5 rounded-lg border border-cream/10"
                >
                  <div className="w-12 h-12 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-cream mb-1">{benefit.title}</h4>
                    <p className="font-body text-sm text-cream/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Story */}
            <div className="mt-8 p-6 bg-cream/5 rounded-lg border border-cream/20">
              <p className="font-body text-cream/80 italic mb-4">
                "GreenBridge helped us reduce raw material costs by 28% while earning carbon credits 
                worth ₹15L annually. Our ESG score improved by 12 points in just 6 months."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center">
                  <span className="font-display text-cream">R</span>
                </div>
                <div>
                  <p className="font-body text-sm text-cream">Rajesh Sharma</p>
                  <p className="font-body text-xs text-cream/60">CEO, GreenFurniture Ltd</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="glass-card p-8">
            <h3 className="font-display text-2xl text-cream mb-6">
              Register Your Company
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="info-label block mb-2">Company Name</label>
                <input
                  type="text"
                  className="input-elegant-filled w-full"
                  placeholder="Your Company Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="info-label block mb-2">Industry</label>
                <select
                  className="input-elegant-filled w-full"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="" className="bg-forest-dark">Select Industry</option>
                  <option value="furniture" className="bg-forest-dark">Furniture Manufacturing</option>
                  <option value="packaging" className="bg-forest-dark">Packaging</option>
                  <option value="construction" className="bg-forest-dark">Construction</option>
                  <option value="textile" className="bg-forest-dark">Textile</option>
                  <option value="electronics" className="bg-forest-dark">Electronics</option>
                  <option value="other" className="bg-forest-dark">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="info-label block mb-2">Contact Name</label>
                  <input
                    type="text"
                    className="input-elegant-filled w-full"
                    placeholder="John Doe"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="info-label block mb-2">Phone</label>
                  <input
                    type="tel"
                    className="input-elegant-filled w-full"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="info-label block mb-2">Business Email</label>
                <input
                  type="email"
                  className="input-elegant-filled w-full"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="info-label block mb-2">Material Requirements (Optional)</label>
                <textarea
                  className="input-elegant-filled w-full h-20 resize-none"
                  placeholder="e.g., 100 MT plastic monthly, Grade A preferred"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-elegant w-full">
                Submit Application
              </button>
              <p className="font-body text-xs text-cream/40 text-center">
                Our team will verify your details and reach out within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
