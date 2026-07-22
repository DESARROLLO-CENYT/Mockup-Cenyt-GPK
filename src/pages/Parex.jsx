import React from 'react';
import KPICard from '../components/KPICard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { HelpCircle, Activity, BarChart2, List, PieChart as PieChartIcon } from 'lucide-react';

const Parex = () => {
  // --- MOCK DATA ---
  const dataSemanal = Array.from({length: 16}, (_, i) => {
    let mes = '';
    if (i === 0) mes = 'abril';
    else if (i === 4) mes = 'mayo';
    else if (i === 8) mes = 'junio';
    else if (i === 12) mes = 'julio';

    return {
      week: `${i+1}`,
      mes,
      'PEL Parex': Number((3 + (Math.random() - 0.5) * 0.5).toFixed(2)),
      'GN Parex': Number((13.6 + (Math.random() - 0.5) * 1).toFixed(2))
    };
  });

  const dataFuentes = [
    { name: 'PEL JAC 1', value: 14.22 },
    { name: 'PEL JAC 2', value: 18.27 },
    { name: 'PEL TIG 1', value: 9.30 },
    { name: 'PEL TIG 2', value: 9.28 },
    { name: 'Gas Tigana', value: 17.00 },
  ].sort((a, b) => b.value - a.value);

  // Colores para la gráfica de fuentes
  const palette = ['#0E1A2B', '#1B3454', '#274472', '#5C7AA3', '#A4B7D7'];
  const getColor = (entry, index, total) => {
    if (entry.name.includes('Gas')) {
      return '#475569'; // Mantenemos gris oscuro para diferenciar Gas, o puedes cambiarlo. Asumo mantenerlo para mantener consistencia funcional.
    }
    // Asignar color de la paleta según índice (saltando el gas si es necesario para mantener 4 colores para PEL)
    return palette[index % palette.length];
  };

  const CustomXAxisTick = ({ x, y, payload, index, data }) => {
    const getVirtualMonth = (idx) => {
      for (let i = idx; i >= 0; i--) {
        if (data[i].mes) return data[i].mes;
      }
      return '';
    };
  
    const currentMonth = getVirtualMonth(index);
    const prevMonth = index > 0 ? getVirtualMonth(index - 1) : null;
    const isFirstOfMonth = !prevMonth || prevMonth !== currentMonth;
  
    let monthStartIndex = index;
    while (monthStartIndex > 0 && getVirtualMonth(monthStartIndex - 1) === currentMonth) {
      monthStartIndex--;
    }
    
    let monthEndIndex = index;
    while (monthEndIndex < data.length - 1 && getVirtualMonth(monthEndIndex + 1) === currentMonth) {
      monthEndIndex++;
    }
    
    const isMiddleOfMonth = index === Math.floor((monthStartIndex + monthEndIndex) / 2);
  
    return (
      <g transform={`translate(${x},${y})`}>
        {isFirstOfMonth && index !== 0 && (
          <line x1={-20} y1={0} x2={-20} y2={30} stroke="var(--border)" strokeDasharray="2 2" />
        )}
        <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11}>
          {data[index].week}
        </text>
        {isMiddleOfMonth && (
          <text x={0} y={0} dy={26} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11} className="capitalize">
            {currentMonth}
          </text>
        )}
      </g>
    );
  };

  const CustomBarLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (value === undefined || value === null) return null;
    const text = `${value.toFixed(1).replace('.', ',')} MW`;
    // estimate text width
    const rectWidth = text.length * 6.5 + 16;
    const rectHeight = 22;
    
    return (
      <g>
        <rect x={x + width + 8} y={y + height / 2 - rectHeight / 2} width={rectWidth} height={rectHeight} rx={6} fill="var(--card)" stroke="var(--border)" strokeWidth={1} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }} />
        <text x={x + width + 8 + rectWidth / 2} y={y + height / 2} fill="var(--foreground)" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
          {text}
        </text>
      </g>
    );
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
    { name: 'TILO', value: 0.886, color: '#0E1A2B', text: '#ffffff' },
    { name: 'CHIRICOCA', value: 0.522, color: '#1B3454', text: '#ffffff' },
    { name: 'MAX', value: 0.462, color: '#274472', text: '#ffffff' },
    { name: 'JACAMAR', value: 0.266, color: '#5C7AA3', text: '#ffffff' },
    { name: 'GUACO', value: 0.0, color: '#A4B7D7', text: '#475569' },
  ];
  const maxCampoValue = 0.886;
  const totalMenoresMW = "2,136";

  const dataAggreko = [
    { name: 'Generado', value: 13.60, color: '#1B3454' },
    { name: 'Disponible', value: 2.40, color: '#f3f4f6' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Cabecera */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight flex items-center gap-2">
          <div className="w-2 h-6 rounded-full transition-colors bg-[#1B3454]"></div>
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
            <div className="flex justify-between items-start border-b border-[var(--border)] pb-2 mb-3">
              <h3 className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-1.5">
                <PieChartIcon size={12} /> Distribución Demanda Parex
              </h3>
              <div className="relative group">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                  Desglose porcentual de la demanda total de Parex entre Gas Natural y PEL.
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1B3454]"></div>
                <div className="text-sm font-semibold text-[var(--foreground)]">GN Parex: <span className="font-normal text-[var(--muted-foreground)]">13.6 MW</span></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5C7AA3]"></div>
                <div className="text-sm font-semibold text-[var(--foreground)]">PEL Parex: <span className="font-normal text-[var(--muted-foreground)]">3.0 MW</span></div>
              </div>
            </div>
          </div>
                    <div className="w-[140px] h-[100px] relative shrink-0">
            <ResponsiveContainer width="100%" height="100%" className="overflow-visible">
              <PieChart>
                <Pie
                  data={[
                    { name: 'GN Parex', value: 13.6, color: '#1B3454' },
                    { name: 'PEL Parex', value: 3.0, color: '#5C7AA3' }
                  ]}
                  cx="50%" cy="50%"
                  innerRadius={25} outerRadius={40}
                  dataKey="value" stroke="none"
                  labelLine={false}
                  label={({ percent, cx, cy, midAngle, outerRadius }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 18;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const text = `${(percent * 100).toFixed(1)}%`;
                    const rectWidth = 36;
                    const rectHeight = 20;
                    const adjustedX = x > cx ? x + 5 : x - 5;
                    return (
                      <g>
                        <rect x={adjustedX - rectWidth / 2} y={y - rectHeight / 2} width={rectWidth} height={rectHeight} rx={4} fill="var(--card)" stroke="var(--border)" strokeWidth={1} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }} />
                        <text x={adjustedX} y={y} fill="var(--foreground)" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="bold">
                          {text}
                        </text>
                      </g>
                    );
                  }}
                >
                  <Cell fill="#1B3454" />
                  <Cell fill="#5C7AA3" />
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
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col h-full overflow-hidden relative">
          <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} /> Comportamiento Semanal Demanda Parex
              </h3>
              <p className="text-[12px] text-[var(--muted-foreground)]">Distribución entre PEL Parex y GN Parex</p>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Histórico semanal del consumo de energía desglosado por fuente (Gas vs Interconectado).
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full p-5 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSemanal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGN" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3454" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1B3454" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPEL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={(props) => <CustomXAxisTick {...props} data={dataSemanal} />} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val} MW`} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '25px' }} formatter={(value) => <span style={{ color: 'black', fontWeight: 500 }}>{value}</span>} />
                <Area type="monotone" dataKey="GN Parex" stackId="1" stroke="#1B3454" strokeWidth={2} fill="url(#colorGN)" />
                <Area type="monotone" dataKey="PEL Parex" stackId="1" stroke="#475569" strokeWidth={2} fill="url(#colorPEL)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Distribución de Fuentes */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col h-full overflow-hidden relative">
          <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                <BarChart2 size={14} /> Distribución de Fuentes (Llanos 34)
              </h3>
              <p className="text-[12px] text-[var(--muted-foreground)]">Generación por fuente (Total: 68.07 MW)</p>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                Aporte detallado en MW de cada una de las fuentes de generación disponibles en Llanos 34.
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full p-5 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataFuentes} layout="vertical" margin={{ top: 0, right: 60, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis type="number" domain={[0, 20]} tickFormatter={(val) => `${val} MW`} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--foreground)', fontWeight: 500 }} width={100} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Generación" barSize={20} radius={[0, 4, 4, 0]} label={<CustomBarLabel />}>
                  {dataFuentes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry, index, dataFuentes.length)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 3: Campos Menores */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col h-full lg:col-span-1 overflow-hidden relative">
          <div className="px-5 py-4 border-b border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex justify-between items-start w-full sm:w-auto flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                  <List size={14} /> Campos Menores
                </h3>
                <p className="text-[12px] text-[var(--muted-foreground)]">Distribución de demanda por campo menor</p>
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
              <div className="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] px-5 py-3 rounded-lg shadow-sm text-center flex flex-col items-center justify-center min-w-[160px]">
                <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-0.5">Total Menores</div>
                <div className="text-xl font-black">{totalMenoresMW} MW</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 items-center w-full p-5 overflow-x-auto">
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
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col h-full lg:col-span-1 justify-center items-center relative overflow-hidden">
          <div className="w-full px-5 py-4 border-b border-[var(--border)] flex justify-between items-start absolute top-0 left-0 bg-[var(--card)] z-10">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} /> GENERACIÓN GAS AGGREKO
            </h3>
            <div className="relative group">
              <HelpCircle size={16} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                Relación entre la capacidad generada y la disponible en la unidad Aggreko.
              </div>
            </div>
          </div>
          
          <div className="relative w-full max-w-[280px] flex justify-center mt-20">
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
