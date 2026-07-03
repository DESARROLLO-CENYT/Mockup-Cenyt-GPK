import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, UtilityPole, TrendingUp, Shield, Sun, Moon, AlertTriangle, Activity, Wrench, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  
  const isHome = location.pathname === '/';
  // Si estamos en home, forzamos texto blanco sin importar si es claro u oscuro el sistema.
  const forceDarkText = isDark || isHome;

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { id: 'eficiencia', label: 'Eficiencia', icon: <Zap size={22} className="shrink-0" />, path: '/eficiencia' },
    { id: 'despacho', label: 'Despacho', icon: <Activity size={22} className="shrink-0" />, path: '/despacho' },
    { id: 'confiabilidad', label: 'Confiabilidad', icon: <Shield size={22} className="shrink-0" />, path: '/confiabilidad' },
    { id: 'fallas', label: 'Fallas', icon: <AlertTriangle size={22} className="shrink-0" />, path: '/fallas' },
    { id: 'pronostico', label: 'Pronóstico', icon: <TrendingUp size={22} className="shrink-0" />, path: '/pronostico' },
    { id: 'parex', label: 'Parex', icon: <UtilityPole size={22} className="shrink-0" />, path: '/parex' },
  ];

  const asideBg = isHome 
    ? 'bg-transparent border-transparent' 
    : 'bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] shadow-[4px_0_24px_rgba(0,0,0,0.02)] hover:shadow-[8px_0_32px_rgba(0,0,0,0.08)] dark:shadow-none';

  return (
    <aside className={`relative z-50 h-full shrink-0 w-[80px] hover:w-[240px] transition-all duration-300 ease-in-out flex flex-col group overflow-hidden ${asideBg}`}>
        
        <Link to="/" className={`h-[72px] w-full shrink-0 border-b flex justify-center items-center overflow-hidden px-5 py-4 ${isHome ? 'border-transparent' : 'border-[var(--sidebar-border)]'}`}>
          <img 
            src="./Logo-GEOPARK_200.svg" 
            alt="GeoPark Nav" 
            className={`w-full h-full object-contain transition-all duration-300 ease-in-out ${forceDarkText ? 'invert brightness-0' : ''}`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <Activity size={24} style={{ display: 'none' }} className={`shrink-0 ${forceDarkText ? 'text-white' : 'text-[var(--primary)]'}`} />
        </Link>

        {/* Navigation */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden py-6 flex flex-col gap-2 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className={`px-7 mb-2 text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isHome ? 'text-gray-300' : 'text-[var(--muted-foreground)]'}`}>
            Procesos
          </div>
          {navItems.map((item) => {
            if (item.disabled) {
              return (
                <div
                  key={item.id}
                  className={`flex items-center mx-4 px-3 py-3 rounded-xl text-sm transition-colors relative opacity-50 cursor-not-allowed ${
                    isHome ? 'text-gray-300' : 'text-[var(--muted-foreground)]'
                  }`}
                  title={`${item.label} (Próximamente)`}
                >
                  {item.icon}
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label} <span className="text-[9px] bg-[var(--border)] text-[var(--foreground)] px-1.5 py-0.5 rounded ml-2 uppercase tracking-wider font-bold">Pronto</span>
                  </span>
                </div>
              );
            }

            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.includes(item.path);
              
            // In Home page, inactive links should be white/transparent to look good on the background
            const inactiveLinkColor = isHome 
              ? 'text-gray-300 hover:bg-white/10 hover:text-white'
              : 'text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--foreground)]';

            const activeClass = item.id === 'parex'
              ? 'bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400 font-medium shadow-md shadow-green-500/20'
              : 'bg-[var(--primary)] text-[var(--primary-foreground)] font-medium shadow-md shadow-[var(--primary)]/20';

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center mx-4 px-3 py-3 rounded-xl text-sm transition-colors relative ${
                  isActive 
                    ? activeClass
                    : inactiveLinkColor
                }`}
                title={item.label}
              >
                {item.icon}
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer / Theme Toggle */}
        <div className={`p-4 shrink-0 border-t flex flex-col gap-2 items-center group-hover:items-stretch ${isHome ? 'border-transparent' : 'border-[var(--sidebar-border)]'}`}>
          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-center p-2 group-hover:py-1.5 border border-transparent rounded-xl text-xs transition-all cursor-pointer ${
              isHome 
                ? 'text-white hover:bg-white/10 group-hover:border-white/20' 
                : 'text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] group-hover:border-[var(--border)]'
            }`}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDark ? <Sun size={16} className="shrink-0" /> : <Moon size={16} className="shrink-0" />}
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-0 group-hover:w-auto">
              {isDark ? 'Modo claro' : 'Modo oscuro'}
            </span>
          </button>
          
          <button 
            onClick={onLogout}
            className={`flex items-center justify-center p-2 group-hover:py-1.5 border border-transparent rounded-xl text-xs transition-all cursor-pointer text-[#C41230] hover:bg-[#C41230]/10 hover:border-[#C41230]/20 w-full`}
            title="Cerrar sesión"
          >
            <LogOut size={16} className="shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-0 group-hover:w-auto font-medium">
              Cerrar sesión
            </span>
          </button>
          <div className={`text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden h-0 group-hover:h-auto ${isHome ? 'text-gray-400' : 'text-[var(--muted-foreground)]'}`}>
            v2.4.1 Oct2024
          </div>
        </div>
      </aside>
  );
};

export default Sidebar;
