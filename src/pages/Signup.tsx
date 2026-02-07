import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Building2, Landmark, ArrowRight, ArrowLeft } from "lucide-react";

type UserRole = "business" | "government" | null;

export default function Signup() {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: role ?? undefined },
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    if (data.user && !data.session && data.user.identities?.length === 0) {
      setMessage("An account with this email already exists. Please log in instead.");
      setIsLoading(false);
      return;
    }

    if (data.session && role) {
      if (role === "business") {
        navigate("/dashboard");
      } else {
        navigate("/government-dashboard");
      }
    } else {
      setMessage(
        "Check your email for the confirmation link. After confirming, use the login page and select your account type (Business or Government) to sign in."
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(45, 30%, 92%) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cream/60 hover:text-cream transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-cream italic mb-2">GreenBridge</h1>
          <p className="font-body text-sm text-cream/60">Become a Partner</p>
        </div>

        {!role ? (
          <div className="space-y-6 animate-fade-up">
            <p className="font-body text-cream/80 text-center mb-8">
              Choose your account type. This cannot be changed later.
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
                  For companies: matching engine, ROI calculator, and analytics
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
                  For government: inventory, approvals, and compliance tracking
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-cream transition-colors" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="animate-fade-up">
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
              {message && (
                <p className="font-body text-sm text-amber-200 bg-amber-900/30 border border-amber-700/50 rounded-lg p-3">
                  {message}
                </p>
              )}
              <div>
                <label className="info-label block mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-elegant-filled"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="info-label block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  className="input-elegant-filled"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-elegant w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center font-body text-sm text-cream/60">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-cream hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
