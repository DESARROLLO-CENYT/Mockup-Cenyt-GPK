import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const dataMensual = [
  { mes: 'Ene', real: 88, meta: 90 },
  { mes: 'Feb', real: 89, meta: 90 },
  { mes: 'Mar', real: 91, meta: 90 },
  { mes: 'Abr', real: 90, meta: 90 },
  { mes: 'May', real: 92, meta: 90 },
  { mes: 'Jun', real: 91.4, meta: 90 },
];

const dataCampos = [
  { campo: 'Llanos 34', valor: 91.4 },
  { campo: 'CPO-5', valor: 86.2 },
  { campo: 'Putumayo', valor: 78.5 },
  { campo: 'Tigana', valor: 93.1 },
];

const Eficiencia = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Eficiencia Global" value="91.4" unit="%" trend={1} trendValue="↑2.3%" subtext="vs. mes anterior" accent />
        <KPICard label="Pozos Activos" value="142" unit="" trend={0} trendValue="=" subtext="Total operando" />
        <KPICard label="Tiempo Inactivo" value="4.2" unit="hrs" trend={-1} trendValue="↓1.5%" subtext="Promedio por pozo" />
        <KPICard label="Consumo Energía" value="45.2" unit="MWh" trend={-1} trendValue="↓3%" subtext="Reducción neta" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Eficiencia mensual real vs. meta</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Últimos 6 meses</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataMensual}>
                <defs>
                  <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C41230" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C41230" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} dx={-10} domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}
                />
                <Area type="monotone" dataKey="meta" stroke="#4A9EE0" strokeWidth={1.5} strokeDasharray="4 3" fill="none" />
                <Area type="monotone" dataKey="real" stroke="#C41230" strokeWidth={2} fill="url(#gradReal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Eficiencia por campo</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Top 4 activos</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCampos} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} domain={[0, 100]} />
                <YAxis dataKey="campo" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }} cursor={{fill: 'rgba(128,128,128,0.1)'}} />
                <Bar dataKey="valor" fill="#C41230" radius={[0, 2, 2, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Estado de Operaciones por Campo</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Campo</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Eficiencia</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Pozos</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Objetivo</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { campo: 'Llanos 34', ef: '91.4%', pozos: 42, obj: '90%', estado: 'Operativo' },
                { campo: 'CPO-5', ef: '86.2%', pozos: 28, obj: '88%', estado: 'Atención' },
                { campo: 'Putumayo', ef: '78.5%', pozos: 15, obj: '82%', estado: 'Crítico' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-left">{row.campo}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{row.ef}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-[var(--muted-foreground)]">{row.pozos}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-[var(--muted-foreground)]">{row.obj}</td>
                  <td className="px-5 py-3.5 text-left"><StatusBadge status={row.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Eficiencia;
