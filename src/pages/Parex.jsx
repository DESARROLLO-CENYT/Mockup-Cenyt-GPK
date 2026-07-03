import React from 'react';
import KPICard from '../components/KPICard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const Parex = () => {
  // --- MOCK DATA ---
  const dataSemanal = Array.from({length: 16}, (_, i) => ({
    week: `Sem ${i+1}`,
    'PEL Parex': Number((3 + (Math.random() - 0.5) * 0.5).toFixed(2)),
    'GN Parex': Number((13.6 + (Math.random() - 0.5) * 1).toFixed(2))
  }));

  const dataFuentes = [
    { name: 'PEL JAC 1', value: 14.22 },
    { name: 'PEL JAC 2', value: 18.27 },
    { name: 'PEL TIG 1', value: 9.30 },
    { name: 'PEL TIG 2', value: 9.28 },
    { name: 'Gas Tigana', value: 17.00 },
  ].sort((a, b) => b.value - a.value);

  // Colores para la gráfica de fuentes
  const getColor = (entry, index, total) => {
    if (entry.name.includes('Gas')) {
      return '#475569'; // Slate/gris oscuro para diferenciar Gas
    }
    const minLightness = 25; // Oscuro
    const maxLightness = 75; // Claro
    const lightness = minLightness + (index / Math.max(1, total - 1)) * (maxLightness - minLightness);
    return `hsl(350, 85%, ${lightness}%)`; // Rojo Geopark para PEL
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--popover)] border border-[var(--border)] p-3 rounded-lg shadow-xl">
          <p className="font-bold text-[var(--foreground)] mb-2 text-xs uppercase tracking-wider">{label}</p>
          <div className="flex flex-col gap-1.5">
            {payload.map((entry, index) => (
              <span key={index} className="font-semibold text-xs" style={{ color: entry.color }}>
                {entry.name}: {entry.value} MW
              </span>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Cabecera */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight flex items-center gap-2">
          <div className="w-2 h-6 rounded-full transition-colors bg-[#C41230]"></div>
          Seguimiento Cliente Parex
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Control de demanda total Llanos 34 y distribución de consumo Parex
        </p>
      </div>

      {/* Fila superior de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Demanda Llanos 34" value="72.0" unit="MW" subtext="Total Campo" />
        <KPICard label="Demanda Total Parex" value="17.0" unit="MW" subtext="Estimado ~16.6 MW" />
        {/* Gráfico de Anillo: Distribución Demanda Parex */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex items-center lg:col-span-2">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)] mb-1 block">
              Distribución Demanda Parex
            </span>
            <div className="flex flex-col mt-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#16a34a]"></div>
                <div className="text-sm font-semibold text-[var(--foreground)]">GN Parex: <span className="font-normal text-[var(--muted-foreground)]">13.6 MW</span></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                <div className="text-sm font-semibold text-[var(--foreground)]">PEL Parex: <span className="font-normal text-[var(--muted-foreground)]">3.0 MW</span></div>
              </div>
            </div>
          </div>
          <div className="w-[100px] h-[100px] relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'GN Parex', value: 13.6, color: '#16a34a' },
                    { name: 'PEL Parex', value: 3.0, color: '#eab308' }
                  ]}
                  cx="50%" cy="50%"
                  innerRadius={25} outerRadius={40}
                  dataKey="value" stroke="none"
                  labelLine={false}
                  label={({ percent, cx, cy, midAngle, outerRadius }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 12;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="var(--foreground)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {[
                    { name: 'GN Parex', value: 13.6, color: '#16a34a' },
                    { name: 'PEL Parex', value: 3.0, color: '#eab308' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico 1: Comportamiento Semanal Parex */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Comportamiento Semanal Demanda Parex</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Distribución entre PEL Parex y GN Parex</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSemanal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGN" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C41230" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C41230" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPEL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val} MW`} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="GN Parex" stackId="1" stroke="#C41230" strokeWidth={2} fill="url(#colorGN)" />
                <Area type="monotone" dataKey="PEL Parex" stackId="1" stroke="#475569" strokeWidth={2} fill="url(#colorPEL)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Distribución de Fuentes */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Distribución de Fuentes (Llanos 34)</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Generación por fuente (Total: 68.07 MW)</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataFuentes} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis type="number" domain={[0, 20]} tickFormatter={(val) => `${val}MW`} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--foreground)', fontWeight: 500 }} width={100} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Generación" barSize={20} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'var(--foreground)', fontSize: 11, formatter: (v) => `${v} MW` }}>
                  {dataFuentes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry, index, dataFuentes.length)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Parex;
