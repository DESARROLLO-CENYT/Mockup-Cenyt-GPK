import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataUptime = [
  { mes: 'Jul', uptime: 98.5 },
  { mes: 'Ago', uptime: 99.1 },
  { mes: 'Sep', uptime: 97.4 },
  { mes: 'Oct', uptime: 98.2 },
];

const dataMantenimiento = [
  { mes: 'Jul', mtbf: 120, mttr: 4.5 },
  { mes: 'Ago', mtbf: 145, mttr: 4.2 },
  { mes: 'Sep', mtbf: 95, mttr: 5.1 },
  { mes: 'Oct', mtbf: 110, mttr: 4.8 },
];

const Confiabilidad = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Uptime Global" value="97.8" unit="%" trend={1} trendValue="↑0.4%" subtext="Promedio mensual" accent />
        <KPICard label="MTBF" value="117.5" unit="hrs" trend={1} trendValue="↑12%" subtext="Tiempo medio entre fallas" />
        <KPICard label="MTTR" value="4.6" unit="hrs" trend={-1} trendValue="↓0.2%" subtext="Tiempo medio reparación" />
        <KPICard label="Equipos Críticos" value="3" unit="" trend={-1} trendValue="⚠" subtext="Requieren atención" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Uptime mensual</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Porcentaje de disponibilidad</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataUptime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A9E70" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1A9E70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={[90, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
                <Area type="monotone" dataKey="uptime" stroke="#1A9E70" strokeWidth={2} fill="url(#gradUptime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">MTBF vs MTTR</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Horas promedio</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMantenimiento} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={10} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} cursor={{fill: 'rgba(128,128,128,0.1)'}} />
                <Bar yAxisId="left" dataKey="mtbf" fill="#4A9EE0" radius={[3, 3, 0, 0]} name="MTBF" />
                <Bar yAxisId="right" dataKey="mttr" fill="#E8A838" radius={[3, 3, 0, 0]} name="MTTR" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Estado de Equipos</h3>
          <span className="text-[12px] bg-red-400/10 text-red-400 px-2 py-0.5 rounded-full font-medium">3 Alertas activas</span>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Equipo</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Tipo</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Uptime</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Alertas</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { eq: 'Turbina A1', tipo: 'Generación', up: '99.8%', alerta: 'Ninguna', estado: 'Operativo' },
                { eq: 'Bomba C2', tipo: 'Inyección', up: '92.4%', alerta: 'Vibración alta', estado: 'Atención' },
                { eq: 'Compresor B', tipo: 'Gas', up: '85.0%', alerta: 'Falla presión', estado: 'Crítico' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-left">{row.eq}</td>
                  <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.tipo}</td>
                  <td className="px-5 py-3.5 text-right">{row.up}</td>
                  <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.alerta}</td>
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

export default Confiabilidad;
