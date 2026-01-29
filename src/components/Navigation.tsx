import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Process", href: "#process" },
  { label: "Impact", href: "#impact" },
  { label: "Shop", href: "/shop", isRoute: true },
  { label: "Partner", href: "#partner" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setMobileMenuOpen(false);
    if (isRoute) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-forest-dark/90 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="font-display text-2xl text-cream flex items-center gap-2">
            <span className="italic">GreenBridge</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className="nav-link"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="nav-link"
            >
              Login
            </button>
            <a href="#partner" className="btn-outline-elegant">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream hover:text-cream/80 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-forest-dark border-l border-cream/10 z-50
          transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-cream hover:text-cream/80 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="space-y-4">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, true)}
                  className="block w-full text-left font-body text-lg text-cream/80 hover:text-cream py-2 border-b border-cream/10 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block font-body text-lg text-cream/80 hover:text-cream py-2 border-b border-cream/10 transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-8 space-y-4">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full btn-outline-elegant"
            >
              Login
            </button>
            <a 
              href="#partner" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-elegant w-full text-center block"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
