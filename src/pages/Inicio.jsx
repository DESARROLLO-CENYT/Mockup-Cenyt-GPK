import { Link } from 'react-router-dom';
import { Zap, UtilityPole, TrendingUp, Shield, AlertTriangle, Wrench, Activity, LogOut } from 'lucide-react';

const Inicio = ({ onLogout }) => {

  const cards = [
    {
      title: 'Eficiencia Operacional',
      description: 'Monitoreo de eficiencia global, estatus de pozos, energía y metas mensuales.',
      icon: <Zap size={24} className="text-[#963133]" />,
      path: '/eficiencia',
      color: 'hover:border-[#963133]/50'
    },
    {
      title: 'Despacho Energético',
      description: 'Asignación de energía a campos, estado de fuentes de generación y balance real vs programado.',
      icon: <Activity size={24} className="text-[#ae4247]" />,
      path: '/despacho',
      color: 'hover:border-[#ae4247]/50'
    },
    {
      title: 'Confiabilidad del Sistema',
      description: 'Análisis de Uptime, métricas de fallas (MTBF/MTTR) y estado de equipos.',
      icon: <Shield size={24} className="text-[#cb5c62]" />,
      path: '/confiabilidad',
      color: 'hover:border-[#cb5c62]/50'
    },
    {
      title: 'Reporte de Fallas',
      description: 'Análisis detallado en PowerBI',
      icon: <AlertTriangle size={24} className="text-[#5c7aa3]" />,
      path: '/fallas',
      color: 'hover:border-[#5c7aa3]/50'
    },
    {
      title: 'Vulnerabilidades y Mantenimiento',
      description: 'Seguimiento detallado en PowerBI',
      icon: <Wrench size={24} className="text-[#dc7d82]" />,
      path: '/vulnerabilidades',
      color: 'hover:border-[#dc7d82]/50'
    },
    {
      title: 'Pronóstico y Demanda',
      description: 'Predicción de comportamiento, proyecciones ML y distribución por mercado.',
      icon: <TrendingUp size={24} className="text-[#963133]" />,
      path: '/pronostico',
      color: 'hover:border-[#963133]/50'
    },
    {
      title: 'Parex',
      description: 'Seguimiento y gestión inteligente de energía para aliados.',
      icon: <UtilityPole size={24} className="text-[#ae4247]" />,
      path: '/parex',
      color: 'hover:border-[#ae4247]/50'
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-[calc(100vh-160px)] py-8 w-full relative">
      
      {/* Botón orgánico para salir en Inicio */}
      <div className="absolute top-6 right-8 z-50">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-[#C41230]/80 border border-white/10 hover:border-transparent text-white/80 hover:text-white rounded-full transition-all backdrop-blur-sm shadow-sm cursor-pointer"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
      {/* Logo Principal GeoPark */}
      <div className="w-full max-w-xl px-6 flex justify-center mb-4 relative group">
        <img 
          src="./Logo-GEOPARK_2400.svg" 
          alt="Logo GeoPark Principal" 
          className="relative z-10 w-full h-auto max-h-[110px] object-contain transition-all duration-700 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] brightness-0 invert group-hover:-translate-y-1"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div style={{ display: 'none' }} className="text-4xl md:text-5xl font-bold text-white text-center tracking-tighter">
          GeoPark Center
        </div>
      </div>

      <div className="text-center mb-8 px-4 z-10 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Gestión de Energía Inteligente
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Accede al panel interactivo de métricas y explora los datos del centro de control operacional en tiempo real.
        </p>
      </div>
      
      {/* Cuadrícula de Tarjetas (Reemplaza el Carrusel) */}
      <div className="w-full max-w-6xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {cards.map((card, idx) => {
            if (card.disabled) {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-3 p-6 rounded-2xl bg-[var(--card)]/85 backdrop-blur-md border border-[var(--border)] transition-all duration-300 opacity-90 cursor-not-allowed"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-full bg-[var(--background)] w-12 h-12 flex items-center justify-center shadow-sm border border-[var(--border)] grayscale">
                      {card.icon}
                    </div>
                    <span className="text-[10px] bg-[var(--border)] text-[var(--foreground)] px-2 py-1 rounded uppercase tracking-wider font-bold">
                      Pronto
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 mt-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] opacity-90 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground)] opacity-70 leading-relaxed flex-1 font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={idx}
                to={card.path}
                className={`flex flex-col gap-3 p-6 rounded-2xl bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] transition-all duration-300 ${card.color} hover:bg-[var(--card)] hover:-translate-y-2 hover:shadow-2xl group cursor-pointer`}
              >
                <div className="p-3 rounded-full bg-[var(--background)] w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-[var(--border)]">
                  {card.icon}
                </div>
                <div className="flex flex-col flex-1 mt-2">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <div className="mt-auto inline-flex items-center text-xs font-bold text-[var(--primary)] opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    Ir al módulo <span className="ml-2">➔</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Inicio;
