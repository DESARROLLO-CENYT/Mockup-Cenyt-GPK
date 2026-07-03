import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronRight, ChevronDown, Activity, Zap, PieChart as PieChartIcon } from 'lucide-react';

const dataCampos = [
  { name: 'Interconectados', value: 70, color: '#C41230' },
  { name: 'Menores', value: 5, color: '#4A9EE0' },
];

const dataFuentes = [
  { name: 'PEL', value: 55.08, color: '#C41230' },
  { name: 'Gas - Sur Energy', value: 11.98, color: '#B56D24' },
  { name: 'Gas Propio', value: 0.77, color: '#107C41' },
  { name: 'Gas - Aggreko', value: 0, color: '#F59E0B' },
  { name: 'Diesel', value: 0, color: '#4A9EE0' },
  { name: 'Genersa', value: 0, color: '#8B5CF6' },
  { name: 'Biomasa', value: 0, color: '#10B981' },
  { name: 'Solar', value: 0, color: '#E8A838' },
];

const dataSemanal = (() => {
  const data = [];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  for (let i = 1; i <= 24; i++) {
    const mesIndex = Math.floor((i - 1) / 4.33) % 12;
    data.push({
      semana: i,
      mes: meses[mesIndex],
      pel: parseFloat((50 + Math.sin(i / 2) * 5 + Math.cos(i / 4) * 2).toFixed(1)),
      sur: parseFloat((12 + Math.cos(i / 3) * 2).toFixed(1)),
      gas: parseFloat((1 + Math.sin(i) * 0.5).toFixed(1)),
    });
  }
  return data;
})();

const tableDataNew = [
  { id: 'pel', fuente: 'PEL', real: '55,081', prog: '54,500', desv: '+1.0%', cop: '627.5', estado: 'ACT', desvColor: 'text-emerald-600 dark:text-emerald-400 font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'sur', fuente: 'Gas - Sur Energy', real: '11,982', prog: '12,500', desv: '-4.1%', cop: '580.4', estado: 'ACT', desvColor: 'text-[#C41230] dark:text-red-400 font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'propio', fuente: 'Gas Propio', real: '777', prog: '800', desv: '-2.8%', cop: '240.1', estado: 'ACT', desvColor: 'text-[#C41230] dark:text-red-400 font-bold', badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'agg', fuente: 'Gas - Aggreko', real: '0', prog: '—', desv: '—', cop: '—', estado: 'S/BY', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' },
  { id: 'dsl', fuente: 'Diesel', real: '0', prog: '—', desv: '—', cop: '—', estado: 'S/BY', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' },
  { id: 'gen', fuente: 'Genersa', real: '—', prog: '—', desv: '—', cop: '—', estado: 'FUT', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' },
  { id: 'bio', fuente: 'Biomasa', real: '—', prog: '—', desv: '—', cop: '—', estado: 'FUT', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' },
  { id: 'sol', fuente: 'Solar', real: '0', prog: '0', desv: '—', cop: '—', estado: 'FUERA', desvColor: 'text-[var(--muted-foreground)]', badgeClass: 'bg-red-100 text-[#C41230] dark:bg-red-500/20 dark:text-red-400' },
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

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const weekNum = payload.value;
  const itemIndex = data.findIndex(d => d.semana === weekNum);
  if (itemIndex === -1) return null;
  
  const isFirstOfMo = itemIndex === 0 || data[itemIndex].mes !== data[itemIndex - 1].mes;
  const showWeek = itemIndex % 2 === 0;

  return (
    <g transform={`translate(${x},${y})`}>
      {showWeek && (
        <text x={0} y={15} dy={0} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11} fontWeight={500}>
          S{weekNum}
        </text>
      )}
      {isFirstOfMo && (
        <>
          <line x1={0} y1={20} x2={0} y2={35} stroke="var(--border)" strokeWidth={1} />
          <text x={0} y={32} textAnchor="middle" fill="var(--foreground)" fontSize={11} fontWeight={600}>
            {data[itemIndex].mes}
          </text>
        </>
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
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <PieChartIcon size={14} /> Demanda por Campos (MW)
            </h3>
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
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }}
                  itemStyle={{ fontSize: "13px" }}
                />
                <Legend 
                  iconType="square" 
                  wrapperStyle={{ fontSize: '12px', color: 'var(--muted-foreground)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} /> Generación por Fuente (MW)
            </h3>
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
          <div className="flex border border-[var(--border)] rounded text-[11px] font-medium overflow-hidden">
            <button className="px-3 py-1 bg-[#C41230] text-white">SEM</button>
            <button className="px-3 py-1 bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors border-l border-[var(--border)]">MES</button>
            <button className="px-3 py-1 bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors border-l border-[var(--border)]">AÑO</button>
          </div>
        </div>
        <div style={{ width: '100%', height: 320 }} className="p-4 pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataSemanal} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C41230" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#C41230" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSur" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B56D24" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#B56D24" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#107C41" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#107C41" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="semana" axisLine={false} tickLine={false} tick={(props) => <CustomXAxisTick {...props} data={dataSemanal} />} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} tickFormatter={(value) => `${value} MW`} />
              <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
              <Area type="monotone" dataKey="pel" name="PEL" stackId="1" stroke="#C41230" fill="url(#colorPel)" strokeWidth={2} activeDot={{ r: 6, fill: "#C41230" }} />
              <Area type="monotone" dataKey="sur" name="Gas - Sur Energy" stackId="1" stroke="#B56D24" fill="url(#colorSur)" strokeWidth={2} activeDot={{ r: 6, fill: "#B56D24" }} />
              <Area type="monotone" dataKey="gas" name="Gas Propio" stackId="1" stroke="#107C41" fill="url(#colorGas)" strokeWidth={2} activeDot={{ r: 6, fill: "#107C41" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Table Real vs Programado */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[var(--muted-foreground)]" />
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
              REAL VS PROGRAMADO — SEMANA 06 · 2026
            </h3>
          </div>
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-3">
            <div className="w-full h-3 flex rounded-full overflow-hidden">
              <div className="bg-[#C41230]" style={{ width: '81.2%' }}></div>
              <div className="bg-[#B56D24]" style={{ width: '17.6%' }}></div>
              <div className="bg-[#107C41]" style={{ width: '1.2%' }}></div>
            </div>
            <div className="flex gap-4 text-[11.5px] font-medium text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#C41230] rounded-sm"></div>PEL 81.2%</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#B56D24] rounded-sm"></div>Gas S.E. 17.6%</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#107C41] rounded-sm"></div>Gas Propio 1.2%</div>
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
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest text-center">
              Potencia Generada por Fuentes (Diario)
            </h3>
          </div>
          <div style={{ width: '100%', height: 300 }} className="p-4 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataDiarioPotencia} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPelDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C41230" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C41230" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSurDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B56D24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#B56D24" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGasDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#107C41" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#107C41" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSolDiario" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} dy={10} interval="preserveStartEnd" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(value) => `${value} MW`} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="pel" name="PEL" stackId="1" stroke="#C41230" fill="url(#colorPelDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="sur" name="Gas - Sur Energy" stackId="1" stroke="#B56D24" fill="url(#colorSurDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="gas" name="Gas Propio" stackId="1" stroke="#107C41" fill="url(#colorGasDiario)" strokeWidth={2} />
                <Area type="monotone" dataKey="sol" name="Solar" stackId="1" stroke="#EAB308" fill="url(#colorSolDiario)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Despacho;
