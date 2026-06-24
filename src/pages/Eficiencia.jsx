import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ChevronRight, ChevronDown, Cloud } from 'lucide-react';

const dataSemanas = [
  { num: 3, mes: 'enero', real: 1.8, meta: 2.5 },
  { num: 4, mes: 'enero', real: 2.1, meta: 2.5 },
  { num: 5, mes: 'febrero', real: 3.8, meta: 2.5 },
  { num: 6, mes: 'febrero', real: 6.0, meta: 2.5 },
  { num: 7, mes: 'febrero', real: 8.7, meta: 2.5 },
  { num: 8, mes: 'febrero', real: 8.8, meta: 2.5 },
  { num: 9, mes: 'marzo', real: 11.0, meta: 2.5 },
  { num: 10, mes: 'marzo', real: 12.1, meta: 2.5 },
  { num: 11, mes: 'marzo', real: 12.2, meta: 2.5 },
  { num: 12, mes: 'abril', real: 14.6, meta: 2.5 },
];

const dataCampos = [
  { campo: 'Tigui', valor: 1.00 },
  { campo: 'GL Isla', valor: 1.02 },
  { campo: 'Tigana SW', valor: 1.45 },
  { campo: 'Tigana A', valor: 2.04 },
  { campo: 'Jacana', valor: 4.75 },
  { campo: 'Tigana Sur', valor: 13.07 },
];

// Datos de la tabla jerárquica
const tableData = [
  {
    facilidad: 'Tigana A', campo: 'Tigana', demanda: '11,699', bopd: '5,723', bfpd: '85,146', kwbo: 2.04,
    pozos: [
      { facilidad: 'TGA-01', campo: 'pozo', demanda: '4,966', bopd: '2,429', bfpd: '—', kwbo: 1.61 },
      { facilidad: 'TGA-02', campo: 'pozo', demanda: '4,409', bopd: '2,157', bfpd: '—', kwbo: 1.91 },
      { facilidad: 'TGA-03', campo: 'pozo', demanda: '2,324', bopd: '1,137', bfpd: '—', kwbo: 2.60 },
    ]
  },
  { facilidad: 'Tigana Sur', campo: 'Tigana', demanda: '12,369', bopd: '947', bfpd: '21,525', kwbo: 13.07 },
  { facilidad: 'Tigana SW', campo: 'Tigana', demanda: '3,248', bopd: '2,236', bfpd: '32,779', kwbo: 1.45 },
  { facilidad: 'Tua', campo: 'Tigana', demanda: '4,305', bopd: '1,555', bfpd: '26,405', kwbo: 2.77 },
  { facilidad: 'Jacana', campo: 'Jacana', demanda: '12,632', bopd: '2,660', bfpd: '33,828', kwbo: 4.75 },
  { facilidad: 'Jacana E', campo: 'Jacana', demanda: '3,888', bopd: '2,063', bfpd: '31,551', kwbo: 1.88 },
  { facilidad: 'Jacana Sur', campo: 'Jacana', demanda: '5,209', bopd: '2,434', bfpd: '35,634', kwbo: 2.14 },
  { facilidad: 'Tigui', campo: 'No Intcn.', demanda: '6,169', bopd: '6,181', bfpd: '46,847', kwbo: 1.00 },
  { facilidad: 'GL Isla', campo: 'No Intcn.', demanda: '932', bopd: '910', bfpd: '10,912', kwbo: 1.02 },
];

const CustomXAxisTick = ({ x, y, payload, index }) => {
  const data = dataSemanas[index];
  const prevData = index > 0 ? dataSemanas[index - 1] : null;
  const isFirstOfMonth = !prevData || prevData.mes !== data.mes;
  
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Separator line for months */}
      {isFirstOfMonth && index !== 0 && (
        <line x1={-15} y1={0} x2={-15} y2={30} stroke="var(--border)" strokeDasharray="2 2" />
      )}
      {/* Week Number */}
      <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--foreground)" fontSize={11}>
        {data.num}
      </text>
      {/* Month Name */}
      {isFirstOfMonth && (
        <text x={5} y={0} dy={26} textAnchor="start" fill="var(--muted-foreground)" fontSize={11} className="capitalize">
          {data.mes}
        </text>
      )}
    </g>
  );
};

