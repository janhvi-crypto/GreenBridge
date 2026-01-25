import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const wasteData = [
  { name: "Wood", value: 650, color: "#8B4513" },
  { name: "Metal", value: 520, color: "#708090" },
  { name: "Plastic", value: 380, color: "#4169E1" },
  { name: "Construction", value: 450, color: "#DAA520" },
  { name: "Textile", value: 470, color: "#FF69B4" },
  { name: "Electronic", value: 177, color: "#FF6347" },
];

export function WasteChart() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg animate-scale-in">
      <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
        Waste Breakdown by Category
      </h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={wasteData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value} MT`}
              labelLine={{ stroke: '#666', strokeWidth: 1 }}
            >
              {wasteData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} MT`, 'Quantity']}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
