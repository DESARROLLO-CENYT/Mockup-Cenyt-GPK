import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronRight, ChevronDown, Activity, Zap, PieChart as PieChartIcon } from 'lucide-react';

const dataCampos = [
  { name: 'Interconectados', value: 70, color: '#C41230' },
  { name: 'Menores', value: 5, color: '#4A9EE0' },
];

const dataFuentes = [
  { name: 'PEL', value: 55, color: '#C41230' },
  { name: 'Sur Energy', value: 14, color: '#B56D24' },
  { name: 'Gen. Gas', value: 1, color: '#107C41' },
  { name: 'Diésel', value: 0, color: '#4A9EE0' },
  { name: 'Solar', value: 0, color: '#E8A838' },
];

const dataSemanal = [
  { semana: 28, mes: 'Jul', pel: 53.0, sur: 13.0, gas: 0.8 },
  { semana: 29, mes: 'Jul', pel: 54.2, sur: 13.5, gas: 0.9 },
  { semana: 30, mes: 'Jul', pel: 54.5, sur: 13.8, gas: 1.0 },
  { semana: 31, mes: 'Ago', pel: 54.8, sur: 13.9, gas: 1.0 },
  { semana: 32, mes: 'Ago', pel: 55.0, sur: 14.0, gas: 1.0 },
];

const tableData = [
  {
    id: 'pel', fuente: 'PEL', sem1: 54.2, sem2: 54.5, sem3: 54.8, sem4: 55.0,
    subrows: [
      { id: 'pel_j1', fuente: 'PEL JAC 1', sem1: 15.0, sem2: 15.0, sem3: 15.0, sem4: 15.0 },
      { id: 'pel_j2', fuente: 'PEL JAC 2', sem1: 15.0, sem2: 15.0, sem3: 15.0, sem4: 15.0 },
      { id: 'pel_t1', fuente: 'PEL TIG 1', sem1: 12.2, sem2: 12.5, sem3: 12.8, sem4: 13.0 },
      { id: 'pel_t2', fuente: 'PEL TIG 2', sem1: 12.0, sem2: 12.0, sem3: 12.0, sem4: 12.0 },
    ]
  },
  {
    id: 'sur', fuente: 'Sur Energy', sem1: 13.5, sem2: 13.8, sem3: 13.9, sem4: 14.0,
    subrows: [
      { id: 'sur_1', fuente: 'Sur Gen 1', sem1: 6.5, sem2: 6.8, sem3: 6.9, sem4: 7.0 },
      { id: 'sur_2', fuente: 'Sur Gen 2', sem1: 7.0, sem2: 7.0, sem3: 7.0, sem4: 7.0 },
    ]
  },
  {
    id: 'gas', fuente: 'Generación Gas', sem1: 0.9, sem2: 1.0, sem3: 1.0, sem4: 1.0,
    subrows: [
      { id: 'gas_1', fuente: 'Gas TUA', sem1: 0.9, sem2: 1.0, sem3: 1.0, sem4: 1.0 },
    ]
  },
  {
    id: 'dsl', fuente: 'Generación Diésel', sem1: 0.0, sem2: 0.0, sem3: 0.0, sem4: 0.0,
    subrows: []
  },
  {
    id: 'sol', fuente: 'Klarzen Granja Solar', sem1: 0.0, sem2: 0.0, sem3: 0.0, sem4: 0.0,
    subrows: []
  }
];

const CustomXAxisTick = ({ x, y, payload, index, data }) => {
  const isFirstOfMo = index === 0 || data[index].mes !== data[index - 1].mes;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={15} dy={0} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11} fontWeight={500}>
        {payload.value}
      </text>
      {isFirstOfMo && (
        <>
          <line x1={-15} y1={20} x2={-15} y2={35} stroke="var(--border)" strokeWidth={1} />
          <text x={0} y={32} textAnchor="middle" fill="var(--foreground)" fontSize={11} fontWeight={600}>
            {data[index].mes}
          </text>
        </>
      )}
    </g>
  );
};

