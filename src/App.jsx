import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Eficiencia from './pages/Eficiencia';
import Despacho from './pages/Despacho';
import Pronostico from './pages/Pronostico';
import Confiabilidad from './pages/Confiabilidad';
import Fallas from './pages/Fallas';
import Vulnerabilidades from './pages/Vulnerabilidades';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
      <Routes>
        {/* Ruta pública para el inicio de sesión */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />
          } 
        />
        
        {/* Rutas protegidas que requieren autenticación */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Layout onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Inicio onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="eficiencia" element={<Eficiencia />} />
          <Route path="despacho" element={<Despacho />} />
          <Route path="pronostico" element={<Pronostico />} />
          <Route path="confiabilidad" element={<Confiabilidad />} />
          <Route path="fallas" element={<Fallas />} />
          <Route path="vulnerabilidades" element={<Vulnerabilidades />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
