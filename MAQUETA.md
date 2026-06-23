# Maqueta — Dashboard Operacional GeoPark

Documento de referencia de diseño y estructura del dashboard de indicadores operacionales. Define la arquitectura visual, componentes, colores, tipografía y patrones de datos.

---

## 1. Estructura General de Layout

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (224px)  │  TOPBAR (100% - 224px, altura 56px)     │
│                   ├─────────────────────────────────────────┤
│  Logo             │  FILTROS (condicional, altura 36px)      │
│  ─────────────    ├─────────────────────────────────────────┤
│  Navegación       │                                         │
│  ─────────────    │  CONTENIDO PRINCIPAL                    │
│  (flex-1)         │  (scroll vertical)                      │
│                   │                                         │
│  Toggle tema      │                                         │
│  Versión          │                                         │
└───────────────────┴─────────────────────────────────────────┘
```

- Layout raíz: `display: flex; height: 100vh; overflow: hidden`
- Sidebar: ancho fijo `224px`, no colapsa en desktop
- Área principal: `flex: 1`, columna con topbar + contenido scrolleable
- Contenido: `overflow-y: auto`, padding `px-8 py-7`

---

## 2. Sidebar — Barra de Navegación

### Estructura

```
┌─────────────────┐
│   Logo GeoPark  │  altura 72px, borde inferior
├─────────────────┤
│  PROCESOS       │  etiqueta de sección
│  ─────────────  │
│  ⚡ Eficiencia  │  ítem de nav
│  🚛 Despacho    │
│  📈 Demanda     │
│  🛡 Confiabilidad│
├─────────────────┤
│  [Modo claro ☀] │  toggle de tema
├─────────────────┤
│  v2.4.1 Oct2024 │  footer, fuente mono
└─────────────────┘
```

### Especificaciones

| Elemento | Valor |
|---|---|
| Ancho | `224px` (fijo) |
| Fondo | `var(--sidebar)` — Blanco en claro / `#0A0A0D` en oscuro |
| Borde derecho | `1px solid var(--sidebar-border)` |
| Logo | `height: 32px`, `object-fit: contain`. Filtro CSS: `brightness(0)` en claro, `brightness(0) invert(1)` en oscuro |
| Etiqueta de sección | `10px`, `uppercase`, `tracking-widest`, color muted |
| Ítem inactivo | `text-muted-foreground`, hover: `bg-sidebar-accent` |
| Ítem activo | `background: var(--primary)` `#C41230`, texto blanco, `font-weight: 500` |
| Ítem: padding | `px-3 py-2.5`, `border-radius: 6px` |
| Ítem: ícono | `17px`, Lucide React |
| Toggle tema | Ancho completo, borde `border-border`, texto e ícono invertidos según estado |
| Footer | `10px`, `font-family: JetBrains Mono`, color muted |

### Ítems de navegación

| ID | Label | Ícono Lucide |
|---|---|---|
| `eficiencia` | Eficiencia | `<Zap />` |
| `despacho` | Despacho | `<Truck />` |
| `demanda` | Demanda | `<TrendingUp />` |
| `confiabilidad` | Confiabilidad | `<Shield />` |

---

## 3. Topbar — Barra Superior

### Estructura

```
┌─────────────────────────────────────────────────────┐
│  Título proceso       [Período ▾]  [Campo ▾]  ● En  │
│  Subtítulo descripción                               │
└─────────────────────────────────────────────────────┘
```

### Especificaciones

| Elemento | Valor |
|---|---|
| Altura | `56px` |
| Fondo | `var(--background)` |
| Borde inferior | `1px solid var(--border)` |
| Padding horizontal | `px-8` |
| Título | `16px`, `font-weight: 600`, `var(--foreground)` |
| Subtítulo | `12px`, `var(--muted-foreground)`, oculto en móvil |
| Indicador online | Círculo `8px`, `bg-emerald-400`, animación `animate-pulse` |

---

## 4. Filtros

### Barra de filtros activos (condicional)

Aparece debajo del topbar únicamente cuando el campo seleccionado **no** es "Todos los campos".

```
┌─────────────────────────────────────────────────────────┐
│  Filtrado por:  [📍 Llanos 34 ×]  [📅 Oct 2024]   Limpiar │
└─────────────────────────────────────────────────────────┘
```

