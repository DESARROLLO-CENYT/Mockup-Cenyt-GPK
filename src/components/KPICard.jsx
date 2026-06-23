import React from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';

const KPICard = ({ label, value, unit, trend, trendValue, subtext, accent }) => {
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
    <div className={`p-5 rounded-lg border transition-colors flex flex-col gap-3 ${
      accent 
        ? 'bg-[var(--primary)]/10 border-[rgba(196,18,48,0.3)]' 
        : 'bg-[var(--card)] border-[var(--border)] hover:border-white/10'
    }`}>
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)]">
          {label}
        </span>
        {trendValue && (
          <div className={`flex items-center gap-0.5 text-[12px] font-mono ${trendColor}`}>
            <TrendIcon size={13} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-[30px] font-semibold font-mono text-[var(--foreground)] leading-none">
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
    </div>
  );
};

export default KPICard;
