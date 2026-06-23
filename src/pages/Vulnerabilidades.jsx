import React from 'react';

const Vulnerabilidades = () => {
  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in">
      
      {/* Marco completamente transparente */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
          Seguimiento al Plan de Vulnerabilidades y Mantenimiento
        </h3>
        
        {/* Contenedor del Iframe de PowerBI sin bordes ni fondos */}
        <div className="flex-1 w-full relative bg-transparent">
          <iframe 
            title="GPK-COL-LL34-LL34-ELE-BDA-302" 
            className="absolute inset-0 w-full h-full bg-transparent"
            src="https://app.powerbi.com/view?r=eyJrIjoiNzBmNzJiZjAtMTA1NC00ODI4LTk0ZjEtN2I0ZjRmZjZmOTExIiwidCI6IjEwMDgwMjkwLTkyYTAtNGI2YS05NTUwLTI3Y2NjNzkyMGI1YiIsImMiOjR9" 
            frameBorder="0" 
            allowFullScreen={true}>
          </iframe>
        </div>
      </div>

    </div>
  );
};

export default Vulnerabilidades;
