import { useState, useEffect } from "react";
import { Package, Layers, Building2, Leaf } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { WasteChart } from "./WasteChart";
import { WasteCard } from "./WasteCard";

const wasteCategories = [
  { type: "Reclaimed Wood", quantity: 650, icon: "🪵", colorClass: "bg-amber-700" },
  { type: "Metal/Steel", quantity: 520, icon: "⚙️", colorClass: "bg-slate-500" },
  { type: "Plastic/PET", quantity: 380, icon: "♻️", colorClass: "bg-blue-500" },
  { type: "Construction Debris", quantity: 450, icon: "🧱", colorClass: "bg-yellow-600" },
  { type: "Textile/Fabric", quantity: 470, icon: "🧵", colorClass: "bg-pink-400" },
  { type: "Electronic Waste", quantity: 177, icon: "💻", colorClass: "bg-orange-500" },
];

export function Dashboard() {
  const [co2Counter, setCo2Counter] = useState(3416);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Counter((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tab-content-enter space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Waste Available"
          value="2,847"
          suffix="MT"
          icon={<Package className="w-6 h-6" />}
          delay={0}
        />
        <MetricCard
          title="Waste Categories"
          value={6}
          suffix="types"
          icon={<Layers className="w-6 h-6" />}
          delay={100}
        />
        <MetricCard
          title="Companies Interested"
          value={12}
          suffix="active"
          icon={<Building2 className="w-6 h-6" />}
          delay={200}
        />
        <MetricCard
          title="CO₂ Diverted (LIVE)"
          value={co2Counter.toLocaleString()}
          suffix="MT"
          icon={<Leaf className="w-6 h-6" />}
          isAnimated
          delay={300}
        />
      </div>

      {/* Chart and Waste Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WasteChart />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Real-time Landfill Data
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wasteCategories.map((waste, index) => (
              <WasteCard
                key={waste.type}
                {...waste}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
