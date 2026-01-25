interface WasteCardProps {
  type: string;
  quantity: number;
  icon: string;
  colorClass: string;
  delay?: number;
}

export function WasteCard({ type, quantity, icon, colorClass, delay = 0 }: WasteCardProps) {
  return (
    <div 
      className="bg-card rounded-xl p-5 shadow-md card-hover animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center text-2xl text-white shadow-md`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-lg">{type}</h4>
          <p className="text-muted-foreground">
            <span className="text-2xl font-bold text-primary">{quantity}</span>
            <span className="ml-1 text-sm">MT available</span>
          </p>
        </div>
      </div>
    </div>
  );
}
