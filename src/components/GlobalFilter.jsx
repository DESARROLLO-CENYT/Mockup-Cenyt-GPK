import React from 'react';
import { Calendar, Map, Layers, Target } from 'lucide-react';
import MultiSelect from './MultiSelect';

const GlobalFilter = () => {

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const monthOptions = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: `Día ${i + 1}`
  }));

  const campoOptions = [
    { value: 'jacana', label: 'Jacana' },
    { value: 'tigana', label: 'Tigana' },
    { value: 'tua', label: 'Tua' },
    { value: 'menores', label: 'Menores' }
  ];

  const clusterOptions = [
    { value: 'cluster1', label: 'Cluster 1' },
    { value: 'cluster2', label: 'Cluster 2' },
    { value: 'cluster3', label: 'Cluster 3' }
  ];

  const pozoOptions = [
    { value: 'pz101', label: 'PZ-101' },
    { value: 'pz102', label: 'PZ-102' },
    { value: 'pz201', label: 'PZ-201' }
  ];

  return (
    <div className="hidden lg:flex items-center gap-2">
      {/* Date Filters */}
      <div className="flex items-center gap-1 bg-[var(--background)] rounded-md border border-[var(--border)] p-0.5">
        <MultiSelect 
          options={yearOptions} 
          placeholder="Año" 
          icon={Calendar} 
          widthClass="w-[75px] border-transparent" 
        />
        <div className="w-px h-4 bg-[var(--border)]"></div>
        <MultiSelect 
          options={monthOptions} 
          placeholder="Mes" 
          widthClass="w-[75px] border-transparent" 
        />
        <div className="w-px h-4 bg-[var(--border)]"></div>
        <MultiSelect 
          options={dayOptions} 
          placeholder="Día" 
          widthClass="w-[75px] border-transparent" 
        />
      </div>

      <div className="w-px h-5 bg-[var(--border)] mx-1"></div>

      {/* Topological Filters */}
      <div className="flex items-center gap-1 bg-[var(--background)] rounded-md border border-[var(--border)] p-0.5">
        <MultiSelect 
          options={campoOptions} 
          placeholder="Campo" 
          icon={Map} 
          widthClass="w-[95px] border-transparent" 
        />
        <div className="w-px h-4 bg-[var(--border)]"></div>
        <MultiSelect 
          options={clusterOptions} 
          placeholder="Cluster" 
          icon={Layers} 
          widthClass="w-[95px] border-transparent" 
        />
        <div className="w-px h-4 bg-[var(--border)]"></div>
        <MultiSelect 
          options={pozoOptions} 
          placeholder="Pozo" 
          icon={Target} 
          widthClass="w-[90px] border-transparent" 
        />
      </div>
    </div>
  );
};

export default GlobalFilter;
