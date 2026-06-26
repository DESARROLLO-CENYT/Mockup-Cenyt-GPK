import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const dataSemanal = {
  'Bbls diferidos': [
    { name: 'S1', value: 120 }, { name: 'S2', value: 340 }, { name: 'S3', value: 150 }, { name: 'S4', value: 90 },
    { name: 'S5', value: 450 }, { name: 'S6', value: 110 }, { name: 'S7', value: 500 }, { name: 'S8', value: 320 }
  ],
  'MTBF': [
    { name: 'S1', value: 110 }, { name: 'S2', value: 115 }, { name: 'S3', value: 120 }, { name: 'S4', value: 105 },
    { name: 'S5', value: 95 }, { name: 'S6', value: 118 }, { name: 'S7', value: 125 }, { name: 'S8', value: 130 }
  ],
  'MTTR': [
    { name: 'S1', value: 4.5 }, { name: 'S2', value: 4.2 }, { name: 'S3', value: 5.1 }, { name: 'S4', value: 3.8 },
    { name: 'S5', value: 6.0 }, { name: 'S6', value: 4.1 }, { name: 'S7', value: 3.5 }, { name: 'S8', value: 3.9 }
  ],
  'SAIFI': [
    { name: 'S1', value: 2.0 }, { name: 'S2', value: 2.4 }, { name: 'S3', value: 2.1 }, { name: 'S4', value: 2.1 },
    { name: 'S5', value: 2.5 }, { name: 'S6', value: 2.1 }, { name: 'S7', value: 2.6 }, { name: 'S8', value: 2.4 }
  ],
  'Disponibilidad': [
    { name: 'S1', value: 98.5 }, { name: 'S2', value: 97.2 }, { name: 'S3', value: 99.1 }, { name: 'S4', value: 98.8 },
    { name: 'S5', value: 96.5 }, { name: 'S6', value: 99.4 }, { name: 'S7', value: 95.8 }, { name: 'S8', value: 97.9 }
  ],
  'Eventos': [
    { name: 'S1', value: 2 }, { name: 'S2', value: 5 }, { name: 'S3', value: 1 }, { name: 'S4', value: 0 },
    { name: 'S5', value: 6 }, { name: 'S6', value: 1 }, { name: 'S7', value: 8 }, { name: 'S8', value: 4 }
  ]
};

const dataMensual = {
  'Bbls diferidos': [
    { name: 'Ene', value: 800 }, { name: 'Feb', value: 1200 }, { name: 'Mar', value: 600 }, { name: 'Abr', value: 400 },
    { name: 'May', value: 1500 }, { name: 'Jun', value: 700 }
  ],
  'MTBF': [
    { name: 'Ene', value: 100 }, { name: 'Feb', value: 90 }, { name: 'Mar', value: 110 }, { name: 'Abr', value: 120 },
    { name: 'May', value: 85 }, { name: 'Jun', value: 115 }
  ],
  'MTTR': [
    { name: 'Ene', value: 5.0 }, { name: 'Feb', value: 5.5 }, { name: 'Mar', value: 4.2 }, { name: 'Abr', value: 3.8 },
    { name: 'May', value: 6.2 }, { name: 'Jun', value: 4.0 }
  ],
  'SAIFI': [
    { name: 'Ene', value: 8.5 }, { name: 'Feb', value: 10.2 }, { name: 'Mar', value: 7.1 }, { name: 'Abr', value: 6.5 },
    { name: 'May', value: 12.4 }, { name: 'Jun', value: 8.0 }
  ],
  'Disponibilidad': [
    { name: 'Ene', value: 97.5 }, { name: 'Feb', value: 96.2 }, { name: 'Mar', value: 98.4 }, { name: 'Abr', value: 99.0 },
    { name: 'May', value: 95.5 }, { name: 'Jun', value: 98.1 }
  ],
  'Eventos': [
    { name: 'Ene', value: 15 }, { name: 'Feb', value: 22 }, { name: 'Mar', value: 10 }, { name: 'Abr', value: 8 },
    { name: 'May', value: 28 }, { name: 'Jun', value: 12 }
  ]
};

