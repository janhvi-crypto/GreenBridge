import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  suffix?: string;
  isAnimated?: boolean;
  delay?: number;
}

export function MetricCard({ title, value, icon, suffix, isAnimated, delay = 0 }: MetricCardProps) {
  return (
    <div 
      className="metric-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold text-foreground ${isAnimated ? 'counter-animate text-primary' : ''}`}>
          {value}
        </span>
        {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
