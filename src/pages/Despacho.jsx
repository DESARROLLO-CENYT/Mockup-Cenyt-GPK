import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataSemanal = [
  { dia: 'Lun', prog: 45000, real: 46200 },
  { dia: 'Mar', prog: 48000, real: 47500 },
  { dia: 'Mié', prog: 50000, real: 51200 },
  { dia: 'Jue', prog: 49000, real: 48800 },
  { dia: 'Vie', prog: 52000, real: 50412 },
];

const dataMensual = [
  { mes: 'Jul', real: 1.2 },
  { mes: 'Ago', real: 1.4 },
  { mes: 'Sep', real: 1.35 },
  { mes: 'Oct', real: 1.5 },
];

const Despacho = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Despacho Hoy" value="50,412" unit="bbl" trend={1} trendValue="↑1.2%" subtext="vs. programado" accent />
        <KPICard label="En Tránsito" value="12,500" unit="bbl" trend={0} trendValue="=" subtext="5 convoyes activos" />
        <KPICard label="Cumplimiento" value="98.2" unit="%" trend={1} trendValue="↑0.5%" subtext="Mensual acumulado" />
        <KPICard label="Alertas Logística" value="2" unit="" trend={-1} trendValue="⚠" subtext="Retraso en ruta 3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Despacho semanal prog. vs. real</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Volumen en bbl</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSemanal} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }} cursor={{fill: 'rgba(128,128,128,0.1)'}} />
                <Bar dataKey="prog" fill="rgba(74,158,224,0.25)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="real" fill="#C41230" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Tendencia mensual</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Millones bbl</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataMensual} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C41230" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C41230" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dx={-10} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }} />
                <Area type="monotone" dataKey="real" stroke="#C41230" strokeWidth={2} fill="url(#gradTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Logística de Despacho</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Destino</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Volumen</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Estado</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Hora</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Variación</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dest: 'Refinería A', vol: '12,000', estado: 'Completado', hora: '08:30 AM', var: '+200', varColor: 'text-emerald-400' },
                { dest: 'Puerto Marítimo', vol: '25,412', estado: 'En tránsito', hora: '14:15 PM', var: '—', varColor: 'text-[var(--muted-foreground)]' },
                { dest: 'Planta C', vol: '13,000', estado: 'Programado', hora: '18:00 PM', var: '-150', varColor: 'text-red-400' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-left">{row.dest}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.vol}</td>
                  <td className="px-5 py-3.5 text-left"><StatusBadge status={row.estado} /></td>
                  <td className="px-5 py-3.5 text-right font-mono text-[var(--muted-foreground)]">{row.hora}</td>
                  <td className={`px-5 py-3.5 text-right font-mono ${row.varColor}`}>{row.var}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Despacho;
