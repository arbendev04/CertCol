# CLAUDE.md — Bitácora de desarrollo: certCol

Documento de seguimiento técnico generado y mantenido por Claude Code.
Se actualiza cada vez que se realiza un cambio significativo en el proyecto.

---

## Contexto del proyecto

**certCol** es una aplicación web para la captación y gestión de leads de compra-venta de Certificados de Inversión para el Desarrollo (CID) en Colombia.

- **Cliente:** certCol
- **Desarrollador:** Santiago Arango Benjumea
- **Inicio:** Abril 2026
- **Entrega estimada:** Finales de abril / inicio de mayo 2026

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Motion (Librería moderna para crear animaciones y gestos interactivos fluidos) |
| Componentes UI | shadcn/ui |
| Formularios | React Hook Form + Zod |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | Supabase Auth |
| Correo | Resend + React Email |
| Hosting | Vercel |
| Dominio | .co / .com.co |

---

## Design System (Stitch — "The Architectural Intelligence")

### Colores
| Token | Hex | Uso |
|-------|-----|-----|
| Primary | `#0A4D8C` | Acciones principales, links |
| Primary dark | `#003667` | Fondos de autoridad |
| Secondary | `#00C896` | Acentos, éxito |
| Tertiary | `#1E90D4` | Puntos focales secundarios |
| Surface | `#FCF9F8` | Canvas base |
| Surface Low | `#F6F3F2` | Secciones secundarias |
| Surface Container | `#F0EDEC` | Tarjetas |
| On Surface | `#1C1B1B` | Texto principal |

### Tipografía
| Rol | Fuente |
|-----|--------|
| Headlines / Display | Space Grotesk (700) |
| Body / Párrafos | Plus Jakarta Sans (400/500) |
| Labels / UI | Plus Jakarta Sans (500) |

### Principios de diseño
- **Sin bordes de 1px** para seccionar — usar cambios de color de fondo
- **Glassmorphism** en elementos flotantes (modales, nav sticky): `bg-white/70 backdrop-blur-xl`
- **Ambient shadows** suaves (40px blur, 6% opacidad) — nunca drop shadows duras
- **Tonal layering**: profundidad por capas de color, no por líneas
- **Mesh gradients** en fondos del hero — nunca fondos planos
- **Roundness**: `rounded-lg` (8px) como base

---

## Estructura del proyecto

```
certcol-web/
├── app/
│   ├── globals.css                 # Tokens, dark mode, clases utilitarias propias
│   ├── layout.tsx                  # Layout raíz, fuentes, providers
│   ├── page.tsx                    # Landing page pública
│   ├── gracias/page.tsx            # Página de confirmación post-formulario
│   ├── admin/
│   │   ├── layout.tsx              # Layout del panel (protegido)
│   │   ├── page.tsx                # Dashboard principal
│   │   ├── login/page.tsx          # Login del admin
│   │   └── leads/
│   │       └── [id]/page.tsx       # Detalle de un lead
│   └── api/
│       ├── leads/route.ts          # POST crear lead, GET listar leads
│       └── leads/[id]/route.ts     # GET/PATCH detalle de lead
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx              # Navbar sticky con glass y ThemeToggle
│   │   ├── Hero.tsx                # Hero con mesh gradient y CertForm
│   │   ├── WhatIsACID.tsx          # Educación financiera + bloque cálculo
│   │   ├── HowItWorks.tsx          # 4 pasos del proceso
│   │   ├── Benefits.tsx            # Grid de 6 beneficios
│   │   ├── CtaSection.tsx          # CTA dark con stats (incluido en page.tsx)
│   │   ├── CertForm.tsx            # Formulario multistep principal (3 pasos)
│   │   └── Footer.tsx              # Footer adaptativo (tema claro/oscuro)
│   ├── admin/
│   │   ├── LeadsTable.tsx
│   │   ├── LeadDetail.tsx
│   │   └── ExportButton.tsx
│   └── ui/                         # Componentes shadcn/ui + ThemeToggle
├── lib/
│   ├── validations/
│   │   └── lead.schema.ts          # Esquema Zod del formulario
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── resend/
│       └── emails.ts
├── types/
│   └── lead.ts
└── public/
    └── img/                        # logo.webp, favico.webp
```

---

## Reglas de negocio del formulario

| Regla | Descripción |
|-------|-------------|
| Valor nominal | Calculado automáticamente: `valor_inversion * 1.65` (solo lectura) |
| Porcentaje máximo | Tope duro del 39% — validado en cliente y servidor |
| NIT colombiano | Validación del dígito de verificación (algoritmo DIAN) |
| Fecha de emisión | Campo condicional — solo aparece si el certificado NO ha sido emitido |
| Habeas Data | Checkbox obligatorio (Ley 1581 de 2012) |

---

