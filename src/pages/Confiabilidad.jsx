import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';

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

const dataSemanal = {};
['Bbls diferidos', 'MTBF', 'MTTR', 'SAIFI', 'Disponibilidad', 'Eventos', 'Pozos Afectados'].forEach(ind => {
  dataSemanal[ind] = semanasBase.map(s => {
    let val = 0;
    const i = s.num;
    switch(ind) {
      case 'Bbls diferidos': {
        val = Math.round(100 + Math.sin(i) * 50 + i * 10);
        const valRed = Math.round(val * 0.4); // 40% asociated with network events
        const valOtros = val - valRed;
        return { num: s.num, mes: s.mes, value: val, red: valRed, otros: valOtros };
      }
      case 'MTBF': val = Math.round(100 + Math.cos(i) * 20); break;
      case 'MTTR': val = parseFloat((4 + Math.sin(i) * 1.5).toFixed(1)); break;
      case 'SAIFI': val = parseFloat((2 + Math.cos(i/2) * 0.5).toFixed(1)); break;
      case 'Disponibilidad': val = parseFloat((97 + Math.sin(i) * 2).toFixed(1)); break;
      case 'Eventos': {
        val = Math.round(3 + Math.sin(i) * 2);
        const valRed = Math.round(val * 0.4);
        return { num: s.num, mes: s.mes, value: val, red: valRed };
      }
      case 'Pozos Afectados': {
        val = Math.round(2 + Math.cos(i) * 1.5);
        const valRed = Math.round(val * 0.5);
        return { num: s.num, mes: s.mes, value: val, red: valRed };
      }
    }
    return { num: s.num, mes: s.mes, value: val };
  });
});

const CustomXAxisTick = ({ x, y, payload, index, currentData }) => {
  const data = currentData[index];
  const prevData = index > 0 ? currentData[index - 1] : null;
  const isFirstOfMonth = !prevData || prevData.mes !== data.mes;

  let monthStartIndex = index;
  while (monthStartIndex > 0 && currentData[monthStartIndex - 1].mes === data.mes) {
    monthStartIndex--;
  }
  let monthEndIndex = index;
  while (monthEndIndex < currentData.length - 1 && currentData[monthEndIndex + 1].mes === data.mes) {
    monthEndIndex++;
  }
  const isMiddleOfMonth = index === Math.floor((monthStartIndex + monthEndIndex) / 2);

  return (
    <g transform={`translate(${x},${y})`}>
      {isFirstOfMonth && index !== 0 && (
        <line x1={-20} y1={0} x2={-20} y2={30} stroke="var(--border)" strokeDasharray="2 2" />
      )}
      <text x={0} y={0} dy={12} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11}>
        {data.num}
      </text>
      {isMiddleOfMonth && (
        <text x={0} y={0} dy={26} textAnchor="middle" fill="var(--muted-foreground)" fontSize={11} className="capitalize">
          {data.mes}
        </text>
      )}
    </g>
  );
};

