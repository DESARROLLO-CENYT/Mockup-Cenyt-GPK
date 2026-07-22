import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { ExternalLink, HelpCircle, Activity, BarChart2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const palette = ['#0E1A2B', '#1B3454', '#274472', '#5C7AA3', '#A4B7D7'];
const getColorByRank = (index, total, isKeraunos) => {
  if (isKeraunos) {
    const minLightness = 30; // Oscuro
    const maxLightness = 80; // Claro
    const lightness = minLightness + (index / Math.max(1, total - 1)) * (maxLightness - minLightness);
    return `hsl(217, 91%, ${lightness}%)`; // Azul
  }
  return palette[index % palette.length];
};

// --- DATOS VULNERABILIDADES ---
const dataAvance = [
  { actividad: 'Adecuación bajante de Puesta a Tierra', avance: 50 },
  { actividad: 'Adecuación discos antiescalatorio templete', avance: 100 },
  { actividad: 'Cambio de DPS', avance: 10 },
  { actividad: 'Descenso de crucetas en estructuras', avance: 5 },
  { actividad: 'Instalación de chaqueta aislante en cable pasante', avance: 0 },
  { actividad: 'Instalación de doble bajante de Puesta a Tierra', avance: 50 },
  { actividad: 'Instalación de nuevos banderines', avance: 15 },
  { actividad: 'Instalación discos antiescalatorio templete', avance: 40 },
  { actividad: 'Instalación discos antivandalismo poste', avance: 40 },
  { actividad: 'Normalización altura mufla', avance: 90 },
  { actividad: 'Normalización de puentes en estructuras pullover', avance: 50 },
  { actividad: 'Normalizar a estructura canadiense - AVIFAUNA', avance: 5 },
  { actividad: 'Normalizar montaje de cable con terminales premondeados', avance: 0 },
  { actividad: 'Reemplazar Linepost por 57-3', avance: 0 },
  { actividad: 'Reemplazo de banderines cristalizados', avance: 0 },
  { actividad: 'Retiro de Porta DPS', avance: 100 }
].sort((a, b) => b.avance - a.avance);

const dataAvanceSemanal = [
  { week: '3', mes: 'enero', avance: 1.8 },
  { week: '4', mes: '', avance: 3.8 },
  { week: '5', mes: 'febrero', avance: 6.0 },
  { week: '6', mes: '', avance: 8.7 },
  { week: '7', mes: '', avance: 8.8 },
  { week: '8', mes: '', avance: 11.0 },
  { week: '9', mes: 'marzo', avance: 12.1 },
  { week: '10', mes: '', avance: 12.2 },
  { week: '11', mes: '', avance: 14.6 },
  { week: '12', mes: '', avance: 14.8 },
  { week: '13', mes: '', avance: 15.1 },
  { week: '14', mes: 'abril', avance: 15.5 },
  { week: '15', mes: '', avance: 16.0 },
  { week: '16', mes: '', avance: 16.2 },
  { week: '17', mes: '', avance: 16.5 },
  { week: '18', mes: 'mayo', avance: 25.0 }, // 25% para vulnerabilidades
  { week: '19', mes: '', avance: 26.5 },
  { week: '20', mes: '', avance: 28.0 },
  { week: '21', mes: '', avance: 30.5 },
  { week: '22', mes: '', avance: 32.2 },
  { week: '23', mes: 'junio', avance: 34.0 },
  { week: '24', mes: '', avance: 35.5 },
  { week: '25', mes: '', avance: 36.9 }
];

  const riskColors = {
    'Crítico': '#0E1A2B', // Rojo oscuro para crítico
    'Alto': '#1B3454', // Rojo para alto
    'Medio': '#274472', // Naranja/Rojo claro para medio
    'Bajo': '#5C7AA3' // Rosa para bajo
  };

const dataCircuitos = [
  { name: 'JAC - JCS', value: 72.7 },
  { name: 'JAC - TGN', value: 51.6 },
  { name: 'PDT-TUA', value: 50.0 },
  { name: 'TGN-TGA', value: 36.1 },
  { name: 'TGN-TSUR', value: 21.9 },
  { name: 'PDT-TT', value: 16.7 },
  { name: 'TGN - PDT', value: 13.1 },
  { name: 'TGN-TGB', value: 7.7 },
  { name: 'JCS - JCE', value: 7.1 },
  { name: 'TSUR-TSW', value: 4.3 }
];

const dataPresupuesto = [
  { year: '2026', presupuesto: 100, ejecutado: 35 },
  { year: '2027', presupuesto: 50, ejecutado: 10 },
  { year: '2028', presupuesto: 30, ejecutado: 0 }
];

// --- DATOS KERAUNOS ---
const dataAvanceKer = [
  { actividad: 'Asegurar valores de RPT bajos y equipotencialidad', avance: 45 },
  { actividad: 'Plan de mejoramiento de suelo y contrapesos', avance: 20 },
  { actividad: 'Mejorar equipotencialidad de bajantes y conectores', avance: 30 },
  { actividad: 'Instalar dispositivos para avifauna', avance: 0 },
  { actividad: 'Instalar DST', avance: 15 },
  { actividad: 'Mantenimiento a dispositivos de avifauna', avance: 10 },
  { actividad: 'Inspecciones periódicas y estudios avifauna', avance: 5 }
].sort((a, b) => b.avance - a.avance);

const dataAvanceSemanalKer = [
  { week: '3', mes: 'enero', avance: 1.0 },
  { week: '4', mes: '', avance: 2.1 },
  { week: '5', mes: 'febrero', avance: 3.5 },
  { week: '6', mes: '', avance: 4.8 },
  { week: '7', mes: '', avance: 5.5 },
  { week: '8', mes: '', avance: 7.2 },
  { week: '9', mes: 'marzo', avance: 8.5 },
  { week: '10', mes: '', avance: 9.1 },
  { week: '11', mes: '', avance: 10.4 },
  { week: '12', mes: '', avance: 11.2 },
  { week: '13', mes: '', avance: 12.0 },
  { week: '14', mes: 'abril', avance: 13.5 },
  { week: '15', mes: '', avance: 14.1 },
  { week: '16', mes: '', avance: 14.8 },
  { week: '17', mes: '', avance: 15.0 },
  { week: '18', mes: 'mayo', avance: 15.0 }, // 15% para keraunos
  { week: '19', mes: '', avance: 16.5 },
  { week: '20', mes: '', avance: 17.0 },
  { week: '21', mes: '', avance: 18.5 },
  { week: '22', mes: '', avance: 20.2 },
  { week: '23', mes: 'junio', avance: 22.0 },
  { week: '24', mes: '', avance: 23.5 },
  { week: '25', mes: '', avance: 24.9 }
];

const dataCircuitosKer = [
  { name: 'JAC - JCS', value: 45.2 },
  { name: 'PDT-TUA', value: 38.0 },
  { name: 'TGN-TGA', value: 25.4 },
  { name: 'TGN - PDT', value: 18.1 },
  { name: 'TSUR-TSW', value: 12.3 }
];

const dataPresupuestoKer = [
  { year: '2026', presupuesto: 422, ejecutado: 63 },
  { year: '2027', presupuesto: 99, ejecutado: 0 },
  { year: '2028', presupuesto: 36, ejecutado: 0 }
];

// --- LISTAS COMPARTIDAS O INVENTADAS ---
const listCortoPlazo = [
  '- Inspección Coronografía y Termografía',
  '- Medición corriente fuga',
  '- Clasificación HC',
  '- Lavado selectivo',
  '- Revisión de Pararrayos',
  '- Análisis estadístico de fallas',
  '- Medición de Puestas a Tierras en las Torres'
];

const listRutinas = [
  '- Inspecciones y reinstalación de Tierras; Cambios de DPS; Corrientes Fuga',
  '- Rutinas de retiro de nidos. Instalación antiescalatorio. Instalación Baquelas para aves.',
  '- Inspección Visual. Rutina Predictivo Ultrasonido y Termografía',
  '- Cuadrilla de L.V ; Cambio de Tecnología en Reconectadores'
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--popover)] border border-[var(--border)] p-3 rounded-lg shadow-xl">
        <p className="font-bold text-[var(--foreground)] mb-2 text-xs uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[var(--foreground)]">
            {payload[0].value}% Completado
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomAreaLabel = (props) => {
  const { x, y, index, value, dataArray } = props;
  const total = dataArray ? dataArray.length : 16;
  const isLast = index === total - 1;
  const showLabel = isLast || index % 3 === 0;

  if (!showLabel) return null;

  return (
    <text x={x} y={y - 10} fill="var(--foreground)" fontSize={10} textAnchor="middle">
      {value}%
    </text>
  );
};