| Elemento | Valor |
|---|---|
| Altura | `36px` |
| Fondo | `bg-primary/5` (rojo al 5% de opacidad) |
| Borde inferior | `1px solid var(--border)` |
| Etiqueta campo activo | `bg-primary/15`, texto `var(--primary)`, `border-radius: 9999px`, `10px` |
| Etiqueta período | `bg-secondary`, texto muted, `border-radius: 9999px` |
| Botón limpiar | Alineado a la derecha, `12px`, hover cambia a foreground |

### Dropdown de filtro

```
┌─────────────────────┐
│ 🔵 Período: Oct 2024 ▾│  botón
└─────────────────────┘
         ↓ (abierto)
┌──────────────────┐
│ Oct 2024  ←activo│
│ Sep 2024         │
│ Ago 2024         │
│ Q3 2024          │
│ YTD 2024         │
└──────────────────┘
```

| Elemento | Valor |
|---|---|
| Botón | `border-border`, `bg-card`, `border-radius: 6px`, `px-3 py-1.5` |
| Ícono prefijo | `13px`, Lucide (`<Calendar />` o `<MapPin />`) |
| Label | `10px`, uppercase, color muted |
| Valor | `12px`, `font-weight: 500` |
| Panel dropdown | `bg-popover`, `border-border`, `border-radius: 8px`, sombra `shadow-xl` |
| Ítem activo | `bg-primary/10`, texto `var(--primary)` |
| Ítem hover | `bg-secondary` |
| Z-index | `50` |

### Opciones disponibles

**Período:** Oct 2024 / Sep 2024 / Ago 2024 / Jul 2024 / Q3 2024 / Q2 2024 / YTD 2024

**Campo:** Todos los campos / Llanos 34 / CPO-5 / Putumayo / Jacana / Tigana / Mariposa

---

## 5. Sistema de Colores

### Paleta de marca GeoPark

| Token | Valor | Uso |
|---|---|---|
| Rojo primario | `#C41230` | Acento principal, nav activo, gráficos primarios |
| Negro | `#111114` | Texto principal (modo claro) |
| Blanco | `#FFFFFF` | Superficies (modo claro) |

### Tokens — Modo Claro (`:root`)

| Token CSS | Valor | Descripción |
|---|---|---|
| `--background` | `#F5F5F7` | Fondo de página |
| `--foreground` | `#111114` | Texto principal |
| `--card` | `#FFFFFF` | Fondo de tarjetas y paneles |
| `--card-foreground` | `#111114` | Texto dentro de tarjetas |
| `--primary` | `#C41230` | Color interactivo principal |
| `--primary-foreground` | `#FFFFFF` | Texto sobre primario |
| `--secondary` | `#EBEBEE` | Superficies secundarias, hover |
| `--muted` | `#EBEBEE` | Superficies apagadas |
| `--muted-foreground` | `#767688` | Texto de etiquetas y captions |
| `--border` | `rgba(0,0,0,0.08)` | Bordes y divisores |
| `--popover` | `#FFFFFF` | Fondo de dropdowns y tooltips |
| `--sidebar` | `#FFFFFF` | Fondo del sidebar |
| `--sidebar-accent` | `#F0F0F4` | Hover en ítems de nav |

### Tokens — Modo Oscuro (`.dark`)

| Token CSS | Valor | Descripción |
|---|---|---|
| `--background` | `#0C0C0F` | Fondo de página |
| `--foreground` | `#EEEEF2` | Texto principal |
| `--card` | `#141417` | Fondo de tarjetas |
| `--primary` | `#C41230` | Igual en ambos modos |
| `--secondary` | `#1E1E23` | Superficies secundarias |
| `--muted-foreground` | `#7A7A90` | Texto de etiquetas |
| `--border` | `rgba(255,255,255,0.07)` | Bordes sutiles |
| `--popover` | `#1A1A1E` | Tooltips y dropdowns |
| `--sidebar` | `#0A0A0D` | Fondo del sidebar |

### Colores semánticos de datos

| Token | Hex (claro) | Hex (oscuro) | Uso |
|---|---|---|---|
| `--chart-1` | `#C41230` | `#C41230` | Serie principal / alerta crítica |
| `--chart-2` | `#2E7EC8` | `#4A9EE0` | Serie secundaria / forecast |
| `--chart-3` | `#D4900A` | `#E8A838` | Serie terciaria / advertencia |
| `--chart-4` | `#1A9E70` | `#4EC99A` | Positivo / uptime / OK |
| `--chart-5` | `#7B4FC8` | `#9B6BDE` | Cuarta serie |

