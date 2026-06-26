import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { ExternalLink, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

// Data Tab 1
const dataUbicacion = [
  { mes: 'ENE', PEL: 1, RED: 2, GENERACION: 1, FACILIDADES: 1, CABRESTERO: 0 },
  { mes: 'FEB', PEL: 2, RED: 2, GENERACION: 1, FACILIDADES: 0, CABRESTERO: 0 },
  { mes: 'MAR', PEL: 3, RED: 0, GENERACION: 0, FACILIDADES: 1, CABRESTERO: 0 },
  { mes: 'ABR', PEL: 3, RED: 2, GENERACION: 1, FACILIDADES: 3, CABRESTERO: 0 },
  { mes: 'MAY', PEL: 1, RED: 3, GENERACION: 0, FACILIDADES: 0, CABRESTERO: 0 }
];

const dataUbicacionCausa = [
  { ubicacion: 'CABRESTERO', Descarga: 2, Disparo: 1, Investigacion: 2, Falla: 0, Fauna: 0, Error: 0, STN: 0 },
  { ubicacion: 'FACILIDADES', Descarga: 1, Disparo: 1, Investigacion: 0, Falla: 0, Fauna: 0, Error: 0, STN: 0 },
  { ubicacion: 'GENERACION', Descarga: 1, Disparo: 0, Investigacion: 0, Falla: 0, Fauna: 0, Error: 0, STN: 0 },
  { ubicacion: 'RED', Descarga: 1, Disparo: 1, Investigacion: 1, Falla: 8, Fauna: 0, Error: 0, STN: 0 },
  { ubicacion: 'PEL', Descarga: 6, Disparo: 0, Investigacion: 1, Falla: 0, Fauna: 0, Error: 0, STN: 0 }
];

const dataDiferidaFuente = [
  { name: 'RED', value: 15343 },
  { name: 'PEL', value: 10003 },
  { name: 'CABRESTERO', value: 5546 },
  { name: 'FACILIDADES', value: 2277 },
  { name: 'GENERACION', value: 522 }
];

const dataCausasPie = [
  { name: 'Falla Componente', value: 9 },
  { name: 'Descarga Atmosférica', value: 1 },
  { name: 'Fauna', value: 1 },
  { name: 'En Investigación', value: 1 }
];

const COLORS = ['#7D0A1E', '#9E0A20', '#C41230', '#DE2C3B', '#EE5E61', '#F7918E', '#FDBBB8', '#FFE0DF'];

// Data Tab 2
const dataEventosRed = [
  { mes: 'ENE', '2024': 2, '2025': 3, '2026': 2 },
  { mes: 'FEB', '2024': 1, '2025': 0, '2026': 2 },
  { mes: 'MAR', '2024': 9, '2025': 4, '2026': 3 },
  { mes: 'ABR', '2024': 6, '2025': 2, '2026': 0 },
  { mes: 'MAY', '2024': 2, '2025': 1, '2026': 2 },
  { mes: 'TOTAL', '2024': 20, '2025': 13, '2026': 12 },
];

const dataDiferidasEventos = [
  { mes: 'ENE', '2024': 1259, '2025': 1610, '2026': 838 },
  { mes: 'FEB', '2024': 2720, '2025': 0, '2026': 617 },
  { mes: 'MAR', '2024': 5230, '2025': 6828, '2026': 7176 },
  { mes: 'ABR', '2024': 3513, '2025': 8916, '2026': 1883 },
  { mes: 'MAY', '2024': 6661, '2025': 184, '2026': 4840 },
  { mes: 'TOTAL', '2024': 19383, '2025': 17537, '2026': 15354 },
];

const dataDiferidasCausa = [
  { causa: 'DESCARGA ATMOS.', '2024': 6333, '2025': 1859, '2026': 3000 },
  { causa: 'FALLA COMPONENTE', '2024': 13306, '2025': 1287, '2026': 2993 },
  { causa: 'FAUNA', '2024': 5282, '2025': 4117, '2026': 10065 },
  { causa: 'OPERATIVA', '2024': 710, '2025': 5801, '2026': 0 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--popover)] border border-[var(--border)] p-3 rounded-lg shadow-xl">
        <p className="font-bold text-[var(--foreground)] mb-2 text-xs uppercase tracking-wider">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[var(--muted-foreground)]">{entry.name}</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Fallas = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Cabecera con título y botón PowerBI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight flex items-center gap-2">
            <div className="w-2 h-6 bg-[#C41230] rounded-full"></div>
            Registro y Análisis de Fallas
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Sistema Llanos 34 - a mayo 2026
          </p>
        </div>
        
        <a 
          href="https://app.powerbi.com/view?r=eyJrIjoiODQ2ZDUzMzEtN2M4Yy00NWQ3LWI0NzAtZWIwMjk1ZjU1MGQ2IiwidCI6IjEwMDgwMjkwLTkyYTAtNGI2YS05NTUwLTI3Y2NjNzkyMGI1YiIsImMiOjR9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#C41230] hover:bg-[#a00f25] text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          Ver en PowerBI
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'general'
              ? 'border-[#C41230] text-[#C41230] dark:text-red-400 dark:border-red-400'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
          }`}
        >
          Análisis General
        </button>
        <button
          onClick={() => setActiveTab('comparativo')}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'comparativo'
              ? 'border-[#C41230] text-[#C41230] dark:text-red-400 dark:border-red-400'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
          }`}
        >
          Análisis Comparativo Red
        </button>
      </div>

      {/* CONTENIDO TAB 1: Análisis General */}
      {activeTab === 'general' && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard label="Eventos Totales (May/2026)" value="5 / 35" unit="Eventos" subtext="Acumulado" />
            <KPICard label="Diferida Abril" value="4,921" unit="Bbls" subtext="10 PEL, 81 G, 4829 Red" accent />
            <KPICard label="Diferida Acumulada 2026" value="33,834" unit="Bbls" subtext="Total sistema" />
            <KPICard label="Impacto Promedio 2026" value="967" unit="Bbls/evento" subtext="KPI Derivado" />
          </div>

          {/* Grillas de gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Clasificación por Ubicación */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Clasificación por Ubicación 2026</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataUbicacion} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                    <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="PEL" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="RED" fill={COLORS[1]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="GENERACION" fill={COLORS[2]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="FACILIDADES" fill={COLORS[3]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="CABRESTERO" fill={COLORS[4]} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Clasificación por Ubicación vs Causa */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Ubicación vs Causa</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataUbicacionCausa} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128,128,128,0.15)" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <YAxis dataKey="ubicacion" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="Descarga" stackId="a" fill={COLORS[0]} />
                    <Bar dataKey="Disparo" stackId="a" fill={COLORS[1]} />
                    <Bar dataKey="Investigacion" stackId="a" fill={COLORS[2]} />
                    <Bar dataKey="Falla" stackId="a" fill={COLORS[3]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Diferida Anual por Fuente */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Diferida Anual (BO) por Fuente Acumulada 2026</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataDiferidaFuente} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" fill="#C41230" radius={[4, 4, 0, 0]} maxBarSize={50}>
                      {dataDiferidaFuente.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribución por Causa */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Distribución por Causa - Eventos RED 2026</h3>
              <div className="h-[250px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataCausasPie}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {dataCausasPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} Eventos`]} 
                      contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CONTENIDO TAB 2: Análisis Comparativo Red */}
      {activeTab === 'comparativo' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
          
          {/* Panel Izquierdo */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <KPICard label="Diferida Acumulada RED - 2026" value="15,354" unit="Bbls" trend={-1} trendValue="↓ 12% vs 2025" accent />
            <KPICard label="# Eventos Acumulados RED - 2026" value="9" unit="Eventos" trend={-1} trendValue="↓ 8% vs 2025" />
            
            {/* Tabla Resumen */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex-1">
              <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--background)]">
                <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Causas</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-xs">
                  <thead className="bg-[var(--secondary)]/30 border-b border-[var(--border)]">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-[var(--muted-foreground)]">Causa</th>
                      <th className="px-2 py-2 text-center font-semibold text-[var(--muted-foreground)]">2025</th>
                      <th className="px-2 py-2 text-center font-semibold text-[var(--muted-foreground)]">2026</th>
                      <th className="px-4 py-2 text-center font-semibold text-[var(--muted-foreground)]">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { causa: 'Descarga Atm.', y25: 2, y26: 1, trend: '↓', color: 'text-emerald-500' },
                      { causa: 'Falla Compon.', y25: 1, y26: 1, trend: '=', color: 'text-gray-500' },
                      { causa: 'Fauna', y25: 6, y26: 6, trend: '=', color: 'text-gray-500' },
                      { causa: 'Operativa', y25: 3, y26: 0, trend: '↓', color: 'text-emerald-500' },
                      { causa: 'Desconocida', y25: 0, y26: 1, trend: '↑', color: 'text-red-500' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)]/50 last:border-0 hover:bg-[var(--secondary)]/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-[var(--foreground)]">{row.causa}</td>
                        <td className="px-2 py-3 text-center text-[var(--muted-foreground)]">{row.y25}</td>
                        <td className="px-2 py-3 text-center text-[var(--foreground)] font-bold">{row.y26}</td>
                        <td className={`px-4 py-3 text-center font-bold text-lg ${row.color}`}>{row.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Gráficos Centrales y Derechos */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eventos RED */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
                <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Eventos RED</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataEventosRed} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="2024" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="2025" fill={COLORS[1]} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="2026" fill={COLORS[2]} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Diferidas por Eventos RED */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
                <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Diferidas por Eventos RED</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataDiferidasEventos} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} width={50} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="2024" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="2025" fill={COLORS[1]} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="2026" fill={COLORS[2]} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Diferidas por Causa - Eventos RED */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-6">Diferidas por Causa - Eventos RED</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataDiferidasCausa} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                    <XAxis dataKey="causa" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="2024" fill={COLORS[0]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="2025" fill={COLORS[1]} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="2026" fill={COLORS[2]} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Fallas;
