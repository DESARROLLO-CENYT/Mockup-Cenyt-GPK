import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Truck, TrendingUp, Shield, Sun, Moon, AlertTriangle, Activity, Wrench } from 'lucide-react';

const Sidebar = () => {
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
    { id: 'despacho', label: 'Despacho', icon: <Truck size={22} className="shrink-0" />, path: '/despacho' },
    { id: 'pronostico', label: 'Pronóstico', icon: <TrendingUp size={22} className="shrink-0" />, path: '/pronostico' },
    { id: 'confiabilidad', label: 'Confiabilidad', icon: <Shield size={22} className="shrink-0" />, path: '/confiabilidad' },
    { id: 'fallas', label: 'Fallas', icon: <AlertTriangle size={22} className="shrink-0" />, path: '/fallas' },
    { id: 'vulnerabilidades', label: 'Mantenimiento', icon: <Wrench size={22} className="shrink-0" />, path: '/vulnerabilidades' },
  ];

  const asideBg = isHome 
    ? 'bg-transparent border-transparent' 
    : 'bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] shadow-[4px_0_24px_rgba(0,0,0,0.02)] hover:shadow-[8px_0_32px_rgba(0,0,0,0.08)] dark:shadow-none';

  return (
    <aside className={`relative z-50 h-full shrink-0 w-[80px] hover:w-[240px] transition-all duration-300 ease-in-out flex flex-col group overflow-hidden ${asideBg}`}>
        
        <Link to="/" className={`h-[72px] w-full shrink-0 border-b flex justify-center items-center overflow-hidden px-5 py-4 ${isHome ? 'border-transparent' : 'border-[var(--sidebar-border)]'}`}>
          <img 
            src="./Logo GEOPARK_200.png" 
            alt="GeoPark Nav" 
            className={`w-full h-full object-contain transition-all duration-300 ease-in-out brightness-0 ${forceDarkText ? 'invert' : ''}`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <Activity size={24} style={{ display: 'none' }} className={`shrink-0 ${forceDarkText ? 'text-white' : 'text-[var(--primary)]'}`} />
        </Link>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2">
          <div className={`px-7 mb-2 text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isHome ? 'text-gray-300' : 'text-[var(--muted-foreground)]'}`}>
            Procesos
          </div>
          {navItems.map((item) => {
            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.includes(item.path);
              
            // In Home page, inactive links should be white/transparent to look good on the background
            const inactiveLinkColor = isHome 
              ? 'text-gray-300 hover:bg-white/10 hover:text-white'
              : 'text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--foreground)]';

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center mx-4 px-3 py-3 rounded-xl text-sm transition-colors relative ${
                  isActive 
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-medium shadow-md shadow-[var(--primary)]/20' 
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
        <div className={`p-4 shrink-0 border-t flex flex-col gap-4 items-center group-hover:items-stretch ${isHome ? 'border-transparent' : 'border-[var(--sidebar-border)]'}`}>
          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-center p-3 group-hover:py-2 border border-transparent rounded-xl text-sm transition-all cursor-pointer ${
              isHome 
                ? 'text-white hover:bg-white/10 group-hover:border-white/20' 
                : 'text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] group-hover:border-[var(--border)]'
            }`}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDark ? <Sun size={22} className="shrink-0" /> : <Moon size={22} className="shrink-0" />}
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap w-0 group-hover:w-auto">
              {isDark ? 'Modo claro' : 'Modo oscuro'}
            </span>
          </button>
          <div className={`text-[10px] font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden h-0 group-hover:h-auto ${isHome ? 'text-gray-400' : 'text-[var(--muted-foreground)]'}`}>
            v2.4.1 Oct2024
          </div>
        </div>
      </aside>
  );
};

export default Sidebar;
