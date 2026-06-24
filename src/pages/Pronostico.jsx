import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataPronostico = [
  { dia: '10', real: 51000, forecast: 51200 },
  { dia: '11', real: 51500, forecast: 51800 },
  { dia: '12', real: 52300, forecast: 52000 },
  { dia: '13', real: 52100, forecast: 52500 },
  { dia: '14', real: null, forecast: 52800 },
  { dia: '15', real: null, forecast: 53100 },
  { dia: '16', real: null, forecast: 53500 },
];

const Pronostico = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Demanda Actual" value="52,300" unit="bbl/d" trend={1} trendValue="↑1.8%" subtext="Promedio móvil 7d" accent />
        <KPICard label="Pronóstico 7d" value="53,500" unit="bbl/d" trend={1} trendValue="↑2.2%" subtext="Proyección ML" />
        <KPICard label="Precisión" value="94.5" unit="%" trend={0} trendValue="=" subtext="Margen de error 5.5%" />
        <KPICard label="Contratos Act." value="24" unit="" trend={1} trendValue="↑2" subtext="Renovaciones este mes" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Demanda real vs. forecast</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Volumen diario bbl/d</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPronostico} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
                <Line type="monotone" dataKey="real" stroke="#C41230" strokeWidth={2} dot={{ r: 4, fill: "#C41230" }} />
                <Line type="monotone" dataKey="forecast" stroke="#4A9EE0" strokeWidth={1.5} strokeDasharray="5 3" dot={{ r: 3 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Distribución por Mercado</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-6">Demanda agregada por segmento</p>
          
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { label: 'Mercado Interno', pct: 45, color: '#C41230', val: '23,535' },
              { label: 'Exportación', pct: 35, color: '#4A9EE0', val: '18,305' },
              { label: 'Industrial', pct: 20, color: '#E8A838', val: '10,460' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[12px] font-medium text-[var(--foreground)]">{item.label}</span>
                  <span className="text-[12px] text-[var(--muted-foreground)]">{item.val} bbl</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
                  <div style={{ width: `${item.pct}%`, backgroundColor: item.color }} className="h-full rounded-full transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Contratos y Clientes Principales</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Cliente</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Contrato</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Volumen</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Cumplimiento</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cliente: 'Refinería Nacional', contrato: 'CT-2024-A', vol: '15,000', cump: '100%', estado: 'Operativo' },
                { cliente: 'Exportadora Global', contrato: 'CT-2024-B', vol: '12,500', cump: '95%', estado: 'Atención' },
                { cliente: 'Industrias Sur', contrato: 'CT-2024-C', vol: '8,000', cump: '82%', estado: 'Crítico' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-left">{row.cliente}</td>
                  <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.contrato}</td>
                  <td className="px-5 py-3.5 text-right">{row.vol}</td>
                  <td className="px-5 py-3.5 text-right text-[var(--muted-foreground)]">{row.cump}</td>
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

export default Pronostico;
