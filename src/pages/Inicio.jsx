import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Truck, TrendingUp, Shield, AlertTriangle, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

const Inicio = () => {
  const scrollContainerRef = useRef(null);

  const cards = [
    {
      title: 'Eficiencia Operacional',
      description: 'Monitoreo de eficiencia global, estatus de pozos, energía y metas mensuales.',
      icon: <Zap size={32} className="text-[#C41230]" />,
      path: '/eficiencia',
      color: 'hover:border-[#C41230]/50'
    },
    {
      title: 'Despacho y Logística',
      description: 'Control de volumen, programación, y estado del transporte en tiempo real.',
      icon: <Truck size={32} className="text-sky-500" />,
      path: '/despacho',
      color: 'hover:border-sky-500/50'
    },
    {
      title: 'Confiabilidad del Sistema',
      description: 'Análisis de Uptime, métricas de fallas (MTBF/MTTR) y estado de equipos.',
      icon: <Shield size={32} className="text-emerald-500" />,
      path: '/confiabilidad',
      color: 'hover:border-emerald-500/50'
    },
    {
      title: 'Reporte de Fallas',
      description: 'Análisis detallado en PowerBI',
      icon: <AlertTriangle size={32} className="text-red-400" />,
      path: '/fallas',
      color: 'hover:border-red-500/50'
    },
    {
      title: 'Vulnerabilidades y Mantenimiento',
      description: 'Seguimiento detallado en PowerBI',
      icon: <Wrench size={32} className="text-indigo-400" />,
      path: '/vulnerabilidades',
      color: 'hover:border-indigo-500/50'
    },
    {
      title: 'Pronóstico y Demanda',
      description: 'Predicción de comportamiento, proyecciones ML y distribución por mercado.',
      icon: <TrendingUp size={32} className="text-amber-500" />,
      path: '/pronostico',
      color: 'hover:border-amber-500/50'
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-[calc(100vh-160px)] py-8 w-full">
      
      {/* Logo Principal GeoPark */}
      <div className="w-full max-w-lg px-6 flex justify-center mb-2">
        <img 
          src="/Logo GEOPARK_2400.png" 
          alt="Logo GeoPark Principal" 
          className="w-full h-auto max-h-[140px] object-contain transition-all drop-shadow-xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div style={{ display: 'none' }} className="text-4xl md:text-5xl font-bold text-white text-center tracking-tighter">
          GeoPark Center
        </div>
      </div>

      <div className="text-center mb-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 drop-shadow-md">
          Gestión de Energía Inteligente
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base drop-shadow">
          Desliza para ver los módulos disponibles y accede al panel interactivo de métricas y datos en tiempo real.
        </p>
      </div>
      
      {/* Carrusel de Tarjetas */}
      <div className="relative w-full max-w-5xl px-4 md:px-12">
        
        {/* Botón Izquierdo */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg hover:bg-[var(--secondary)] transition-colors hidden md:flex items-center justify-center text-[var(--foreground)]"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Contenedor con Scroll Snap */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, idx) => (
            <Link
              key={idx}
              to={card.path}
              className={`flex-none w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center flex flex-col gap-4 p-8 rounded-xl bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] transition-all duration-300 ${card.color} hover:bg-[var(--card)] hover:-translate-y-1 hover:shadow-xl group cursor-pointer`}
            >
              <div className="p-4 rounded-full bg-[var(--background)] w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-[var(--border)]">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[var(--muted-foreground)] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón Derecho */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg hover:bg-[var(--secondary)] transition-colors hidden md:flex items-center justify-center text-[var(--foreground)]"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
};

export default Inicio;
