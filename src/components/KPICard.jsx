import React from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';

const KPICard = ({ label, value, unit, trend, trendValue, subtext, accent, breakdown }) => {
  let TrendIcon = Minus;
  let trendColor = 'text-[var(--muted-foreground)]';

  if (trend > 0) {
    TrendIcon = ChevronUp;
    trendColor = 'text-emerald-400';
  } else if (trend < 0) {
    TrendIcon = ChevronDown;
    trendColor = 'text-red-400';
  }

  return (
    <div className={`p-4 rounded-lg border transition-colors flex flex-col gap-2 ${
      accent === 'blue' 
        ? 'bg-blue-500/10 border-blue-500/30'
        : accent 
          ? 'bg-[var(--primary)]/10 border-[rgba(196,18,48,0.3)]' 
          : 'bg-[var(--card)] border-[var(--border)] hover:border-white/10'
    }`}>
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)]">
          {label}
        </span>
        {trendValue && (
          <div className={`flex items-center gap-0.5 text-[12px] ${trendColor}`}>
            <TrendIcon size={13} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-[26px] font-semibold text-[var(--foreground)] leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-[14px] text-[var(--muted-foreground)]">
            {unit}
          </span>
        )}
      </div>

      {subtext && (
        <span className="text-[12px] text-[var(--muted-foreground)] mt-auto">
          {subtext}
        </span>
      )}

      {breakdown && (
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="w-full h-1.5 flex rounded-full overflow-hidden">
            {breakdown.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: item.color, width: `${item.value}%` }}></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-[9px] font-medium text-[var(--muted-foreground)]">
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                {item.label} {item.value}%
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard;
