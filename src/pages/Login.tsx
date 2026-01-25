import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Landmark, ArrowRight, ArrowLeft } from "lucide-react";

type UserRole = "business" | "government" | null;

export default function Login() {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - replace with actual backend integration
    setTimeout(() => {
      if (role === "business") {
        navigate("/dashboard");
      } else if (role === "government") {
        navigate("/government-dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(45, 30%, 92%) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cream/60 hover:text-cream transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-cream italic mb-2">GreenBridge</h1>
          <p className="font-body text-sm text-cream/60">Partner Portal Access</p>
        </div>

        {/* Role Selection */}
        {!role ? (
          <div className="space-y-6 animate-fade-up">
            <p className="font-body text-cream/80 text-center mb-8">
              Select your account type to continue
            </p>
            
            <button
              onClick={() => setRole("business")}
              className="w-full glass-card p-6 flex items-center gap-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream/20 transition-colors">
                <Building2 className="w-8 h-8 text-cream" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-display text-xl text-cream mb-1">Business Company</h3>
                <p className="font-body text-sm text-cream/60">
                  Access matching engine, ROI calculator, and analytics
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-cream transition-colors" />
            </button>

            <button
              onClick={() => setRole("government")}
              className="w-full glass-card p-6 flex items-center gap-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream/20 transition-colors">
                <Landmark className="w-8 h-8 text-cream" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-display text-xl text-cream mb-1">Government Department</h3>
                <p className="font-body text-sm text-cream/60">
                  Manage inventory, approvals, and compliance tracking
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-cream transition-colors" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="animate-fade-up">
            {/* Role Badge */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <button
                type="button"
                onClick={() => setRole(null)}
                className="text-cream/60 hover:text-cream transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10">
                {role === "business" ? (
                  <Building2 className="w-4 h-4 text-cream" />
                ) : (
                  <Landmark className="w-4 h-4 text-cream" />
                )}
                <span className="font-body text-sm text-cream">
                  {role === "business" ? "Business Company" : "Government Department"}
                </span>
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <div>
                <label className="info-label block mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-elegant-filled"
                  required
                />
              </div>

              <div>
                <label className="info-label block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input-elegant-filled"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/30" />
                  <span className="font-body text-sm text-cream/70">Remember me</span>
                </label>
                <button type="button" className="font-body text-sm text-cream/70 hover:text-cream transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-elegant w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center font-body text-sm text-cream/60">
                Don't have an account?{" "}
                <a href="#partner" onClick={() => navigate("/#partner")} className="text-cream hover:underline">
                  Become a Partner
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