## Modelo de datos (Supabase)

### Tabla `leads`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | PK |
| created_at | timestamptz | Fecha de creación |
| valor_inversion | numeric | Valor de la inversión |
| valor_nominal | numeric | Calculado: inversión × 1.65 |
| porcentaje_min | numeric | Porcentaje mínimo de venta |
| porcentaje_max | numeric | Máximo 39% |
| nit | text | NIT con dígito de verificación válido |
| razon_social | text | Razón social del inversionista |
| anio_inversion | integer | Año de la inversión |
| nombre_proyecto | text | Proyecto asociado al CID |
| certificado_emitido | boolean | ¿Fue emitido el certificado? |
| fecha_emision | date | Solo si certificado_emitido = false |
| condicion_venta | text | 'contado' o 'credito' |
| necesita_recursos | boolean | ¿Requiere recursos para ejecución? |
| habeas_data | boolean | Aceptación política de datos |
| estado | text | 'nuevo', 'contactado', 'en_proceso', 'aprobado', 'rechazado' |
| notas | text | Notas internas del admin |

---

## Historial de cambios

### 2026-04-15 — Mejoras UI/UX, dark mode y responsividad (commit f996464)
- [x] **Dark mode completo en la landing:** todos los componentes ahora usan tokens semánticos (`var(--brand-*)`, `var(--surface-*)`, `var(--on-surface)`) en lugar de hex hardcodeados.
- [x] **`globals.css`:** añadidas clases utilitarias propias — `.step-dot-*`, `.step-line-*`, `.toggle-btn-on/off`, `.progress-bar-fill`, `.icon-bg-*`, `.icon-primary/secondary/tertiary`, `.gradient-text`, `.form-conditional-bg`, `.card-lift`. Cada una con su variante `.dark`.
- [x] **`CertForm.tsx`:** tarjeta del formulario migrada a `.glass` (dark-aware). Step indicator, toggle buttons (Sí/No) y barra de progreso usan las nuevas clases sin inline styles. Input de fecha adaptado al dark mode.
- [x] **`Hero.tsx`:** título usa `.gradient-text` (adapta colores en dark). Tamaño `text-6xl` en desktop. Contenedor `lg:max-w-4xl` centrado.
- [x] **`Navbar.tsx`:** logo responsive (`h-10 sm:h-12 md:h-14`) — antes era 72px fijo en todos los tamaños.
- [x] **`WhatIsACID.tsx`:** iconos usan `.icon-bg-*` + `.icon-*` en lugar de inline styles. Bloque de cálculo migrado a `mesh-gradient-dark` para consistencia. Grid de cálculo `sm:grid-cols-3`.
- [x] **`HowItWorks.tsx`:** íconos de pasos con clases semánticas. Hover `.card-lift` en cada paso.
- [x] **`Benefits.tsx`:** iconos con `.icon-bg-primary` + `.icon-primary`. Grid `sm:grid-cols-2` para tablets. `.card-lift` en tarjetas.
- [x] **`Footer.tsx`:** reescrito completamente — ya no usa `bg-[#003667]`. Ahora usa `bg-surface text-on-surface` (crema en claro, oscuro en dark). Logo invierte solo en dark (`dark:brightness-0 dark:invert`). Todos los textos con tokens semánticos.
- [x] **`CtaSection.tsx`:** integrada en `page.tsx` (estaba creada pero sin usar). Botón "Ver cómo funciona" corregido con `!bg-transparent` para evitar que `variant="outline"` de shadcn sobrescriba con `bg-background`. Hover de ambos botones simplificado a `hover:text-white`.
- [x] **Responsividad general:** `px-4 sm:px-6` en todas las secciones. `py-20 sm:py-24`. Headers `text-3xl sm:text-4xl`. Footer `sm:grid-cols-2 md:grid-cols-3`.

### 2026-04-09 — Revisión visual y Corrección de Bugs
- [x] Inicializado proyecto Next.js 15 (App Router).
- [x] Configuración de Tailwind v4 y componentes base (Base UI / shadcn/ui).
- [x] Creamos el esquema validado en Zod y React Hook Form (`lead.schema.ts`).
- [x] Desarrollada la Landing page principal y flujos de confirmación pre-registro.
- [x] Corrección: Orden de `@import` en `globals.css` para evitar fallo en compilación PostCSS con Tailwind v4.
- [x] Corrección: Fix en runtime de Zod donde fallaba `.extend()` al extender un objeto previamente refinado.
- [x] Corrección: Cambio masivo del prop inyectable `asChild` a `render={<Link href="..." />}` tras conflictos con `@base-ui/react`.
- [x] Agregado: Instalación de `motion` en el proyecto para implementar animaciones y transiciones fluidas.
- [ ] Pendiente: Migrar logo y recursos gráficos desde `../Recursos` a la nueva estructura de `/public/img`.