const renderCustomHorizontalBarLabel = (props, dataArray, dataKey) => {
  const { x, y, width, height, value } = props;
  if (value === undefined || value === null) return null;
  
  const maxValor = Math.max(...dataArray.map(d => d[dataKey]));
  if (value !== maxValor) return null;
  
  const text = `${value}%`;
  const rectWidth = text.length * 7 + 16;
  const rectHeight = 22;
  
  return (
    <g>
      <rect x={x + width + 6} y={y + height / 2 - rectHeight / 2} width={rectWidth} height={rectHeight} rx={6} fill="var(--card)" stroke="var(--border)" strokeWidth={1} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }} />
      <text x={x + width + 6 + rectWidth / 2} y={y + height / 2} fill="var(--foreground)" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {text}
      </text>
    </g>
  );
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

const Vulnerabilidades = () => {
  const [activeTab, setActiveTab] = useState('vulnerabilidades');
  const isKeraunos = activeTab === 'keraunos';
  const themeColor = isKeraunos ? '#274472' : '#274472';

  const currentAccionesTotales = isKeraunos ? 467 : 1043;
  const currentAccionesCerradas = isKeraunos ? 70 : 261;
  const currentPorcentajeEjecucion = isKeraunos ? 15 : 25;
  const currentPorcentajePresupuesto = isKeraunos ? 20 : 35;
  
  const currentDataAvance = isKeraunos ? dataAvanceKer : dataAvance;
  const currentDataCircuitos = isKeraunos ? dataCircuitosKer : dataCircuitos;
  const currentDataPresupuesto = isKeraunos ? dataPresupuestoKer : dataPresupuesto;
  const currentDataAvanceSemanal = isKeraunos ? dataAvanceSemanalKer : dataAvanceSemanal;

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Cabecera con título y botón PowerBI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight flex items-center gap-2">
            <div className="w-2 h-6 rounded-full transition-colors" style={{ backgroundColor: themeColor }}></div>
            Plan de acción sistemas asociados
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Seguimiento al Plan de Vulnerabilidades y Mantenimiento
          </p>
        </div>
        
        <a 
          href="https://app.powerbi.com/view?r=eyJrIjoiNzBmNzJiZjAtMTA1NC00ODI4LTk0ZjEtN2I0ZjRmZjZmOTExIiwidCI6IjEwMDgwMjkwLTkyYTAtNGI2YS05NTUwLTI3Y2NjNzkyMGI1YiIsImMiOjR9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors shadow-sm opacity-90 hover:opacity-100"
          style={{ backgroundColor: themeColor }}
        >
          Ver en PowerBI
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('vulnerabilidades')}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            !isKeraunos
              ? 'border-[#274472] text-[#274472] dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
          }`}
        >
          Plan de Vulnerabilidades
        </button>
        <button
          onClick={() => setActiveTab('keraunos')}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            isKeraunos
              ? 'border-[#274472] text-[#274472] dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
          }`}
        >
          Plan Keraunos
        </button>
      </div>

      {/* Fila superior de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Estructuras en campo" value={isKeraunos ? "145" : "732"} unit="Unid." subtext={isKeraunos ? "45 con DPS" : "120 con DPS / DSD"} />
        <KPICard label="Acciones recomendadas" value={currentAccionesTotales} unit="Acciones" subtext={`${currentAccionesCerradas} Cerradas`} accent={isKeraunos ? 'blue' : true} />
        
        {/* Velocímetro: % de ejecución */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
          <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)]">
            % DE EJECUCIÓN
          </span>
          <div className="h-[80px] w-full flex justify-center items-center relative mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: currentPorcentajeEjecucion }, { value: 100 - currentPorcentajeEjecucion }]}
                  cx="50%" cy="100%"
                  startAngle={180} endAngle={0}
                  innerRadius={50} outerRadius={70}
                  dataKey="value" stroke="none"
                  isAnimationActive={false}
                >
                  <Cell fill={themeColor} />
                  <Cell fill="rgba(128,128,128,0.2)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-1 text-2xl font-bold text-[var(--foreground)]">{currentPorcentajeEjecucion}%</div>
          </div>
        </div>

        {/* Barra: % de ejecución presupuestal */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col justify-center gap-4 hover:border-white/10 transition-colors">
          <span className="text-[10px] uppercase tracking-widest font-medium text-[var(--muted-foreground)]">
            % EJECUCIÓN PRESUPUESTAL
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-semibold text-[var(--foreground)] leading-none">{currentPorcentajePresupuesto}%</span>
            </div>
            <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${currentPorcentajePresupuesto}%`, backgroundColor: themeColor }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de detalle semanales y circuitos (Parte Alta) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Gráfico 1: Avance semanal */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} /> Avance semanal
            </h3>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Evolución del porcentaje de avance a lo largo de las semanas para el plan seleccionado.
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full p-5 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentDataAvanceSemanal} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="gradAvanceSemanal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColor} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={<CustomXAxisTick data={currentDataAvanceSemanal} />} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                  itemStyle={{ color: "black", fontSize: "13px" }}
                  labelStyle={{ color: "black" }}
                />
                <Area type="monotone" dataKey="avance" name="Avance" stroke={themeColor} strokeWidth={2} fill="url(#gradAvanceSemanal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Circuitos */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <BarChart2 size={14} /> Circuitos
            </h3>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case text-left">
                Nivel de vulnerabilidad o impacto asociado a cada circuito de transmisión.
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full p-5 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentDataCircuitos} layout="vertical" margin={{ top: 0, right: 40, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }} 
                  itemStyle={{ color: "black", fontSize: "13px" }}
                  labelStyle={{ color: "black" }}
                  cursor={{ fill: 'rgba(128,128,128,0.1)' }} 
                />
                <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={20} label={(props) => renderCustomHorizontalBarLabel(props, currentDataCircuitos, 'value')}>
                  {(() => {
                    const sortedValues = [...currentDataCircuitos].map(d => d.value).sort((a, b) => b - a);
                    const bluePalette = ['#0E1A2B', '#1B3454', '#274472', '#5C7AA3', '#A4B7D7'];
                    const palette = bluePalette;
                    return currentDataCircuitos.map((entry, index) => {
                      const rank = sortedValues.indexOf(entry.value);
                      const colorIndex = Math.floor((rank / Math.max(1, sortedValues.length - 1)) * (palette.length - 1));
                      return <Cell key={`cell-${index}`} fill={palette[colorIndex]} />;
                    });
                  })()}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lado Izquierdo: Resumen y Avance */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Card: Avance Actividades 2026 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
              <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                <BarChart2 size={14} /> AVANCE ACTIVIDADES 2026
              </h3>
              <div className="relative group">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                  Progreso detallado (% de ejecución) para cada una de las actividades programadas en el plan.
                </div>
              </div>
            </div>
            <div className="h-[450px] ml-[-20px] sm:ml-0 p-5 pb-8">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentDataAvance} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis dataKey="actividad" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={250} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }} 
                    itemStyle={{ color: "black", fontSize: "13px" }}
                    labelStyle={{ color: "black" }}
                    cursor={{ fill: 'rgba(128,128,128,0.1)' }} 
                  />
                  <Bar dataKey="avance" radius={[0, 2, 2, 0]} barSize={20} label={(props) => renderCustomHorizontalBarLabel(props, currentDataAvance, 'avance')}>
                    {(() => {
                      const sortedValues = [...currentDataAvance].map(d => d.avance).sort((a, b) => b - a);
                      const bluePalette = ['#0E1A2B', '#1B3454', '#274472', '#5C7AA3', '#A4B7D7'];
                      const palette = bluePalette;
                      return currentDataAvance.map((entry, index) => {
                        const rank = sortedValues.indexOf(entry.avance);
                        const colorIndex = Math.floor((rank / Math.max(1, sortedValues.length - 1)) * (palette.length - 1));
                        return <Cell key={`cell-${index}`} fill={palette[colorIndex]} />;
                      });
                    })()}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)]">
              <span className="font-bold text-[var(--foreground)]">NOTA:</span> Las actividades están encaminadas a mitigar las principales causas de falla que son Fauna y Descargas atmosféricas
            </div>
          </div>
          
        </div>

        {/* Lado Derecho: Gráfico Presupuesto vs Ejecución */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
              <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
                <BarChart2 size={14} /> PRESUPUESTO VS EJECUCIÓN
              </h3>
              <div className="relative group">
                <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
                <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                  Comparativa multianual entre el presupuesto asignado y el valor realmente ejecutado (en millones).
                </div>
              </div>
            </div>
            <div className="h-[450px] w-full p-5 pb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentDataPresupuesto.map(d => ({ ...d, porEjecutar: d.presupuesto - d.ejecutado }))} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}M`} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                    itemStyle={{ color: "black", fontSize: "13px" }}
                    labelStyle={{ color: "black" }}
                    cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                    formatter={(value, name, props) => {
                      if (name === "Presupuesto") return [`$${props.payload.presupuesto}M`, "Presupuesto"];
                      return [`$${value}M`, name];
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} formatter={(value) => <span style={{ color: 'black' }}>{value}</span>} />
                  <Bar dataKey="ejecutado" name="Ejecutado" stackId="a" fill={'#274472'} barSize={40} />
                  <Bar dataKey="porEjecutar" name="Presupuesto" stackId="a" fill={'#A4B7D7'} radius={[2, 2, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Planes de Acción Unificados */}
      {!isKeraunos && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-md font-bold text-[var(--foreground)] uppercase tracking-wider mb-6">PLANES DE ACCIÓN: PEL & CABRESTERO</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Columna PEL */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">PLAN ACCIÓN PEL</h4>
              
              <div>
                <h5 className="text-xs font-bold text-[var(--foreground)] uppercase mb-3">Líneas de transmisión corto plazo</h5>
                <ul className="flex flex-col gap-2">
                  {listCortoPlazo.map((item, idx) => (
                    <li key={idx} className="bg-[var(--background)] px-4 py-2 rounded text-sm text-[var(--muted-foreground)] border border-[var(--border)]">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[var(--foreground)] uppercase mb-3">Subestaciones mantenimiento anual</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)]">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Transformadores</h6>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">DGA, Factor de potencia (tan δ), Furanos.</p>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)]">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Interruptores</h6>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Resistencia de contactos, Tiempos.</p>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)]">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Protecciones</h6>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Pruebas secundarias, Ajustes Estudio IEB.</p>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)]">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Puesta a Tierra</h6>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Medición de resistencia.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna CABRESTERO */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 flex justify-between items-center">
                <span>PLAN ACCIÓN CABRESTERO</span>
                <span className="text-xs font-normal text-[var(--muted-foreground)] normal-case">Causas: Fauna y Descargas</span>
              </h4>
              
              <div>
                <h5 className="text-xs font-bold text-[var(--foreground)] uppercase mb-3">Rutinas preventivas/predictivas</h5>
                <ul className="flex flex-col gap-2">
                  {listRutinas.map((item, idx) => (
                    <li key={idx} className="bg-[var(--background)] px-4 py-3 rounded text-sm text-[var(--muted-foreground)] border border-[var(--border)] leading-tight">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[var(--foreground)] uppercase mb-3">Basado en confiabilidad</h5>
                <div className="flex flex-col gap-3">
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)] flex justify-between items-center">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Redes M.T.</h6>
                    <p className="text-xs text-[var(--muted-foreground)] text-right">Ampliación distancias en redes.</p>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)] flex justify-between items-center">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Pórtico M.T.</h6>
                    <p className="text-xs text-[var(--muted-foreground)] text-right">Tecnologías en reconectadores.</p>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded border border-[var(--border)] flex justify-between items-center">
                    <h6 className="font-bold text-sm text-[var(--foreground)]">Coordinación</h6>
                    <p className="text-xs text-[var(--muted-foreground)] text-right">Coordinación de protecciones actualizada.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Vulnerabilidades;
