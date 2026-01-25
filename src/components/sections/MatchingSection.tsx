import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import sectionBg from "@/assets/section-bg.jpg";

const wasteTypes = [
  "Reclaimed Wood",
  "Metal / Steel",
  "Plastic / PET",
  "Textile / Fabric",
  "Construction Debris",
  "Electronic Waste",
];

export function MatchingSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    wasteType: "",
    quantity: "",
    contactPerson: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.wasteType) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    
    toast({
      title: "Registration Submitted",
      description: "We'll match you with available materials within 48 hours.",
    });

    setFormData({
      companyName: "",
      email: "",
      wasteType: "",
      quantity: "",
      contactPerson: "",
    });
  };

  return (
    <section id="partner" className="relative min-h-screen py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={sectionBg}
          alt="Dark foliage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-dark/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="section-subtitle">Become a Partner</p>
            <h2 className="section-title mb-8">
              Register Your<br />Requirement
            </h2>
            <p className="font-body text-lg text-cream-muted mb-8 max-w-md">
              Join our marketplace to access verified, quality-graded materials 
              from government landfills. AI-powered matching ensures the best fit 
              for your manufacturing needs.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                "Direct access to government waste inventory",
                "AI-powered quality matching",
                "Streamlined documentation & MoU",
                "Carbon credit certification included",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-cream-muted">
                  <span className="w-2 h-2 rounded-full bg-cream/50" />
                  <span className="font-body">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="glass-card">
            <h3 className="font-display text-2xl text-cream mb-8">Company Registration</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="info-label block mb-2">Company Name *</label>
                <input
                  type="text"
                  className="input-elegant-filled"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>

              <div>
                <label className="info-label block mb-2">Email Address *</label>
                <input
                  type="email"
                  className="input-elegant-filled"
                  placeholder="email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="info-label block mb-2">Material Required *</label>
                <select
                  className="input-elegant-filled"
                  value={formData.wasteType}
                  onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                >
                  <option value="">Select material type</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="info-label block mb-2">Quantity (MT)</label>
                  <input
                    type="number"
                    className="input-elegant-filled"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="info-label block mb-2">Contact Person</label>
                  <input
                    type="text"
                    className="input-elegant-filled"
                    placeholder="Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-elegant w-full mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