### 2026-04-08 — Sesión inicial
- [x] Leídos documentos: `propuesta-certcol.docx` y `stack-tecnologico.docx`
- [x] Consultado proyecto CertCol en Stitch MCP (ID: `12730165767746243568`)
- [x] Creada carpeta `certcol-web/`
- [x] Creado `CLAUDE.md` con arquitectura, design system y modelo de datos
- [x] Inicializar proyecto Next.js 15
- [x] Configurar Tailwind v4 + design tokens del sistema Stitch
- [x] Instalar y configurar shadcn/ui
- [x] Crear esquema Zod del formulario
- [x] Desarrollar landing page (Hero, WhatIsACID, HowItWorks, Benefits, Form, Footer)
- [ ] Desarrollar panel administrativo (Login, Dashboard, Detalle)
- [ ] Configurar Supabase (cliente + tipos)
- [ ] Configurar Resend (plantillas de correo)

---

## Pendientes / Roadmap

### Alta prioridad
- [ ] **Supabase:** crear tabla `leads` según el modelo de datos, configurar RLS (Row Level Security) para que solo admins lean leads, y habilitar la API REST.
- [ ] **API Routes:** implementar `POST /api/leads` (crear lead) y `GET /api/leads` (listar, solo admin). Esqueleto ya existe en `app/api/leads/route.ts`.
- [ ] **Panel administrativo:** desarrollar Login (`/admin/login`), Dashboard con tabla de leads (`/admin`) y vista de detalle (`/admin/leads/[id]`). Diseño en Stitch screen `aa68cf37570f477b85a0606c35ad24af`.
- [ ] **Autenticación admin:** conectar Supabase Auth en el panel — proteger rutas `/admin/*` con middleware de Next.js.
- [ ] **Correo de confirmación:** configurar Resend + plantilla React Email que se envíe al lead cuando se registra y al admin cuando llega uno nuevo.

### Media prioridad
- [ ] **Página `/gracias`:** diseñar y desarrollar la página de confirmación post-envío de formulario (ruta ya existe pero sin contenido final).
- [ ] **Páginas legales:** `/politica-de-datos` y `/terminos` (enlaces ya están en footer y formulario).
- [ ] **Variables de entorno:** documentar todas las vars requeridas (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) en un `.env.example`.
- [ ] **Migrar logos:** copiar `certcollogo.png` y `logo_oscuro.png` desde `../Recursos/` a `public/img/` y verificar que el Navbar use la versión correcta según el tema (actualmente usa `logo.webp` genérico en ambos modos).

### Baja prioridad / Nice to have
- [ ] **Animaciones con Motion:** aprovechar la librería `motion` instalada para animar entrada de secciones al scroll (fade-in, slide-up).
- [ ] **Export CSV:** botón en el panel admin para exportar leads a CSV (`ExportButton.tsx` ya existe como esqueleto).
- [ ] **SEO:** añadir `og:image`, sitemap y robots.txt.
- [ ] **Dominio:** configurar dominio `.co` o `.com.co` en Vercel.

---

## Notas técnicas importantes

- **`variant="outline"` de shadcn/ui** inyecta `bg-background` que en modo claro es el fondo crema. Cuando se usa sobre secciones con fondo oscuro (como `CtaSection` con `mesh-gradient-dark`), hay que forzar `!bg-transparent` en el className del botón.
- **Inline styles no respetan dark mode.** Evitar `style={{ color: '#003667' }}` — usar clases CSS con variante `.dark` en `globals.css` o tokens semánticos de Tailwind (`text-on-surface`, `bg-surface-low`, etc.).
- **`mesh-gradient-dark`** es siempre azul oscuro independientemente del tema — no varía con light/dark. Usarlo solo en secciones que deben ser siempre oscuras (CTA, bloques de énfasis).
- **Fuente monoespaciada para números:** usar la clase `.data-mono` (JetBrains Mono, tabular-nums) en inputs y displays de valores financieros.

---

## Assets disponibles

Ubicados en `../Recursos/`:
- `certcollogo.png` — logo principal (para fondos claros)
- `logo_oscuro.png` — logo para fondos oscuros
- `favico.png` — favicon claro
- `favico_oscuro.png` — favicon oscuro

En `public/img/` (convertidos a WebP):
- `logo.webp` — logo actualmente en uso (Navbar y Footer)
- `favico.webp` — favicon actualmente en uso

---

## Referencias

- Propuesta comercial: `../Documentos/propuesta-certcol.docx`
- Stack tecnológico: `../Documentos/stack-tecnologico.docx`
- Diseño Stitch: proyecto ID `12730165767746243568`
  - Landing: screen `6b9136dbe4664889b660a63ad6f1903e`
  - Admin Panel: screen `aa68cf37570f477b85a0606c35ad24af`
