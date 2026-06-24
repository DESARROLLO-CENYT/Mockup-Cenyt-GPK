import React from 'react';
import { useLocation } from 'react-router-dom';
import GlobalFilter from './GlobalFilter';

const Topbar = ({ title, subtitle, showFilter }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`h-[56px] shrink-0 px-8 flex items-center justify-between transition-colors duration-300 ${isHome ? 'bg-transparent border-b-transparent' : 'bg-[var(--background)] border-b border-[var(--border)]'}`}>
      <div className="flex flex-col">
        <h1 className={`text-[16px] font-semibold ${isHome ? 'text-white drop-shadow-md' : 'text-[var(--foreground)]'}`}>{title}</h1>
        {subtitle && (
          <span className={`text-[12px] hidden md:block ${isHome ? 'text-gray-200 drop-shadow' : 'text-[var(--muted-foreground)]'}`}>
            {subtitle}
          </span>
        )}
      </div>
      
      {showFilter && <GlobalFilter />}

      <div className="flex items-center gap-2">
        <span className={`text-[12px] font-medium ${isHome ? 'text-white drop-shadow' : 'text-[var(--foreground)]'}`}>En línea</span>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
      </div>
    </header>
  );
};

export default Topbar;
