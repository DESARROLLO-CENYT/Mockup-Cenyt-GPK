import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronRight, ChevronDown, Activity, Zap, PieChart as PieChartIcon, HelpCircle } from 'lucide-react';

const dataCampos = [
  { name: 'Interconectados', value: 70, color: '#1B3454' },
  { name: 'Menores', value: 5, color: '#5C7AA3' },
];

const dataFuentes = [
  { name: 'PEL', value: 55.08, color: '#0E1A2B' },
  { name: 'Gas - Sur Energy', value: 11.98, color: '#1B3454' },
  { name: 'Gas Propio', value: 0.77, color: '#274472' },
  { name: 'Gas - Aggreko', value: 0, color: '#5C7AA3' },
  { name: 'Diesel', value: 0, color: '#A4B7D7' },
  { name: 'Genersa', value: 0, color: '#8B5CF6' },
  { name: 'Biomasa', value: 0, color: '#10B981' },
  { name: 'Solar', value: 0, color: '#E8A838' },
];

const semanasBase = [
  { num: 9, mes: 'marzo' },
  { num: 10, mes: 'marzo' },
  { num: 11, mes: 'marzo' },
  { num: 12, mes: 'marzo' },
  { num: 13, mes: 'marzo' },
  { num: 14, mes: 'marzo' },
  { num: 14, mes: 'abril' },
  { num: 15, mes: 'abril' },
  { num: 16, mes: 'abril' },
  { num: 17, mes: 'abril' },
  { num: 18, mes: 'abril' },
  { num: 18, mes: 'mayo' },
  { num: 19, mes: 'mayo' },
  { num: 20, mes: 'mayo' },
  { num: 21, mes: 'mayo' },
  { num: 22, mes: 'mayo' },
  { num: 23, mes: 'mayo' },
  { num: 24, mes: 'mayo' },
  { num: 24, mes: 'junio' },
  { num: 25, mes: 'junio' },
];

const dataSemanal = semanasBase.map((s) => {
  const i = s.num;
  return {
    semana: s.num,
    mes: s.mes,
    pel: parseFloat((50 + Math.sin(i / 2) * 5 + Math.cos(i / 4) * 2).toFixed(1)),
    sur: parseFloat((12 + Math.cos(i / 3) * 2).toFixed(1)),
    gas: parseFloat((1 + Math.sin(i) * 0.5).toFixed(1)),
  };
});

const tableDataNew = [
  { id: 'pel', fuente: 'PEL', real: '55,081', prog: '54,500', desv: '+1.0%', cop: '627.5', estado: 'ACT', desvColor: 'text-emerald-600 dark:text-emerald-400 font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'sur', fuente: 'Gas - Sur Energy', real: '11,982', prog: '12,500', desv: '-4.1%', cop: '580.4', estado: 'ACT', desvColor: 'text-[#1B3454] dark:text-[#5C7AA3] font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'propio', fuente: 'Gas Propio', real: '777', prog: '800', desv: '-2.8%', cop: '240.1', estado: 'ACT', desvColor: 'text-[#1B3454] dark:text-[#5C7AA3] font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'agg', fuente: 'Gas - Aggreko', real: '0', prog: '—', desv: '—', cop: '—', estado: 'S/BY', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' },
  { id: 'dsl', fuente: 'Diesel', real: '0', prog: '—', desv: '—', cop: '—', estado: 'S/BY', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' },
  { id: 'gen', fuente: 'Genersa', real: '—', prog: '—', desv: '—', cop: '—', estado: 'FUT', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' },
  { id: 'bio', fuente: 'Biomasa', real: '—', prog: '—', desv: '—', cop: '—', estado: 'FUT', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' },
  { id: 'sol', fuente: 'Solar', real: '0', prog: '0', desv: '—', cop: '—', estado: 'FUERA', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-red-100 text-[#1B3454] dark:bg-red-500/20 dark:text-[#5C7AA3]' },
];


const dataDiarioPotencia = [
  { hora: '12:00 a.m.', pel: 50, sur: 12, gas: 1, sol: 0 },
  { hora: '03:00 a.m.', pel: 48, sur: 12, gas: 1, sol: 0 },
  { hora: '06:00 a.m.', pel: 45, sur: 12, gas: 1, sol: 2 },
  { hora: '09:00 a.m.', pel: 40, sur: 10, gas: 1, sol: 8 },
  { hora: '12:00 p.m.', pel: 38, sur: 10, gas: 1, sol: 12 },
  { hora: '03:00 p.m.', pel: 42, sur: 12, gas: 1, sol: 6 },
  { hora: '06:00 p.m.', pel: 55, sur: 14, gas: 1, sol: 0 },
  { hora: '09:00 p.m.', pel: 60, sur: 14, gas: 1, sol: 0 },
  { hora: '11:59 p.m.', pel: 52, sur: 12, gas: 1, sol: 0 },
];

const CustomXAxisTick = ({ x, y, payload, index }) => {
  const data = dataSemanal[index];
  const prevData = index > 0 ? dataSemanal[index - 1] : null;
  const isFirstOfMonth = !prevData || prevData.mes !== data.mes;

  // Find the middle index of the current month block to center the text
  let monthStartIndex = index;
  while (monthStartIndex > 0 && dataSemanal[monthStartIndex - 1].mes === data.mes) {
    monthStartIndex--;
  }
  let monthEndIndex = index;
  while (monthEndIndex < dataSemanal.length - 1 && dataSemanal[monthEndIndex + 1].mes === data.mes) {
    monthEndIndex++;
  }
  const isMiddleOfMonth = index === Math.floor((monthStartIndex + monthEndIndex) / 2);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Separator line for months */}
      {isFirstOfMonth && index !== 0 && (
        <line x1={-20} y1={0} x2={-20} y2={30} stroke="var(--border)" strokeDasharray="2 2" />
      )}
      {/* Week Number */}
      <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11}>
        {data.semana}
      </text>
      {/* Month Name */}
      {isMiddleOfMonth && (
        <text x={0} y={0} dy={26} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11} className="capitalize">
          {data.mes}
        </text>
      )}
    </g>
  );
};



const renderCustomPieLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  const text = `${(percent * 100).toFixed(1)}%`;
  const textWidth = text.length * 7 + 16;
  const height = 24;
  
  return (
    <g>
      <rect x={x - textWidth / 2} y={y - height / 2} width={textWidth} height={height} rx={6} fill="var(--card)" stroke="var(--border)" strokeWidth={1} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }} />
      <text x={x} y={y} fill="var(--foreground)" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {text}
      </text>
    </g>
  );
};

