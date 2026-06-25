<p align="center">
  <img src="./public/Logo-GEOPARK_2400.svg" alt="GeoPark Logo" width="300" />
</p>

# Dashboard Operacional — Gestión de Energía Inteligente

Este es el repositorio de la aplicación de **Gestión de Energía Inteligente** de GeoPark. El proyecto está diseñado como un dashboard web de alto rendimiento y estética premium para monitorear, analizar y proyectar el consumo, despacho y confiabilidad energética en los diferentes campos de operación.

🔗 **Enlace de acceso a la maqueta interactiva:** [https://desarrollo-cenyt.github.io/Mockup-Cenyt-GPK/#/](https://desarrollo-cenyt.github.io/Mockup-Cenyt-GPK/#/)

---

## 📂 Páginas del Proyecto

El sistema está organizado en una barra lateral de navegación interactiva y cuenta con las siguientes vistas principales:

### 1. [Inicio.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Inicio.jsx)
La página de bienvenida de la aplicación. Presenta un fondo fotográfico dinámico (Llanos 34) con una capa oscura que asegura un alto contraste de lectura. Cuenta con un carrusel interactivo y responsivo de tarjetas de accesos rápidos a los módulos operativos, cada uno con hover dinámico y micro-animaciones personalizadas.

### 2. [Eficiencia.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Eficiencia.jsx)
Módulo enfocado en la **Eficiencia Operacional**.
* **KPIs Clave:** Eficiencia Global, Consumo Total, Pozos Activos y Meta de Ahorro.
* **Visualizaciones:** Gráfico de Área que muestra la eficiencia mensual real frente a la meta establecida y un Gráfico de Barras Horizontal detallando la eficiencia por tipo de energía y campo.
* **Tablas de Monitoreo:** Estatus operacional de cada campo en tiempo real.

### 3. [Despacho.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Despacho.jsx)
Módulo enfocado en el **Despacho Energético** (hacia qué campos y pozos se está dirigiendo la energía generada).
* **KPIs Clave:** Energía Despachada (MW), Generación Autónoma (%), Eficiencia de Distribución y Pérdidas del Sistema.
* **Visualizaciones:** Gráfico de Donut interactivo para la distribución por campo en porcentaje y un Gráfico de Área Apilada que proyecta la tendencia mensual acumulada por campo de la energía despachada.
* **Tabla de Asignación:** Balance detallado de energía programada versus real por campo.

### 4. [Pronostico.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Pronostico.jsx)
Modulo de **Pronóstico y Demanda** de carga energética.
* **KPIs Clave:** Pronóstico Semanal, Demanda Máxima Esperada, Factor de Carga y Precisión del Modelo.
* **Visualizaciones:** Gráfico de Líneas con proyección a futuro mediante Machine Learning (mostrando datos reales y la curva del forecast), junto con barras de progreso estilizadas de la distribución por mercado (Regulado vs. No Regulado).

### 5. [Confiabilidad.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Confiabilidad.jsx)
Módulo para el análisis de **Confiabilidad del Sistema**.
* **KPIs Clave:** Uptime General, MTBF (Tiempo Medio Entre Fallas), MTTR (Tiempo Medio de Reparación) y Equipos Críticos bajo monitoreo.
* **Visualizaciones:** Gráfico de Área para el histórico de Uptime y un Gráfico de Barras Dobles que compara directamente MTBF vs. MTTR mes a mes.

### 6. [Fallas.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Fallas.jsx)
Módulo de **Reporte de Fallas** que integra visualizaciones interactivas de PowerBI mediante incrustaciones responsivas.

### 7. [Vulnerabilidades.jsx](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/src/pages/Vulnerabilidades.jsx)
Módulo de **Mantenimiento y Vulnerabilidades** del sistema para el seguimiento detallado de activos críticos, también soportado mediante integraciones interactivas de PowerBI.

---

## 🛠️ Tecnologías Utilizadas

* **React 18** (JavaScript)
* **Vite** (Build Tool ultrarrápido)
* **Tailwind CSS v4** (Estilos y variables de diseño responsivos)
* **Recharts** (Gráficos interactivos adaptados al tema de la aplicación)
* **Lucide React** (Paquete de iconos consistente y moderno)
* **GitHub Actions** (CI/CD para automatización de despliegue)

---

## 🚀 Instrucciones de Inicio Rápido

Para clonar y levantar la aplicación localmente, ejecuta los siguientes comandos en tu terminal:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```
La consola te indicará el puerto local (usualmente `http://localhost:5173`) donde estará corriendo la maqueta.

### 3. Generar la compilación para producción
```bash
npm run build
```

---

## 🌐 Integración Continua y Despliegue (CI/CD)

El repositorio está configurado con **GitHub Actions**. El flujo de trabajo en [.github/workflows/deploy.yml](file:///c:/Users/ingju/OneDrive%20-%20Cenyt%20ingenieros/Desktop/APP_Gestion_Energia/.github/workflows/deploy.yml) realiza automáticamente el build y despliegue a la rama `gh-pages` cada vez que se hace un `push` a la rama `main`, actualizando la maqueta web en vivo.