### Colores de estado

| Estado | Color texto | Ícono |
|---|---|---|
| Operativo / OK | `text-emerald-400` | `<CheckCircle size={12} />` |
| Atención / Warn | `text-amber-400` | `<Clock size={12} />` |
| Crítico / Alert | `text-red-400` | `<AlertTriangle size={12} />` |

---

## 6. Tipografía

### Fuentes

| Familia | Uso | Import |
|---|---|---|
| **Inter** | Texto de UI, labels, títulos, cuerpo | Google Fonts |
| **JetBrains Mono** | Valores numéricos, KPIs, tooltips, tickers, código | Google Fonts |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

### Escala tipográfica

| Rol | Tamaño | Peso | Familia | Color |
|---|---|---|---|---|
| Título de sección (topbar) | `16px` | `600` | Inter | foreground |
| Subtítulo de sección | `12px` | `400` | Inter | muted-foreground |
| Valor KPI principal | `30px` | `600` | JetBrains Mono | foreground |
| Label de KPI | `10px` | `500` | Inter | muted-foreground, uppercase, tracking-widest |
| Unidad de KPI | `14px` | `400` | Inter | muted-foreground |
| Encabezado de tarjeta | `14px` | `500` | Inter | foreground |
| Subtítulo de tarjeta | `12px` | `400` | Inter | muted-foreground |
| Encabezado de tabla | `10px` | `500` | Inter | muted-foreground, uppercase, tracking-wider |
| Celda de tabla — texto | `14px` | `400–500` | Inter | foreground |
| Celda de tabla — número | `14px` | `400` | JetBrains Mono | foreground / muted |
| Etiqueta de eje (gráfico) | `11px` | `400` | JetBrains Mono | muted-foreground |
| Tooltip de gráfico | `12px` | `400` | JetBrains Mono | foreground |
| Footer / versión | `10px` | `400` | JetBrains Mono | muted-foreground |

---

## 7. Tarjetas KPI

### Anatomía

```
┌──────────────────────────────────┐
│ EFICIENCIA GLOBAL          ↑2.3% │  ← label + trend
│                                  │
│  91.4  %                         │  ← valor + unidad
│                                  │
│  vs. mes anterior                │  ← sub-texto
└──────────────────────────────────┘
```

### Especificaciones

| Propiedad | Valor |
|---|---|
| Fondo normal | `var(--card)` |
| Fondo destacada | `bg-primary/10` (rojo al 10%) |
| Borde normal | `1px solid var(--border)` |
| Borde destacada | `1px solid rgba(196,18,48,0.30)` |
| Border-radius | `8px` |
| Padding | `20px` |
| Gap interno | `12px` (columna) |
| Hover | `border-color: rgba(255,255,255,0.12)` — solo en normal |
| Transición | `transition-colors 150ms` |

### Indicador de tendencia (Trend)

| Condición | Color | Ícono |
|---|---|---|
| Positivo (`> 0`) | `text-emerald-400` | `<ChevronUp size={13} />` |
| Negativo (`< 0`) | `text-red-400` | `<ChevronDown size={13} />` |
| Neutro (`= 0`) | `text-muted-foreground` | `<Minus size={13} />` |

Fuente del valor de tendencia: `JetBrains Mono`, `12px`

### Grid de KPIs

- Mobile: `grid-cols-2`
- Desktop (≥ 1024px): `grid-cols-4`
- Gap: `16px`
- La primera tarjeta del grupo lleva `accent={true}` (borde y fondo rojo sutil)

---

## 8. Gráficos

Librería: **Recharts**. Todos los gráficos son `<ResponsiveContainer width="100%" height={220}>`.

### Configuración común

```js
// Tooltip
{
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  color: "var(--foreground)",
  fontSize: "12px",
  fontFamily: "'JetBrains Mono', monospace"
}

// Ejes
tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }}
axisLine={false}
tickLine={false}

// Grid
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
// En modo claro: stroke="rgba(0,0,0,0.05)"
```

### Tipos de gráfico por sección

