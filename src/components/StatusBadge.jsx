import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let Icon = CheckCircle;
  let colorClass = 'text-emerald-400';
  let text = 'Operativo';

  const s = status?.toLowerCase() || '';

  if (s.includes('atención') || s.includes('warn')) {
    Icon = Clock;
    colorClass = 'text-amber-400';
    text = 'Atención';
  } else if (s.includes('crítico') || s.includes('alert')) {
    Icon = AlertTriangle;
    colorClass = 'text-red-400';
    text = 'Crítico';
  } else if (s.includes('tránsito')) {
    Icon = Clock;
    colorClass = 'text-sky-400';
    text = 'En tránsito';
  } else if (s.includes('programado')) {
    Icon = Clock;
    colorClass = 'text-[var(--muted-foreground)]';
    text = 'Programado';
  }

  return (
    <div className={`flex items-center gap-1.5 text-[12px] font-medium ${colorClass}`}>
      <Icon size={14} />
      <span>{status || text}</span>
    </div>
  );
};

export default StatusBadge;