const ExpandableRow = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = row.pozos && row.pozos.length > 0;

  const getKwBoColor = (val) => {
    if (val < 2.0) return 'text-emerald-500 font-bold';
    if (val > 2.5) return 'text-red-500 font-bold';
    return 'font-bold';
  };

  return (
    <>
      <tr 
        className={`border-b border-[var(--border)]/50 transition-colors ${hasChildren ? 'cursor-pointer hover:bg-[var(--secondary)]/30' : ''}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <td className="px-5 py-3.5 text-left flex items-center gap-2">
          {hasChildren ? (
            isOpen ? <ChevronDown size={14} className="text-[var(--muted-foreground)]" /> : <ChevronRight size={14} className="text-[var(--muted-foreground)]" />
          ) : (
            <div className="w-[14px]"></div>
          )}
          <span className="font-medium">{row.facilidad}</span>
        </td>
        <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.campo}</td>
        <td className="px-5 py-3.5 text-left">{row.demanda}</td>
        <td className="px-5 py-3.5 text-left">{row.bopd}</td>
        <td className="px-5 py-3.5 text-left">{row.bfpd}</td>
        <td className={`px-5 py-3.5 text-left ${getKwBoColor(row.kwbo)}`}>{row.kwbo.toFixed(2)}</td>
      </tr>
      {isOpen && hasChildren && row.pozos.map((pozo, idx) => (
        <tr key={idx} className="bg-[var(--sidebar)]/30 border-b border-[var(--border)]/30 text-[13px]">
          <td className="px-5 py-2.5 text-left pl-10 text-[var(--muted-foreground)]">{pozo.facilidad}</td>
          <td className="px-5 py-2.5 text-left text-[var(--muted-foreground)]">{pozo.campo}</td>
          <td className="px-5 py-2.5 text-left text-[var(--muted-foreground)]">{pozo.demanda}</td>
          <td className="px-5 py-2.5 text-left text-[var(--muted-foreground)]">{pozo.bopd}</td>
          <td className="px-5 py-2.5 text-left text-[var(--muted-foreground)]">{pozo.bfpd}</td>
          <td className={`px-5 py-2.5 text-left ${getKwBoColor(pozo.kwbo)}`}>{pozo.kwbo.toFixed(2)}</td>
        </tr>
      ))}
    </>
  );
};

const Eficiencia = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* KPIs - 5 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <KPICard 
          label="Eficiencia Semanal" 
          value="2.3" 
          unit="kW/Bo" 
          trend={1} 
          trendValue="↓0.1 kW/Bo" 
          subtext="vs. semana anterior" 
          accent 
        />
        <KPICard 
          label="Consumo Energía Semanal" 
          value="45,210" 
          unit="kW" 
          trend={-1} 
          trendValue="↑1.2%" 
          subtext="vs. semana anterior" 
        />
        <KPICard 
          label="Producción Semanal" 
          value="19,650" 
          unit="Bo" 
          trend={1} 
          trendValue="↑4.5%" 
          subtext="vs. semana anterior" 
        />
        
        {/* Tarjeta Doble CO2 */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-4 h-4 text-red-500" />
            <h3 className="text-[13px] font-medium text-[var(--muted-foreground)] tracking-wide">Huella de carbono, Emisiones de CO2</h3>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">1,245<span className="text-sm font-normal text-[var(--muted-foreground)] ml-1">t</span></div>
              <div className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wider mt-1">Interconectados</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[var(--foreground)]">382<span className="text-sm font-normal text-[var(--muted-foreground)] ml-1">t</span></div>
              <div className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wider mt-1">Campos Menores</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Avance semanal</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Semana / Año</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSemanas} margin={{ bottom: 20 }}>
                <defs>
                  <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C41230" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C41230" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="num" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={[0, 20]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="meta" name="Esperada" stroke="#4A9EE0" strokeWidth={1.5} strokeDasharray="4 3" fill="none" />
                <Area type="monotone" dataKey="real" name="Real" stroke="#C41230" strokeWidth={2} fill="url(#gradReal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Eficiencia por campo</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">kW/Bo (Menor es mejor)</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCampos} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis dataKey="campo" type="category" width={70} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} cursor={{fill: 'rgba(128,128,128,0.1)'}} />
                <Bar dataKey="valor" radius={[0, 2, 2, 0]} barSize={20}>
                  {dataCampos.map((entry, index) => {
                    const isBest = entry.valor === Math.min(...dataCampos.map(d => d.valor));
                    return <Cell key={`cell-${index}`} fill={isBest ? '#C41230' : 'rgba(196, 18, 48, 0.3)'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla Jerárquica */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center gap-2">
          <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[var(--foreground)]">Eficiencia por facilidad</h3>
          <span className="text-[12px] text-[var(--muted-foreground)]">— Clic en una fila para ver pozos</span>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--sidebar)] border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Facilidad</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Campo</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Demanda (kW)</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">BOPD</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">BFPD</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">kW/BO</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <ExpandableRow key={i} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Eficiencia;