| Sección | Gráfico izquierdo | Gráfico derecho |
|---|---|---|
| Eficiencia | AreaChart — Eficiencia mensual real vs. meta | BarChart horizontal — Eficiencia por tipo y campo |
| Despacho | BarChart — Despacho semanal prog. vs. real | AreaChart — Tendencia mensual |
| Demanda | LineChart — Demanda real vs. forecast | Barras de progreso CSS — Distribución por mercado |
| Confiabilidad | AreaChart — Uptime mensual | BarChart — MTBF vs. MTTR (últimos 6 meses) |

### AreaChart

```jsx
<Area
  type="monotone"
  dataKey="real"
  stroke="#C41230"
  strokeWidth={2}
  fill="url(#gradReal)"   // gradiente vertical de rojo a transparente
/>
// Serie secundaria / meta / forecast:
stroke="#4A9EE0" strokeWidth={1.5} strokeDasharray="4 3"
```

Gradiente estándar: opacidad 0.25 en el top → 0 en el bottom.

### BarChart vertical

```jsx
<Bar
  dataKey="valor"
  fill="#C41230"
  radius={[3, 3, 0, 0]}   // esquinas redondeadas arriba
/>
```

Barras programadas / de comparación: `fill="rgba(74,158,224,0.25)"`

### BarChart horizontal (layout="vertical")

```jsx
<BarChart data={data} layout="vertical">
  <XAxis type="number" />
  <YAxis dataKey="campo" type="category" width={60} />
  <Bar dataKey="valor" radius={[0, 2, 2, 0]} />   // redondeado a la derecha
</BarChart>
```

### LineChart

```jsx
<Line
  type="monotone"
  dataKey="real"
  stroke="#C41230"
  strokeWidth={2}
  dot={{ r: 4, fill: "#C41230" }}
/>
// Forecast (con datos futuros nulos):
connectNulls={false}
stroke="#4A9EE0" strokeDasharray="5 3" dot={{ r: 3 }}
```

### Barras de progreso (CSS — sección Demanda)

```jsx
<div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
  <div style={{ width: `${pct}%`, backgroundColor: color }} className="h-full rounded-full" />
</div>
```

### Contenedor de gráfico (tarjeta)

```
┌─────────────────────────────────────────────┐
│ Título del gráfico              14px, 500    │
│ Descripción / período           12px, muted  │
│                                             │
│  [gráfico — 220px de alto]                  │
└─────────────────────────────────────────────┘
```

Padding: `20px`. Fondo: `var(--card)`. Borde: `1px solid var(--border)`. Border-radius: `8px`.

Grid de gráficos:
- Mobile: `grid-cols-1`
- Desktop: `grid-cols-3` (2/3 + 1/3) o `grid-cols-2` (50/50)

---

## 9. Tablas

### Anatomía

```
┌──────────────────────────────────────────────────────┐
│ Título de tabla                   [metadato opcional] │  ← header de tarjeta
├──────────────────────────────────────────────────────┤
│  CAMPO     EFICIENCIA   POZOS   OBJETIVO   ESTADO    │  ← thead
├──────────────────────────────────────────────────────┤
│  Llanos 34    91.4%      42       90%      ✓ Operativo│  ← tbody row
│  CPO-5        86.2%      28       88%      ⚠ Atención │
│  Putumayo     78.5%      15       82%      ✗ Crítico  │
└──────────────────────────────────────────────────────┘
```

### Especificaciones

| Elemento | Valor |
|---|---|
| Contenedor | `bg-card`, `border-border`, `border-radius: 8px`, `overflow: hidden` |
| Header de tarjeta | `px-5 py-4`, borde inferior `border-border` |
| `<table>` | `w-full`, `font-size: 14px` |
| `<thead>` | Borde inferior `border-border` |
| `<th>` | `px-5 py-3`, `10px`, `uppercase`, `tracking-wider`, `font-weight: 500`, `color: muted-foreground` |
| Alineación th/td | Texto: `text-left` · Números: `text-right` · Estado: `text-left` |
| `<tr>` body | Borde inferior `border-border/50` |
| `<tr>` hover | `bg-secondary/30`, `transition-colors` |
| `<td>` | `px-5 py-3.5` |
| Celda numérica | `font-family: JetBrains Mono`, `14px` |
| Celda de nombre | `font-weight: 500` |
| Celda muted | `color: muted-foreground` |
| Overflow | `overflow-x: auto` en el wrapper interno |

### Columnas por sección

**Eficiencia:** Campo · Eficiencia · Pozos · Objetivo · Estado

