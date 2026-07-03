<p align="center">
  <img src="./public/Logo-GEOPARK_2400.svg" alt="GeoPark Logo" width="300" />
</p>

# Dashboard Operacional — Gestión de Energía Inteligente

Este es el repositorio de la aplicación de **Gestión de Energía Inteligente** de GeoPark. El proyecto está diseñado como un dashboard web de alto rendimiento y estética premium para monitorear, analizar y proyectar el consumo, despacho y confiabilidad energética en los diferentes campos de operación.

🔗 **Enlace de acceso a la maqueta interactiva:** [https://desarrollo-cenyt.github.io/Mockup-Cenyt-GPK/#/](https://desarrollo-cenyt.github.io/Mockup-Cenyt-GPK/#/)

> **Credenciales de Acceso (Mockup):**
> - **Usuario:** `admin`
> - **Contraseña:** `admin`

---

## 📂 Páginas y Módulos del Proyecto

El sistema está organizado en una barra lateral de navegación interactiva y cuenta con las siguientes vistas principales actualizadas a su última versión:

### 1. Login.jsx
Pantalla de inicio de sesión con estética *Glassmorphism* sobre el fondo fotográfico de los Llanos 34. Protege el acceso al dashboard validando credenciales de prueba.

### 2. Inicio.jsx
La página de bienvenida de la aplicación. Presenta una cuadrícula interactiva de tarjetas de accesos rápidos a los módulos operativos, incluyendo indicadores de módulos "Próximamente" (como Parex), cada uno con hover dinámico y micro-animaciones personalizadas.

### 3. Eficiencia.jsx
Módulo enfocado en la **Eficiencia Operacional**.
* **KPIs Clave:** Eficiencia Global, Consumo Total, Pozos Activos y Meta de Ahorro.
* **Visualizaciones:** Gráfico de Área que muestra la eficiencia mensual real frente a la meta establecida y un Gráfico de Barras Horizontal detallando la eficiencia por tipo de energía y campo.

### 4. Despacho.jsx
Módulo enfocado en el **Despacho Energético y Generación**.
* **Visualizaciones Principales:** Gráfico de Donut (Demanda por Campos), Gráfico de Barras (Generación por Fuente), y Gráfico de Área (Comportamiento Semanal).
* **Tablas de Balance:** Tabla detallada de Real vs Programado por semana.
* **Análisis Diario:** Sección inferior enfocada en la variación diaria con gráficos interactivos de costos horarios y tablas de comparación frente al día anterior.

### 5. Confiabilidad.jsx
Módulo centrado en la **Operatividad de los Pozos** y las pérdidas de producción.
* **KPIs Clave:** Bbls Diferidos, Pozos Afectados, Disponibilidad de Pozos y MTBF Promedio.
* **Visualizaciones:** Gráfico de Área Dinámico con selector de métricas (SAIFI, MTTR, MTBF, Diferidas, etc.) y selector temporal (Semanal / Mensual).
* **Tabla de Asignación:** Resumen detallado del Estado de Pozos con sus respectivas pérdidas diferidas.

### 6. Fallas.jsx
Dashboard nativo y robusto de **Análisis de Fallas** (reemplazando el antiguo iFrame).
* **Estructura en Pestañas:** 
  * *Análisis General:* KPIs de eventos y diferidas acumuladas, gráficos de clasificación por ubicación y causa, diferida por fuente y distribuciones.
  * *Comparativo Red:* Panel específico para el análisis de redes, con gráficos comparativos interanuales (2024, 2025, 2026) y tabla de tendencias.
* Opción de acceder al reporte en PowerBI mediante enlace directo externo.

### 7. Vulnerabilidades.jsx
Módulo de **Mantenimiento y Vulnerabilidades** del sistema para el seguimiento detallado de activos críticos, soportado mediante integraciones interactivas de PowerBI.

### 8. Parex (Próximamente)
Módulo en desarrollo para seguimiento y gestión inteligente de energía para aliados. Actualmente visualizado de manera inactiva en el menú e inicio.

### 9. Pronostico.jsx
Modulo de **Pronóstico y Demanda** de carga energética.
* **Visualizaciones:** Gráfico de Líneas con proyección a futuro mediante Machine Learning (mostrando datos reales y la curva del forecast).

---

## 🛠️ Tecnologías Utilizadas

* **React 18** (JavaScript)
* **Vite** (Build Tool ultrarrápido)
* **Tailwind CSS v4** (Estilos y variables de diseño responsivos)
* **Recharts** (Gráficos interactivos nativos adaptados al tema de la aplicación)
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

El repositorio está configurado con **GitHub Actions**. El flujo de trabajo realiza automáticamente el build y despliegue a la rama `gh-pages` cada vez que se hace un `push` a la rama `main`, actualizando la maqueta web en vivo.