const ExpandableRow = ({ row }) => {
  const [expanded, setExpanded] = useState(false);
  const total = (row.sem1 + row.sem2 + row.sem3 + row.sem4).toFixed(1);

  return (
    <>
      <tr 
        className={`border-b border-[var(--border)]/50 transition-colors ${row.subrows && row.subrows.length > 0 ? 'cursor-pointer hover:bg-[var(--secondary)]/50' : ''}`}
        onClick={() => row.subrows && row.subrows.length > 0 && setExpanded(!expanded)}
      >
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-2">
            <div className="w-4 flex justify-center">
              {row.subrows && row.subrows.length > 0 && (
                expanded ? <ChevronDown size={14} className="text-[var(--muted-foreground)]" /> : <ChevronRight size={14} className="text-[var(--muted-foreground)]" />
              )}
            </div>
            <span className="font-medium text-[var(--foreground)]">{row.fuente}</span>
          </div>
        </td>
        <td className="px-5 py-3.5 text-right">{row.sem1.toFixed(1)}</td>
        <td className="px-5 py-3.5 text-right">{row.sem2.toFixed(1)}</td>
        <td className="px-5 py-3.5 text-right">{row.sem3.toFixed(1)}</td>
        <td className="px-5 py-3.5 text-right font-medium">{row.sem4.toFixed(1)}</td>
        <td className="px-5 py-3.5 text-right font-semibold text-[var(--foreground)]">{total}</td>
      </tr>
      {expanded && row.subrows.map((sub, i) => {
        const subTotal = (sub.sem1 + sub.sem2 + sub.sem3 + sub.sem4).toFixed(1);
        return (
          <tr key={sub.id} className="border-b border-[var(--border)]/30 bg-[var(--background)]">
            <td className="px-5 py-2.5 pl-12">
              <span className="text-[12.5px] text-[var(--muted-foreground)] font-medium">{sub.fuente}</span>
            </td>
            <td className="px-5 py-2.5 text-right text-[12.5px] text-[var(--muted-foreground)]">{sub.sem1.toFixed(1)}</td>
            <td className="px-5 py-2.5 text-right text-[12.5px] text-[var(--muted-foreground)]">{sub.sem2.toFixed(1)}</td>
            <td className="px-5 py-2.5 text-right text-[12.5px] text-[var(--muted-foreground)]">{sub.sem3.toFixed(1)}</td>
            <td className="px-5 py-2.5 text-right text-[12.5px] text-[var(--muted-foreground)] font-medium">{sub.sem4.toFixed(1)}</td>
            <td className="px-5 py-2.5 text-right text-[12.5px] text-[var(--muted-foreground)] font-semibold">{subTotal}</td>
          </tr>
        );
      })}
    </>
  );
};

const Despacho = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Despacho Total Llanos 34" value="75.0" unit="MW" trend={1} trendValue="↑0.5%" subtext="Interconectados + Menores" accent />
        <KPICard label="Capacidad Disponible" value="82.5" unit="MW" trend={0} trendValue="=" subtext="Parque de generación" />
        <KPICard label="Reserva Rodante" value="7.5" unit="MW" trend={-1} trendValue="↓1.2%" subtext="Margen de seguridad" />
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
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
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
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
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
        <div className="h-[280px] p-4 flex-1 pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataSemanal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="semana" axisLine={false} tickLine={false} tick={(props) => <CustomXAxisTick {...props} data={dataSemanal} />} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} />
              <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
              <Area type="monotone" dataKey="pel" name="PEL" stackId="1" stroke="#C41230" fill="#C41230" fillOpacity={0.8} strokeWidth={1} />
              <Area type="monotone" dataKey="sur" name="Sur Energy" stackId="1" stroke="#B56D24" fill="#B56D24" fillOpacity={0.8} strokeWidth={1} />
              <Area type="monotone" dataKey="gas" name="Gen. Gas" stackId="1" stroke="#107C41" fill="#107C41" fillOpacity={0.8} strokeWidth={1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Hierarchical Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-3">
            Consolidado Semanal de Despacho (MW)
          </h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--secondary)]/50 border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">FUENTE / GENERADOR</th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">SEM 28</th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">SEM 29</th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">SEM 30</th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-[var(--muted-foreground)] tracking-wider">SEM 31</th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-[var(--foreground)] tracking-wider">TOTAL MES</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <ExpandableRow key={row.id} row={row} />
              ))}
              <tr className="bg-[var(--secondary)]/40 font-bold border-t-2 border-[var(--border)]">
                <td className="px-5 py-4 text-[var(--foreground)] pl-11">TOTAL GENERAL</td>
                <td className="px-5 py-4 text-right text-[var(--foreground)]">68.6</td>
                <td className="px-5 py-4 text-right text-[var(--foreground)]">69.3</td>
                <td className="px-5 py-4 text-right text-[var(--foreground)]">69.7</td>
                <td className="px-5 py-4 text-right text-[var(--foreground)]">70.0</td>
                <td className="px-5 py-4 text-right text-[#C41230]">277.6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Despacho;