const Confiabilidad = () => {
  const [indicator, setIndicator] = useState('SAIFI');
  const [expandedRow, setExpandedRow] = useState(null);
  
  const toggleRow = (i) => {
    setExpandedRow(expandedRow === i ? null : i);
  };

  const currentData = dataSemanal[indicator];

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Disponibilidad" value="98.5" unit="%" trend={1} trendValue="↑0.2%" subtext="Última semana" />
        <KPICard label="MTBF Promedio" value="117.5" unit="hrs" trend={1} trendValue="↑12%" subtext="Última semana" />
        <KPICard label="SAIFI" value="2.4" unit="" trend={-1} trendValue="↓0.2" subtext="Última semana" />
        <KPICard label="Cantidad Eventos" value="2 / 4" unit="" trend={-1} trendValue="↓4" subtext="Última sem. (Red / Totales)" />
        <KPICard 
          label="Bbls Diferidos" 
          value="128 / 320" 
          unit="Bbls" 
          trend={-1} 
          trendValue="↓180" 
          subtext="Última sem. (Red / Totales)" 
          accent 
        />
        <KPICard label="Pozos Afectados" value="1 / 4" unit="Pozos" trend={-1} trendValue="↓2" subtext="Última sem. (Red / Totales)" />
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
              <option value="Pozos Afectados">Pozos Afectados</option>
            </select>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Visualización de la tendencia histórica para el indicador seleccionado (Bbls diferidos, MTBF, MTTR, SAIFI, Disponibilidad, Eventos o Pozos Afectados).
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px] p-5 pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#963133" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#963133" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOtros" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e5a8a9" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#e5a8a9" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#963133" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#963133" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="num" axisLine={false} tickLine={false} tick={<CustomXAxisTick currentData={currentData} />} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={indicator === 'Disponibilidad' ? [90, 100] : ['auto', 'auto']} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Bbls de Red' || name === 'Total Bbls' || name === 'Eventos de Red' || name === 'Total Eventos' || name === 'Pozos de Red' || name === 'Total Pozos') {
                    return [formatTooltip(value), name];
                  }
                  return [formatTooltip(value), indicator];
                }}
                contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "black", fontSize: "12px" }}
                itemStyle={{ color: "black", fontSize: "13px" }}
                labelStyle={{ color: "black" }}
              />
              {indicator === 'Bbls diferidos' ? (
                <>
                  <Area type="monotone" dataKey="value" name="Total Bbls" stroke="#963133" strokeWidth={2.5} fill="url(#colorDynamic)" dot={{ r: 3, fill: "#963133" }} activeDot={{ r: 6, fill: "#963133" }} />
                  <Line type="monotone" dataKey="red" name="Bbls de Red" stroke="#e5a8a9" strokeWidth={2.5} dot={{ r: 3, fill: '#e5a8a9' }} activeDot={{ r: 6 }} />
                </>
              ) : indicator === 'Eventos' ? (
                <>
                  <Area type="monotone" dataKey="value" name="Total Eventos" stroke="#963133" strokeWidth={2.5} fill="url(#colorDynamic)" dot={{ r: 3, fill: "#963133" }} activeDot={{ r: 6, fill: "#963133" }} />
                  <Line type="monotone" dataKey="red" name="Eventos de Red" stroke="#e5a8a9" strokeWidth={2.5} dot={{ r: 3, fill: '#e5a8a9' }} activeDot={{ r: 6 }} />
                </>
              ) : indicator === 'Pozos Afectados' ? (
                <>
                  <Area type="monotone" dataKey="value" name="Total Pozos" stroke="#963133" strokeWidth={2.5} fill="url(#colorDynamic)" dot={{ r: 3, fill: "#963133" }} activeDot={{ r: 6, fill: "#963133" }} />
                  <Line type="monotone" dataKey="red" name="Pozos de Red" stroke="#e5a8a9" strokeWidth={2.5} dot={{ r: 3, fill: '#e5a8a9' }} activeDot={{ r: 6 }} />
                </>
              ) : (
                <Area type="monotone" dataKey="value" stroke="#963133" strokeWidth={2.5} fill="url(#colorDynamic)" dot={{ r: 3, fill: "#963133" }} activeDot={{ r: 6, fill: "#963133" }} />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumen de Eventos */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="text-[13px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
            Resumen de Eventos
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[12px] bg-red-400/10 text-red-400 px-3 py-1 rounded-full font-bold">4 Eventos (Última semana)</span>
            <div className="relative group">
              <HelpCircle size={14} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-help transition-colors" />
              <div className="absolute right-0 top-6 w-56 p-2.5 bg-[var(--popover)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] text-[var(--foreground)] pointer-events-none leading-relaxed font-normal normal-case">
                Listado de los eventos de la última semana, incluyendo ubicación, causa, barriles diferidos y pozos afectados.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead className="border-b border-[var(--border)] bg-[var(--background)]">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Fecha</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Ubicación</th>
                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Causa</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Diferida (Bbls)</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">Pozos Afectados</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  fecha: '25 Jun 2026, 14:30', 
                  ubicacion: 'Jacana', 
                  causa: 'Falla Eléctrica (Red)', 
                  diferida: '120', 
                  pozos: '2',
                  detalles: [
                    { cluster: 'Jacana 1', pozo: 'PZ-101', bbls: '70', estado: 'Restablecido' },
                    { cluster: 'Jacana 2', pozo: 'PZ-102', bbls: '50', estado: 'Restablecido' }
                  ]
                },
                { 
                  fecha: '23 Jun 2026, 09:15', 
                  ubicacion: 'Tigana', 
                  causa: 'Mantenimiento Preventivo', 
                  diferida: '45', 
                  pozos: '1',
                  detalles: [
                    { cluster: 'Tigana 1', pozo: 'PZ-201', bbls: '45', estado: 'Restablecido' }
                  ]
                },
                { 
                  fecha: '21 Jun 2026, 18:45', 
                  ubicacion: 'Tua', 
                  causa: 'Falla Mecánica', 
                  diferida: '95', 
                  pozos: '1',
                  detalles: [
                    { cluster: 'Tua 3', pozo: 'PZ-305', bbls: '95', estado: 'En Reparación' }
                  ]
                },
                { 
                  fecha: '19 Jun 2026, 02:10', 
                  ubicacion: 'Menores', 
                  causa: 'Corte de Energía (Red)', 
                  diferida: '60', 
                  pozos: '1',
                  detalles: [
                    { cluster: 'Menores 2', pozo: 'PZ-412', bbls: '60', estado: 'Restablecido' }
                  ]
                },
              ].map((row, i) => (
                <React.Fragment key={i}>
                  <tr onClick={() => toggleRow(i)} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors cursor-pointer group">
                    <td className="px-5 py-3.5 font-bold text-left text-[var(--foreground)] flex items-center gap-2">
                      {expandedRow === i ? <ChevronDown size={14} className="text-[var(--primary)]" /> : <ChevronRight size={14} className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />}
                      {row.fecha}
                    </td>
                    <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.ubicacion}</td>
                    <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.causa}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-[#C41230] dark:text-red-400">{row.diferida}</td>
                    <td className="px-5 py-3.5 text-right font-medium text-[var(--foreground)]">{row.pozos}</td>
                  </tr>
                  {expandedRow === i && (
                    <tr className="bg-[var(--secondary)]/10 border-b border-[var(--border)]/50">
                      <td colSpan="5" className="px-10 py-4">
                        <div className="bg-[var(--background)] border border-[var(--border)] rounded-md p-3 text-[12.5px]">
                          <div className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider">
                            <span>Desglose de Afectación</span>
                          </div>
                          <table className="w-full">
                            <thead>
                              <tr className="text-[var(--muted-foreground)] border-b border-[var(--border)]">
                                <th className="text-left font-semibold pb-2">Cluster</th>
                                <th className="text-left font-semibold pb-2">Pozo</th>
                                <th className="text-right font-semibold pb-2">Bbls Diferidos</th>
                                <th className="text-left pl-6 font-semibold pb-2">Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.detalles.map((detalle, idx) => (
                                <tr key={idx} className="border-b border-[var(--border)]/30 last:border-0">
                                  <td className="py-2">{detalle.cluster}</td>
                                  <td className="py-2 font-medium">{detalle.pozo}</td>
                                  <td className="py-2 text-right text-[#C41230] dark:text-red-400 font-semibold">{detalle.bbls}</td>
                                  <td className="py-2 pl-6">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${detalle.estado === 'Restablecido' ? 'bg-emerald-400/10 text-emerald-500' : 'bg-amber-400/10 text-amber-500'}`}>
                                      {detalle.estado}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Confiabilidad;
