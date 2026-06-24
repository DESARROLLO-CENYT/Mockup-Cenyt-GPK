import React from 'react';
import KPICard from '../components/KPICard';

const Badge = ({ type, text }) => {
  let colors = '';
  switch (type) {
    case 'ACT':
      colors = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      break;
    case 'S/BY':
      colors = 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400';
      break;
    case 'FUT':
      colors = 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400';
      break;
    case 'FUERA':
      colors = 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      break;
    default:
      colors = 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
  }
  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${colors}`}>
      {text || type}
    </span>
  );
};

const Despacho = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Generación Total" value="67,840" unit="kW" trend={1} trendValue="+0.0%" subtext="vs programado" accent />
        <KPICard label="Fuente Principal (PEL)" value="81.2" unit="%" trend={0} trendValue="=" subtext="Participación" />
        <KPICard label="Costo Promedio" value="604.0" unit="COP/kWh" trend={-1} trendValue="↓2.1%" subtext="vs semana anterior" />
        <KPICard label="Plantas Activas" value="3" unit="/ 8" trend={0} trendValue="-" subtext="Fuentes despachando" />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-3">
            <span className="grid grid-cols-2 gap-[2px]">
              <div className="w-1.5 h-1.5 border border-current"></div>
              <div className="w-1.5 h-1.5 border border-current"></div>
              <div className="w-1.5 h-1.5 border border-current"></div>
              <div className="w-1.5 h-1.5 border border-current"></div>
            </span>
            Real vs Programado — Semana 06 · 2026
          </h3>
        </div>
        
        {/* Progress Bar Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="h-2.5 w-full rounded-full overflow-hidden flex mb-3">
            <div className="bg-[#C41230] h-full" style={{width: '81.2%'}}></div>
            <div className="bg-[#B56D24] h-full" style={{width: '17.6%'}}></div>
            <div className="bg-[#107C41] h-full" style={{width: '1.2%'}}></div>
          </div>
          <div className="flex gap-5 text-[12px] font-medium text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#C41230]"></span> PEL 81.2%</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#B56D24]"></span> Gas S.E. 17.6%</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#107C41]"></span> Gas Propio 1.2%</div>
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-2">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--secondary)]/50 border-b border-t border-[var(--border)]">
              <tr>
                <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">FUENTE</th>
                <th className="px-6 py-3.5 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">REAL (KW)</th>
                <th className="px-6 py-3.5 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">PROG.</th>
                <th className="px-6 py-3.5 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">DESV.</th>
                <th className="px-6 py-3.5 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">COP/KWH</th>
                <th className="px-6 py-3.5 text-center text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {[
                { fuente: 'PEL', real: '55,081', prog: '54,500', desv: '+1.0%', desvColor: 'text-emerald-500', cop: '627.5', estado: 'ACT' },
                { fuente: 'Gas - Sur Energy', real: '11,982', prog: '12,500', desv: '-4.1%', desvColor: 'text-red-500', cop: '580.4', estado: 'ACT' },
                { fuente: 'Gas Propio', real: '777', prog: '800', desv: '-2.8%', desvColor: 'text-red-500', cop: '240.1', estado: 'ACT' },
                { fuente: 'Gas - Aggreko', real: '0', prog: '—', desv: '—', desvColor: 'text-[var(--muted-foreground)]', cop: '—', estado: 'S/BY' },
                { fuente: 'Diesel', real: '0', prog: '—', desv: '—', desvColor: 'text-[var(--muted-foreground)]', cop: '—', estado: 'S/BY' },
                { fuente: 'Genersa', real: '—', prog: '—', desv: '—', desvColor: 'text-[var(--muted-foreground)]', cop: '—', estado: 'FUT' },
                { fuente: 'Biomasa', real: '—', prog: '—', desv: '—', desvColor: 'text-[var(--muted-foreground)]', cop: '—', estado: 'FUT' },
                { fuente: 'Solar', real: '0', prog: '0', desv: '—', desvColor: 'text-[var(--muted-foreground)]', cop: '—', estado: 'FUERA' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.fuente}</td>
                  <td className="px-6 py-4 text-right font-mono text-[var(--foreground)]">{row.real}</td>
                  <td className="px-6 py-4 text-right font-mono text-[var(--muted-foreground)]">{row.prog}</td>
                  <td className={`px-6 py-4 text-right font-mono font-medium ${row.desvColor}`}>{row.desv}</td>
                  <td className="px-6 py-4 text-right font-mono text-[var(--foreground)]">{row.cop}</td>
                  <td className="px-6 py-4 text-center"><Badge type={row.estado} /></td>
                </tr>
              ))}
              
              {/* TOTAL ROW */}
              <tr className="bg-[var(--secondary)]/40 font-bold border-t-2 border-[var(--border)]">
                <td className="px-6 py-4 text-[var(--foreground)]">TOTAL</td>
                <td className="px-6 py-4 text-right font-mono text-[var(--foreground)]">67,840</td>
                <td className="px-6 py-4 text-right font-mono text-[var(--foreground)]">67,800</td>
                <td className="px-6 py-4 text-right font-mono text-emerald-500">+0.0%</td>
                <td className="px-6 py-4 text-right font-mono text-[var(--foreground)]">604.0</td>
                <td className="px-6 py-4 text-center text-[var(--muted-foreground)] font-mono">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Despacho;