const renderCustomBarLabel = (props) => {
  const { x, y, width, value } = props;
  if (!value || value === 0) return null;
  
  const text = `${value}`;
  const rectWidth = text.length * 7 + 16;
  const rectHeight = 22;
  
  return (
    <g>
      <rect x={x + width / 2 - rectWidth / 2} y={y - rectHeight - 6} width={rectWidth} height={rectHeight} rx={6} fill="var(--card)" stroke="var(--border)" strokeWidth={1} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }} />
      <text x={x + width / 2} y={y - rectHeight / 2 - 6} fill="var(--foreground)" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {text}
      </text>
    </g>
  );
};

const Despacho = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard label="Despacho Total Llanos 34" value="75.0" unit="MW" trend={1} trendValue="↑0.5%" subtext="Interconectados + Menores" accent />
        <KPICard label="Capacidad Disponible" value="82.5" unit="MW" trend={0} trendValue="=" subtext="Parque de generación" />
        <KPICard label="Costo Despacho Prom." value="604.0" unit="COP/kWh" trend={-1} trendValue="↓2.1%" subtext="Eficiencia económica" />
      </div>

      {/* Row 1: Pie Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <PieChartIcon size={14} /> Demanda por Campos (MW)
            </h3>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Distribución porcentual de la demanda energética entre campos interconectados y menores.
              </div>
            </div>
          </div>
          <div className="h-[250px] p-4 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataCampos}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  label={renderCustomPieLabel}
                >
                  {dataCampos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value} MW`}
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                  itemStyle={{ fontSize: "13px", color: "black" }}
                  labelStyle={{ color: "black" }}
                />
                <Legend 
                  iconType="square" 
                  wrapperStyle={{ fontSize: '12px', color: 'black' }}
                  formatter={(value) => <span style={{ color: 'black' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} /> Generación por Fuente (MW)
            </h3>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Capacidad de generación eléctrica aportada por cada tipo de fuente.
              </div>
            </div>
          </div>
          <div className="h-[250px] p-5 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataFuentes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(128,128,128,0.05)' }}
                  formatter={(value) => [`${value} MW`, 'Generación']}
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  label={renderCustomBarLabel}
                >
                  {dataFuentes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Area Chart */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b border-[var(--border)] flex flex-wrap gap-4 justify-between items-center">
          <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> Comportamiento Semanal de Fuentes (MW)
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex border border-[var(--border)] rounded text-[11px] font-medium overflow-hidden">
              <button className="px-3 py-1 bg-[#C41230] text-white">SEM</button>
              <button className="px-3 py-1 bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors border-l border-[var(--border)]">MES</button>
              <button className="px-3 py-1 bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors border-l border-[var(--border)]">AÑO</button>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Evolución histórica de la generación agrupada por tipo de fuente a nivel semanal/mensual.
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 320 }} className="p-4 pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataSemanal} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorPel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3454" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1B3454" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSur" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#274472" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#274472" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5C7AA3" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5C7AA3" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="semana" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} tickFormatter={(value) => `${value} MW`} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                itemStyle={{ color: "black", fontSize: "13px" }}
                labelStyle={{ color: "black" }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px', color: 'black' }} formatter={(value) => <span style={{ color: 'black' }}>{value}</span>} />
              <Area type="monotone" dataKey="pel" name="PEL" stackId="1" stroke="#1B3454" fill="url(#colorPel)" strokeWidth={2} activeDot={{ r: 6, fill: "#1B3454" }} />
              <Area type="monotone" dataKey="sur" name="Gas - Sur Energy" stackId="1" stroke="#274472" fill="url(#colorSur)" strokeWidth={2} activeDot={{ r: 6, fill: "#274472" }} />
              <Area type="monotone" dataKey="gas" name="Gas Propio" stackId="1" stroke="#5C7AA3" fill="url(#colorGas)" strokeWidth={2} activeDot={{ r: 6, fill: "#5C7AA3" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Table Real vs Programado */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[var(--muted-foreground)]" />
              <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
                REAL VS PROGRAMADO — SEMANA 06 · 2026
              </h3>
            </div>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Comparativa detallada de la generación real frente al valor programado, incluyendo desviaciones y costos.
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-3">
            <div className="w-full h-3 flex rounded-full overflow-hidden">
              <div className="bg-[#1B3454]" style={{ width: '81.2%' }}></div>
              <div className="bg-[#274472]" style={{ width: '17.6%' }}></div>
              <div className="bg-[#5C7AA3]" style={{ width: '1.2%' }}></div>
            </div>
            <div className="flex gap-4 text-[11.5px] font-medium text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#1B3454] rounded-sm"></div>PEL 81.2%</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#274472] rounded-sm"></div>Gas S.E. 17.6%</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#5C7AA3] rounded-sm"></div>Gas Propio 1.2%</div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-[13.5px] text-left">
            <thead className="bg-[#f8fafc] dark:bg-[var(--secondary)]/50 border-y border-[var(--border)]">
              <tr>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">FUENTE</th>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">REAL (KW)</th>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">PROG.</th>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">DESV.</th>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">COP/KWH</th>
                <th className="px-6 py-3.5 font-bold text-[11px] text-[var(--muted-foreground)] tracking-wider">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {tableDataNew.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)]/50 bg-white dark:bg-[var(--background)] transition-colors hover:bg-[var(--secondary)]/30">
                  <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.fuente}</td>
                  <td className="px-6 py-4 text-[var(--foreground)]">{row.real}</td>
                  <td className="px-6 py-4 text-[var(--foreground)]">{row.prog}</td>
                  <td className={`px-6 py-4 ${row.desvColor}`}>{row.desv}</td>
                  <td className="px-6 py-4 text-[var(--foreground)]">{row.cop}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${row.badgeClass}`}>
                      {row.estado}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f8fafc] dark:bg-[var(--secondary)]/40 font-bold border-b border-[var(--border)]">
                <td className="px-6 py-4 text-[var(--foreground)]">TOTAL</td>
                <td className="px-6 py-4 text-[var(--foreground)]">67,840</td>
                <td className="px-6 py-4 text-[var(--foreground)]">67,800</td>
                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">+0.0%</td>
                <td className="px-6 py-4 text-[var(--foreground)]">604.0</td>
                <td className="px-6 py-4 text-[var(--muted-foreground)]">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Análisis Diario - Potencia */}
      <div className="grid grid-cols-1 gap-6">

        {/* Gráfico de Potencia Diario */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-start">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} /> Potencia Generada por Fuentes (Diario)
            </h3>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Perfil de carga diario que muestra la potencia generada hora a hora por cada fuente.
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }} className="p-4 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataDiarioPotencia} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPelDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3454" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B3454" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSurDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#274472" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#274472" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGasDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5C7AA3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5C7AA3" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSolDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A4B7D7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A4B7D7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} dy={10} interval="preserveStartEnd" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(value) => `${value} MW`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                  itemStyle={{ color: "black", fontSize: "13px" }}
                  labelStyle={{ color: "black" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px', color: 'black' }} formatter={(value) => <span style={{ color: 'black' }}>{value}</span>} />
                <Area type="monotone" dataKey="pel" name="PEL" stackId="1" stroke="#1B3454" fill="url(#colorPelDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="sur" name="Gas - Sur Energy" stackId="1" stroke="#274472" fill="url(#colorSurDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="gas" name="Gas Propio" stackId="1" stroke="#5C7AA3" fill="url(#colorGasDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="sol" name="Solar" stackId="1" stroke="#A4B7D7" fill="url(#colorSolDiario)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Despacho;
