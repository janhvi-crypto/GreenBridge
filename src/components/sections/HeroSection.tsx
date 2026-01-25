import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-leaves.jpg";

export function HeroSection() {
  const [co2Counter, setCo2Counter] = useState(3416);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Counter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lush green foliage"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay" />
      </div>

      {/* Top Stats Bar */}
      <div className="relative z-10 pt-28 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            <div>
              <p className="info-label">Total Waste Available</p>
              <p className="info-value">2,847 MT</p>
            </div>
            <div>
              <p className="info-label">Waste Categories</p>
              <p className="info-value">6 Types</p>
            </div>
            <div>
              <p className="info-label">Partner Companies</p>
              <p className="info-value">12 Active</p>
            </div>
            <div>
              <p className="info-label">CO₂ Diverted (Live)</p>
              <p className="info-value counter-glow">{co2Counter.toLocaleString()} MT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">
            <p className="section-subtitle animate-fade-up">
              Transforming Delhi's Landfills
            </p>
            <h1 className="section-title mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Bridge to a<br />Greener Future
            </h1>
            <p className="font-body text-lg md:text-xl text-cream-muted max-w-xl mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              An AI-powered marketplace connecting government landfill waste 
              with industries seeking sustainable raw materials.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a href="#partner" className="btn-elegant">
                Register as Partner
              </a>
              <a href="#process" className="btn-outline-elegant">
                View Process
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-cream/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
