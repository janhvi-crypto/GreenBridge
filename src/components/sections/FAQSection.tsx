import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this really waste or recyclable material?",
    answer: "All materials listed on GreenBridge are recovered, processed, and quality-certified waste from government landfills. Each batch undergoes rigorous testing and is assigned a quality grade (A, B, or C) based on purity levels. Grade A materials have less than 2% contamination and are suitable for high-quality manufacturing."
  },
  {
    question: "How do you verify carbon credits?",
    answer: "Every carbon credit is verified through our blockchain-based system. When waste is diverted from landfills, we calculate the CO₂e offset using industry-standard factors (1 MT waste = 1.2 MT CO₂e). Each credit is recorded on an immutable blockchain ledger with complete traceability from source to certificate. You can scan the QR code on any certificate to verify its authenticity."
  },
  {
    question: "What if material quality is poor?",
    answer: "We have a rigorous quality assurance process. Before shipment, government QA teams inspect and certify each batch. Upon delivery, you can conduct your own quality check. If the material doesn't match the specified grade, you can initiate a dispute within 48 hours. Our resolution process includes partial refunds, replacement materials, or price adjustments based on actual quality received."
  },
  {
    question: "Can we customize material specifications?",
    answer: "Yes! For orders above 100 MT, we offer custom material specifications. You can request specific particle sizes, contamination thresholds, moisture content, and other parameters. Our government partners will then process and certify materials to your exact requirements. Custom orders may have longer lead times."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery times range from 7-20 days depending on material type and location. Construction debris has the fastest turnaround (7 days), while electronics waste requires additional processing (20 days). All deliveries include GPS tracking, and you'll receive real-time updates on your order status through the dashboard."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers (Net 30 days for verified partners), credit cards (2% processing fee), UPI for real-time payments, and cheques for offline transactions. Enterprise partners can also set up custom payment terms based on their procurement cycles."
  },
  {
    question: "How do MOUs and supply agreements work?",
    answer: "For recurring orders or long-term partnerships, we facilitate MOUs between your company and the government department. Our platform generates draft agreements based on your requirements, handles digital signatures from both parties, and maintains a complete audit trail. Most MOUs are approved within 2-3 business days."
  },
  {
    question: "What industries are you serving?",
    answer: "GreenBridge serves multiple industries including furniture manufacturing, packaging, construction, textiles, and electronics recycling. Our top use cases include reclaimed wood for furniture, plastic for packaging materials, construction debris for road aggregates, and textile waste for insulation products."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-forest-dark" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cream/60 uppercase tracking-widest text-sm mb-4">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg text-cream/70 max-w-2xl mx-auto">
            Everything you need to know about GreenBridge and the circular economy marketplace.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-display text-lg text-cream">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cream/60 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="font-body text-cream/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-cream/60 mb-4">
            Still have questions?
          </p>
          <a href="#contact" className="btn-outline-elegant">
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
