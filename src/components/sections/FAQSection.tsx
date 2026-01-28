import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this really waste or recyclable material?",
    answer: "All materials on GreenBridge are recovered from government landfills and undergo rigorous quality testing. They're classified by grade (A/B/C) based on purity and contamination levels. Grade A materials meet industry standards for manufacturing high-quality products.",
  },
  {
    question: "How do you verify carbon credits?",
    answer: "Every transaction generates a blockchain-verified certificate. We calculate CO₂ avoided using the standard formula: 1 MT waste diverted = 1.2 MT CO₂e. Each certificate includes the waste source, processing details, and can be independently verified on our public blockchain.",
  },
  {
    question: "What if material quality doesn't meet specifications?",
    answer: "We have a robust QA process. If material quality falls below the agreed grade, you're entitled to a price adjustment (₹50/MT per grade drop) or full refund. All disputes are resolved within 7 working days.",
  },
  {
    question: "Can we customize material specifications?",
    answer: "Yes, Mid-Cap and Enterprise tier customers can specify exact requirements including contamination levels, particle size, moisture content, and more. We match you with appropriate inventory or queue orders for future batches.",
  },
  {
    question: "How is pricing determined?",
    answer: "Prices are based on material type, quality grade, quantity ordered, and market conditions. Bulk orders (100+ MT) receive automatic discounts. All prices are 20-30% below virgin material market rates.",
  },
  {
    question: "What documentation is provided?",
    answer: "Each order includes: Invoice, Quality Certificate, Carbon Credit Certificate (blockchain-verified), MoU copy, Delivery Receipt, and an Impact Report for your ESG reporting needs.",
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery is 15-30 days depending on location and quantity. Express delivery (7-10 days) is available for Enterprise customers. All shipments include GPS tracking.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer: "Minimum order is 10 MT for SME tier and 50 MT for Mid-Cap/Enterprise. For smaller quantities, we can batch orders with other buyers in your region.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-forest-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Questions</p>
          <h2 className="section-title">FAQ</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-cream/10 last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="font-body text-cream pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cream/60 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
