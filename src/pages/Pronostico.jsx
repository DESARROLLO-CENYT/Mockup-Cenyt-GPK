import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dataDiarioCostos = [
  { hora: '12:00 a.m.', total: 600, solar: 0, gas: 240, diesel: 0, interconectada: 400, presupuesto: 600, fijoEnel: 300 },
  { hora: '03:00 a.m.', total: 550, solar: 0, gas: 240, diesel: 0, interconectada: 300, presupuesto: 600, fijoEnel: 300 },
  { hora: '06:00 a.m.', total: 550, solar: 0, gas: 240, diesel: 0, interconectada: 300, presupuesto: 600, fijoEnel: 300 },
  { hora: '09:00 a.m.', total: 500, solar: 100, gas: 240, diesel: 0, interconectada: 250, presupuesto: 600, fijoEnel: 300 },
  { hora: '12:00 p.m.', total: 500, solar: 100, gas: 240, diesel: 0, interconectada: 250, presupuesto: 600, fijoEnel: 300 },
  { hora: '03:00 p.m.', total: 520, solar: 80, gas: 240, diesel: 0, interconectada: 280, presupuesto: 600, fijoEnel: 300 },
  { hora: '06:00 p.m.', total: 650, solar: 0, gas: 240, diesel: 0, interconectada: 450, presupuesto: 600, fijoEnel: 300 },
  { hora: '09:00 p.m.', total: 800, solar: 0, gas: 240, diesel: 100, interconectada: 700, presupuesto: 600, fijoEnel: 300 },
  { hora: '11:59 p.m.', total: 600, solar: 0, gas: 240, diesel: 0, interconectada: 400, presupuesto: 600, fijoEnel: 300 },
];

const dataPronostico = [
  { dia: '10', real: 51000, forecast: 51200 },
  { dia: '11', real: 51500, forecast: 51800 },
  { dia: '12', real: 52300, forecast: 52000 },
  { dia: '13', real: 52100, forecast: 52500 },
  { dia: '14', real: null, forecast: 52800 },
  { dia: '15', real: null, forecast: 53100 },
  { dia: '16', real: null, forecast: 53500 },
];

const Pronostico = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Demanda Actual" value="52,300" unit="bbl/d" trend={1} trendValue="↑1.8%" subtext="Promedio móvil 7d" accent />
        <KPICard label="Pronóstico 7d" value="53,500" unit="bbl/d" trend={1} trendValue="↑2.2%" subtext="Proyección ML" />
        <KPICard label="Precisión" value="94.5" unit="%" trend={0} trendValue="=" subtext="Margen de error 5.5%" />
        <KPICard label="Contratos Act." value="24" unit="" trend={1} trendValue="↑2" subtext="Renovaciones este mes" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Demanda real vs. forecast</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Volumen diario bbl/d</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPronostico} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} dx={-10} domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
                <Line type="monotone" dataKey="real" stroke="#C41230" strokeWidth={2} dot={{ r: 4, fill: "#C41230" }} />
                <Line type="monotone" dataKey="forecast" stroke="#4A9EE0" strokeWidth={1.5} strokeDasharray="5 3" dot={{ r: 3 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Distribución por Mercado</h3>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-6">Demanda agregada por segmento</p>
          
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { label: 'Mercado Interno', pct: 45, color: '#C41230', val: '23,535' },
              { label: 'Exportación', pct: 35, color: '#4A9EE0', val: '18,305' },
              { label: 'Industrial', pct: 20, color: '#E8A838', val: '10,460' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[12px] font-medium text-[var(--foreground)]">{item.label}</span>
                  <span className="text-[12px] text-[var(--muted-foreground)]">{item.val} bbl</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
                  <div style={{ width: `${item.pct}%`, backgroundColor: item.color }} className="h-full rounded-full transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-[14px] font-medium text-[var(--foreground)]">Contratos y Clientes Principales</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Cliente</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Contrato</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Volumen</th>
                <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Cumplimiento</th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider font-medium text-[var(--muted-foreground)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cliente: 'Refinería Nacional', contrato: 'CT-2024-A', vol: '15,000', cump: '100%', estado: 'Operativo' },
                { cliente: 'Exportadora Global', contrato: 'CT-2024-B', vol: '12,500', cump: '95%', estado: 'Atención' },
                { cliente: 'Industrias Sur', contrato: 'CT-2024-C', vol: '8,000', cump: '82%', estado: 'Crítico' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--secondary)]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-left">{row.cliente}</td>
                  <td className="px-5 py-3.5 text-left text-[var(--muted-foreground)]">{row.contrato}</td>
                  <td className="px-5 py-3.5 text-right">{row.vol}</td>
                  <td className="px-5 py-3.5 text-right text-[var(--muted-foreground)]">{row.cump}</td>
                  <td className="px-5 py-3.5 text-left"><StatusBadge status={row.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de Costos Diario (Movido desde Despacho) */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm flex flex-col mt-6">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h3 className="text-[14px] font-medium text-[var(--foreground)] uppercase tracking-widest text-center">
            Costos de Energía por Fuentes de Generación
          </h3>
        </div>
        <div style={{ width: '100%', height: 300 }} className="p-4 pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataDiarioCostos} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
              <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} dy={10} interval="preserveStartEnd" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(val) => `$${val}`} />
              <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--foreground)", fontSize: "12px" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              <Line type="monotone" dataKey="total" name="TOTAL" stroke="#900020" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="solar" name="SOLAR" stroke="#EAB308" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="gas" name="GAS" stroke="#16A34A" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="diesel" name="DIESEL" stroke="#737373" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="interconectada" name="INTERCONECTADA" stroke="#38BDF8" strokeWidth={2} dot={false} />
              <Line type="stepAfter" dataKey="presupuesto" name="PRESUPUESTO" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fijoEnel" name="FIJO ENEL" stroke="#F97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla Comparativa Diaria (Movida desde Despacho) */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-sm mt-6">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[13.5px] text-left">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="px-6 py-4 bg-[var(--background)]"></th>
                <th className="px-6 py-4 font-bold text-[12px] text-[#C41230] text-center tracking-wider bg-[var(--background)] border-b-2 border-transparent">
                  <div className="flex flex-col items-center">
                    <span>Despacho Energía</span>
                    <span>Día Siguiente</span>
                  </div>
                </th>
                <th className="px-6 py-4 font-bold text-[12px] text-[#C41230] text-center tracking-wider bg-[var(--background)] border-b-2 border-transparent">
                  <div className="flex flex-col items-center">
                    <span>Despacho Energía</span>
                    <span>Día Anterior</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Costo Total (COP kWh)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">710,6</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">640,2</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Total Ll34 (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">68.774</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">69.455</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Interconectada (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">50.894</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">51.995</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">
                  Gen. Interconectada (kW)<br/>
                  <span className="text-[11px] font-normal text-[var(--muted-foreground)]">Precio Fijo</span>
                </td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">2.500</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">2.500</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Gas (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">14.521</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">14.192</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Gas Propio (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">859</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">759</td>
              </tr>
              <tr className="border-b border-[var(--border)]/50">
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Solar (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">0</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">0</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-[var(--foreground)]">Gen. Diesel (kW)</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">0</td>
                <td className="px-6 py-3.5 text-center text-[var(--foreground)]">9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pronostico;
