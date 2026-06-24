import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Dynamic title based on route
  let title = "Dashboard";
  let subtitle = "Gestión inteligente de energía";
  
  if (isHome) {
    title = "Panel Principal";
    subtitle = "Seleccione un módulo de operaciones";
  } else if (location.pathname.includes('/eficiencia')) {
    title = "Eficiencia Operacional";
    subtitle = "Métricas de eficiencia global mensual";
  } else if (location.pathname.includes('/despacho')) {
    title = "Despacho Energético";
    subtitle = "Balance de fuentes de generación y distribución";
  } else if (location.pathname.includes('/pronostico')) {
    title = "Pronóstico y Demanda";
    subtitle = "Predicción de comportamiento y mercado";
  } else if (location.pathname.includes('/confiabilidad')) {
    title = "Confiabilidad del Sistema";
    subtitle = "Monitoreo de equipos e incidencias";
  } else if (location.pathname.includes('/fallas')) {
    title = "Gestión de Fallas";
    subtitle = "Reporte analítico de incidencias y paradas";
  } else if (location.pathname.includes('/vulnerabilidades')) {
    title = "Plan de Mantenimiento";
    subtitle = "Seguimiento a vulnerabilidades y mantenimiento preventivo";
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden relative ${isHome ? 'bg-black' : 'bg-[var(--background)]'}`}>
      
      {/* Fondo de pantalla global para la página Inicio */}
      {isHome && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{ backgroundImage: 'url("./Video-Llanos-34.jpg.webp")' }}
          ></div>
          <div className="absolute inset-0 bg-black/75 pointer-events-none" />
        </div>
      )}
      
      {/* Capa de interfaz z-10 */}
      <div className="relative z-10 flex w-full h-full">
        {!isHome && <Sidebar />}
        <main className="flex-1 flex flex-col min-w-0">
          {!isHome && <Topbar title={title} subtitle={subtitle} />}
          <div className={`flex-1 overflow-y-auto ${isHome ? '' : 'p-8'}`}>
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default Layout;
