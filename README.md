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

### 8. Parex.jsx
Módulo de **Seguimiento Cliente Parex**.
* **KPIs Clave:** Demanda Llanos 34, Demanda Total Parex.
* **Visualizaciones Principales:** Gráfico de Anillo (Distribución Demanda Parex), Gráfico de Área interactivo con eje doble (Comportamiento Semanal), Gráfico de Barras Horizontales con data labels personalizados (Distribución de Fuentes) y Medidor (Generación Gas Aggreko).

### 9. Pronostico.jsx
Módulo de **Pronóstico y Demanda** de carga energética.
* **Visualizaciones:** Gráfico de Líneas interactivo con proyección a futuro mediante Machine Learning (mostrando datos reales y la curva de forecast), leyenda interactiva dinámica para ocultar/mostrar variables y ejes agrupados por semanas y meses.
* **Análisis Diario:** Tablas detalladas con formato estandarizado para revisar Costos de Energía y predicciones.

---

## 🛠️ Tecnologías Utilizadas

* **React 18** (JavaScript)
* **Vite** (Build Tool ultrarrápido)
* **Tailwind CSS v4** (Estilos y variables de diseño responsivos)
* **Recharts** (Gráficos interactivos nativos adaptados al tema de la aplicación)
* **Lucide React** (Paquete de iconos consistente y moderno)
* **GitHub Actions** (CI/CD para automatización de despliegue)

---

## 🚀 Guía de Instalación y Uso (Para Principiantes)

Si es la primera vez que vas a correr un proyecto de este tipo y no tienes nada instalado en tu computadora, sigue estos pasos desde cero:

### 1. Requisitos Previos (Instalaciones necesarias)
Antes de descargar el proyecto, necesitas instalar dos herramientas fundamentales en tu computadora:

* **Node.js:** Es el entorno que permite ejecutar JavaScript en tu computadora. 
  * 👉 **Descárgalo aquí:** [https://nodejs.org/es/](https://nodejs.org/es/) (Descarga la versión "LTS" recomendada para la mayoría).
  * *Instalación:* Simplemente abre el archivo descargado y dale "Siguiente" a todo hasta finalizar.
* **Git (Opcional pero recomendado):** Sirve para clonar repositorios de código.
  * 👉 **Descárgalo aquí:** [https://git-scm.com/downloads](https://git-scm.com/downloads).

### 2. Descargar el Repositorio

Tienes dos opciones para obtener el código fuente en tu computadora:

**Opción A: Usando Git (Recomendado)**
1. Abre tu terminal (En Windows puedes buscar "Símbolo del sistema", "PowerShell" o "Git Bash").
2. Navega a la carpeta donde quieres guardar el proyecto (ej. `cd Desktop`).
3. Ejecuta el siguiente comando para clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
4. Entra a la carpeta del proyecto:
   ```bash
   cd APP_Gestion_Energia
   ```

**Opción B: Descargar como archivo ZIP**
1. Ve a la parte superior de esta página en GitHub.
2. Haz clic en el botón verde que dice **"<> Code"**.
3. Selecciona **"Download ZIP"**.
4. Descomprime el archivo descargado en tu computadora.
5. Abre una terminal y navega hasta esa carpeta usando el comando `cd ruta/de/la/carpeta`.

### 3. Instalar Dependencias
Una vez que estés dentro de la carpeta del proyecto en tu terminal, necesitas instalar todas las librerías que utiliza la aplicación (como React, Recharts, Tailwind, etc.). Para ello, escribe:

```bash
npm install
```
*(Esto puede tardar unos minutos. Verás una barra de progreso mientras descarga los paquetes en una carpeta llamada `node_modules`).*

### 4. Ejecutar la Aplicación
Cuando la instalación termine, levanta el servidor local con el siguiente comando:

```bash
npm run dev
```

### 5. ¡Abre el Dashboard!
En tu terminal aparecerá un mensaje con un enlace local, normalmente es:
👉 **`http://localhost:5173/`**

Presiona la tecla `Ctrl` y haz clic en el enlace, o cópialo y pégalo en tu navegador web favorito (Chrome, Edge, Firefox). ¡Listo! Ya estás ejecutando el Dashboard localmente.

---

## 📦 Compilación para Producción (Avanzado)
Si deseas generar los archivos estáticos listos para subir a un servidor web real, ejecuta:
```bash
npm run build
```
Esto creará una carpeta `/dist` con todo el código minificado y optimizado.

---

## 🌐 Integración Continua y Despliegue (CI/CD)

El repositorio está configurado con **GitHub Actions**. El flujo de trabajo realiza automáticamente el build y despliegue a la rama `gh-pages` cada vez que se hace un `push` a la rama `main`, actualizando la maqueta web en vivo.