const Confiabilidad = () => {
  const [indicator, setIndicator] = useState('SAIFI');
  const [period, setPeriod] = useState('SEMANAL');

  const currentData = period === 'SEMANAL' ? dataSemanal[indicator] : dataMensual[indicator];

  // Helper para mostrar sufijos o prefijos en el tooltip dependiendo del indicador
  const formatTooltip = (value) => {
    switch (indicator) {
      case 'Disponibilidad': return `${value}%`;
      case 'MTBF':
      case 'MTTR': return `${value} hrs`;
      default: return value;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* KPIs Actualizados */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Bbls Diferidos" value="1,250" unit="Bbls" trend={-1} trendValue="↓5%" subtext="Impacto en producción" accent />
        <KPICard label="Pozos Afectados" value="12" unit="Pozos" trend={-1} trendValue="↓2" subtext="Requieren intervención" />
        <KPICard label="Disponibilidad Pozos" value="98.5" unit="%" trend={1} trendValue="↑0.2%" subtext="Promedio general" />
        <KPICard label="MTBF Promedio" value="117.5" unit="hrs" trend={1} trendValue="↑12%" subtext="Tiempo medio entre fallas" />
      </div>

      {/* Gráfico Dinámico Principal */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-[var(--border)] flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-[var(--muted-foreground)]" />
            <h3 className="text-[13px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
              TENDENCIA — {indicator} (EV)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={indicator}
              onChange={(e) => setIndicator(e.target.value)}
              className="bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-[12px] font-medium rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            >
              <option value="Bbls diferidos">Bbls diferidos</option>
              <option value="MTBF">MTBF</option>
              <option value="MTTR">MTTR</option>
              <option value="SAIFI">SAIFI</option>
              <option value="Disponibilidad">Disponibilidad</option>
              <option value="Eventos">Eventos</option>
            </select>
            <button
              onClick={() => setPeriod(period === 'SEMANAL' ? 'MENSUAL' : 'SEMANAL')}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors ${
                period === 'SEMANAL'
                  ? 'bg-red-100 text-[#C41230] dark:bg-red-500/20 dark:text-red-400'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
              }`}
            >
              {period}
            </button>
          </div>
        </div>
        <div className="h-[300px] p-5 pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={indicator === 'Disponibilidad' ? [90, 100] : ['auto', 'auto']} />
              <Tooltip 
                formatter={(value) => [formatTooltip(value), indicator]}
                contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} 
              />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2.5} fill="url(#colorDynamic)" activeDot={{ r: 6, fill: "#2563EB" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de Pozos */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-[13px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
            Estado de Pozos
          </h3>
          <span className="text-[12px] bg-red-400/10 text-red-400 px-3 py-1 rounded-full font-bold">12 Pozos afectados</span>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead className="border-b border-[var(--border)] bg-[var(--background)]">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Pozo</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Sistema de Levantamiento</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Disponibilidad</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Diferida (Bbls)</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { pozo: 'LL-34', tipo: 'ESP (Electrosumergible)', up: '99.8%', diferida: '0', estado: 'Operativo' },
                { pozo: 'LL-45', tipo: 'PCP (Cavidades Progresivas)', up: '82.4%', diferida: '340', estado: 'Atención' },
                { pozo: 'LL-12', tipo: 'ESP (Electrosumergible)', up: '65.0%', diferida: '850', estado: 'Crítico' },
                { pozo: 'LL-08', tipo: 'Mecánico', up: '91.2%', diferida: '60', estado: 'Operativo' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-left text-[var(--foreground)]">{row.pozo}</td>
                  <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.tipo}</td>
                  <td className="px-5 py-3.5 text-right font-medium text-[var(--foreground)]">{row.up}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#C41230] dark:text-red-400">{row.diferida}</td>
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