**Despacho:** Destino · Volumen · Estado · Hora · Variación

**Demanda:** Cliente · Contrato · Volumen · Cumplimiento · Estado

**Confiabilidad:** Equipo · Tipo · Uptime · Alertas · Estado

---

## 10. Componentes de Estado y Badges

### StatusBadge

```jsx
// OK
<CheckCircle size={12} /> "Operativo"   → text-emerald-400

// Warn
<Clock size={12} /> "Atención"          → text-amber-400

// Alert
<AlertTriangle size={12} /> "Crítico"   → text-red-400
```

Tamaño de fuente: `12px`. Display: `flex items-center gap-1`.

### Indicador de variación en tabla (Despacho)

| Valor | Color |
|---|---|
| Empieza con `+` | `text-emerald-400` |
| Empieza con `-` | `text-red-400` |
| `—` (neutro) | `text-muted-foreground` |

Fuente: `JetBrains Mono`, `14px`.

### Estado de movimiento (Despacho)

| Estado | Color |
|---|---|
| Completado | `text-emerald-400` |
| En tránsito | `text-sky-400` |
| Programado | `text-muted-foreground` |
| Alerta | `text-red-400` |

---

## 11. Espaciado y Border-radius

| Token | Valor | Uso |
|---|---|---|
| `--radius` | `8px` | Tarjetas, dropdowns, paneles |
| `--radius-sm` | `4px` | Botones pequeños, badges |
| Barra de filtros activos | `9999px` | Etiquetas pill |
| Barras de progreso | `9999px` | Relleno y contenedor |
| Barras de chart | `3px` arriba | Columnas de bar chart |

**Escala de padding / gap estándar:**

| Contexto | Valor |
|---|---|
| Padding de sección (main) | `px-8 py-7` |
| Padding de tarjeta | `20px` |
| Padding de tabla `th`/`td` | `px-5 py-3` / `px-5 py-3.5` |
| Gap entre KPI cards | `16px` |
| Gap entre gráficos | `24px` |
| Gap entre secciones | `24px` |

---

## 12. Secciones / Procesos

Cada proceso renderiza en el área de contenido principal y sigue la misma estructura:

```
1. Grid de 4 KPI cards
2. Grid de 2 gráficos (o gráfico 2/3 + panel 1/3)
3. Tabla de datos detallados
```

| Proceso | KPI destacado | Gráfico principal | Particularidad |
|---|---|---|---|
| **Eficiencia** | Eficiencia Global `91.4%` | AreaChart mensual real vs. meta | Bar chart horizontal por campo |
| **Despacho** | Despacho Hoy `50,412 bbl` | BarChart semanal prog. vs. real | Tabla con hora y estado de tránsito |
| **Demanda** | Demanda Actual `52,300 bbl/d` | LineChart real vs. forecast | Panel de distribución con barras CSS |
| **Confiabilidad** | Uptime Global `97.8%` | AreaChart uptime mensual | Alertas activas en header de tabla |

---

## 13. Responsividad

| Breakpoint | Cambio |
|---|---|
| `< 1024px` | KPIs pasan de 4 a 2 columnas. Gráficos pasan a 1 columna. |
| `< 768px` | Subtítulo del topbar se oculta. Indicador "En línea" se oculta. |

El sidebar no colapsa en la versión actual (diseñado para uso desktop/tablet apaisado).

---

## 14. Animaciones y Transiciones

| Elemento | Transición |
|---|---|
| Ítems de nav | `transition-colors 150ms` |
| Tarjetas KPI | `transition-colors 150ms` en borde |
| Filas de tabla | `transition-colors 150ms` en hover |
| Botones de filtro | `transition-colors 150ms` en borde |
| Indicador online | `animate-pulse` (Tailwind) |
| Barras de progreso | `transition-all` en ancho |

No se usan animaciones de entrada de página para mantener la respuesta inmediata en un entorno de datos en tiempo real.

---

## 15. Dependencias UI

| Librería | Versión | Uso |
|---|---|---|
| `react` + `react-dom` | 18 | Base |
| `recharts` | — | Todos los gráficos |
| `lucide-react` | — | Íconos de nav, badges, filtros |
| `tailwindcss` | v4 | Utilidades de estilo |
| `motion/react` | — | Disponible, no usado aún |
| `@radix-ui/*` | — | Disponible para modals/tooltips |
