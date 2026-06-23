import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Eficiencia from './pages/Eficiencia';
import Despacho from './pages/Despacho';
import Pronostico from './pages/Pronostico';
import Confiabilidad from './pages/Confiabilidad';
import Fallas from './pages/Fallas';
import Vulnerabilidades from './pages/Vulnerabilidades';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
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
