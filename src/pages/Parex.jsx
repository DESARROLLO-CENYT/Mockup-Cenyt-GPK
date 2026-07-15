import React from 'react';
import KPICard from '../components/KPICard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { HelpCircle } from 'lucide-react';

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
  const palette = ['#963133', '#ae4247', '#cb5c62', '#dc7d82', '#efb2b6'];
  const getColor = (entry, index, total) => {
    if (entry.name.includes('Gas')) {
      return '#475569'; // Mantenemos gris oscuro para diferenciar Gas, o puedes cambiarlo. Asumo mantenerlo para mantener consistencia funcional.
    }
    // Asignar color de la paleta según índice (saltando el gas si es necesario para mantener 4 colores para PEL)
    return palette[index % palette.length];
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

  const dataCamposMenores = [
    { name: 'TILO', value: 0.886, color: '#963133', text: '#ffffff' },
    { name: 'CHIRICOCA', value: 0.522, color: '#ae4247', text: '#ffffff' },
    { name: 'MAX', value: 0.462, color: '#cb5c62', text: '#ffffff' },
    { name: 'JACAMAR', value: 0.266, color: '#dc7d82', text: '#ffffff' },
    { name: 'GUACO', value: 0.0, color: '#efb2b6', text: '#475569' },
  ];
  const maxCampoValue = 0.886;
  const totalMenoresMW = "2,136";

  const dataAggreko = [
    { name: 'Generado', value: 13.60, color: '#C41230' },
    { name: 'Disponible', value: 2.40, color: '#f3f4f6' }
  ];

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
          <div className="flex-1 relative">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)] mb-1 block">
                Distribución Demanda Parex
              </span>
              <div className="relative group">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                  Desglose porcentual de la demanda total de Parex entre Gas Natural y PEL.
                </div>
              </div>
            </div>
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
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Comportamiento Semanal Demanda Parex</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Distribución entre PEL Parex y GN Parex</p>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Histórico semanal del consumo de energía desglosado por fuente (Gas vs Interconectado).
              </div>
            </div>
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
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Distribución de Fuentes (Llanos 34)</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Generación por fuente (Total: 68.07 MW)</p>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                Aporte detallado en MW de cada una de las fuentes de generación disponibles en Llanos 34.
              </div>
            </div>
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

        {/* Gráfico 3: Campos Menores */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col h-full lg:col-span-1">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex justify-between items-start w-full sm:w-auto flex-1">
              <div>
                <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Campos Menores</h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Distribución de demanda por campo menor</p>
              </div>
              <div className="relative group sm:hidden">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                  Consumo energético individualizado para los campos menores de producción.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group hidden sm:block">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                  Consumo energético individualizado para los campos menores de producción.
                </div>
              </div>
              <div className="bg-[#991b1b] text-white px-5 py-3 rounded-lg shadow-md text-center flex flex-col items-center justify-center min-w-[160px]">
                <div className="text-[11px] font-bold tracking-widest uppercase opacity-90 mb-0.5">Total Menores</div>
                <div className="text-xl font-black">{totalMenoresMW} MW</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 items-center w-full py-4 overflow-x-auto">
            <div className="min-w-[400px] w-full max-w-2xl flex flex-col gap-3">
              {dataCamposMenores.map((campo) => {
                const isZero = campo.value === 0;
                const widthPercent = isZero ? 15 : (campo.value / maxCampoValue) * 80 + 10;
                
                return (
                  <div key={campo.name} className="flex items-center w-full group">
                    {/* Label */}
                    <div className="w-28 shrink-0 text-right pr-6 text-xs font-bold text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                      {campo.name}
                    </div>
                    {/* Bar Area */}
                    <div className="flex-1 flex justify-center py-1 border-x border-[var(--border)]/30 relative">
                      {/* Línea central sutil */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)]/30 -translate-x-1/2"></div>
                      <div 
                        className="py-2 px-4 flex items-center justify-center text-xs font-bold rounded shadow-sm hover:brightness-110 hover:shadow-md transition-all relative z-10"
                        style={{ 
                          width: `${widthPercent}%`, 
                          backgroundColor: campo.color,
                          color: campo.text,
                        }}
                      >
                        {campo.value.toFixed(3).replace('.', ',')} MW
                      </div>
                    </div>
                    {/* Spacer para simetría */}
                    <div className="w-28 shrink-0"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gráfico 4: Generación Gas Aggreko */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col h-full lg:col-span-1 justify-center items-center relative overflow-hidden">
          <div className="text-center mb-8 flex flex-col items-center relative w-full">
            <div className="absolute right-0 top-0">
              <div className="relative group">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                  Relación entre la capacidad generada y la disponible en la unidad Aggreko.
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider">GENERACIÓN GAS</h3>
            <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider">AGGREKO</h3>
          </div>
          
          <div className="relative w-full max-w-[280px] flex justify-center">
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataAggreko}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {dataAggreko.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Center Text */}
            <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center justify-end">
              <span className="text-xl font-medium text-[var(--muted-foreground)]">13,60 MW</span>
            </div>
            
            {/* Min / Max Labels */}
            <div className="absolute bottom-[-24px] left-2 text-sm font-bold text-[var(--muted-foreground)]">0,00 MW</div>
            <div className="absolute bottom-[-24px] right-2 text-sm font-bold text-[var(--muted-foreground)]">16,00 MW</div>
          </div>
          
          <div className="mt-12 mb-2">
            <span className="text-3xl font-black text-orange-500 tracking-tighter lowercase">aggreko</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Parex;
