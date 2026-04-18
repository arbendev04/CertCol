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
| Framework | Next.js 16.2.3 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Motion v12 |
| Componentes UI | shadcn/ui |
| Formularios | React Hook Form + Zod |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | Supabase Auth |
| Correo | Resend + React Email |
| Hosting | Vercel |
| Dominio | .co / .com.co (pendiente) |

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
│   ├── layout.tsx                  # Layout raíz, fuentes, providers, metadata SEO, schema JSON-LD
│   ├── page.tsx                    # Landing page pública + schema FAQ JSON-LD
│   ├── sitemap.ts                  # Sitemap dinámico (/sitemap.xml)
│   ├── robots.ts                   # robots.txt — bloquea /admin y /api
│   ├── gracias/page.tsx            # Página de confirmación post-formulario (noindex)
│   ├── politica-de-datos/page.tsx  # Política de datos (Ley 1581/2012)
│   ├── terminos/page.tsx           # Términos y condiciones
│   ├── admin/
│   │   ├── (protected)/            # Route group — rutas protegidas por auth
│   │   │   ├── layout.tsx          # Layout del panel con sidebar (verifica sesión)
│   │   │   ├── page.tsx            # Dashboard principal
│   │   │   └── leads/
│   │   │       └── [id]/page.tsx   # Detalle de un lead
│   │   └── login/
│   │       ├── layout.tsx          # noindex para el login
│   │       └── page.tsx            # Login del admin (fuera del layout protegido)
│   └── api/
│       ├── auth/signout/route.ts   # POST cerrar sesión
│       ├── leads/route.ts          # POST crear lead, GET listar leads
│       └── leads/[id]/route.ts     # GET/PATCH detalle de lead
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx              # Navbar sticky con glass y ThemeToggle
│   │   ├── Hero.tsx                # Hero con mesh gradient y CertForm
│   │   ├── WhatIsACID.tsx          # Educación financiera + bloque cálculo
│   │   ├── HowItWorks.tsx          # 4 pasos del proceso
│   │   ├── Benefits.tsx            # Grid de 6 beneficios
│   │   ├── CtaSection.tsx          # CTA dark con stats
│   │   ├── CertForm.tsx            # Formulario multistep principal (3 pasos, mode: onTouched)
│   │   └── Footer.tsx              # Footer adaptativo (tema claro/oscuro)
│   ├── admin/
│   │   ├── LeadsTable.tsx          # Tabla con filtros por estado
│   │   └── ExportButton.tsx        # Export CSV con BOM UTF-8
│   └── ui/
│       ├── FadeIn.tsx              # Componente de animación reutilizable (Motion v12)
│       └── ...                     # Componentes shadcn/ui + ThemeToggle
├── lib/
│   ├── validations/
│   │   └── lead.schema.ts          # Esquema Zod + validación NIT algoritmo DIAN
│   ├── supabase/
│   │   ├── client.ts               # Cliente browser (@supabase/ssr)
│   │   └── server.ts               # Cliente server con cookie handling
│   └── resend/
│       ├── emails.ts               # sendConfirmacionLead + sendNotificacionAdmin
│       └── templates/
│           ├── ConfirmacionLead.tsx # Email al lead (React Email)
│           └── NotificacionAdmin.tsx# Email al admin con link al panel
├── types/
│   └── lead.ts                     # Tipos Lead, LeadEstado, ESTADO_LABELS/COLORS
└── public/
    └── img/
        ├── logo-claro.webp         # Logo para fondos claros (modo light)
        ├── logo-oscuro.webp        # Logo para fondos oscuros (modo dark)
        ├── favico.webp             # Favicon claro
        ├── favico-oscuro.webp      # Favicon oscuro
        └── og.webp                 # OG image (1200×630) para previews en redes
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

## Notas de infraestructura

- **Supabase URL:** `https://nxygjavaxsgwhimlvvzs.supabase.co`
- **Keys:** formato nuevo `sb_publishable_` / `sb_secret_` (compatible con @supabase/ssr ^0.10)
- **RLS leads:** política de insert sin `to anon` — el formato nuevo de keys no mapea igual al rol anon
- **Resend:** modo sandbox — solo envía a `arbendev04@gmail.com`. Cambiar `RESEND_FROM_EMAIL` a `noreply@certcol.co` cuando el dominio esté verificado
- **Next.js 16:** `middleware.ts` deprecado — usar route groups `(protected)` para protección de rutas en su lugar
- **Admin auth:** protección vía `app/admin/(protected)/layout.tsx` que llama a `supabase.auth.getUser()` y redirige si no hay sesión
- **Vercel:** proyecto desplegado y activo. Variables de entorno configuradas en el panel de Vercel.
- **Resend en Vercel:** `new Resend(key)` debe instanciarse dentro de cada función, NO en el top-level del módulo — de lo contrario el build falla si la env var no está presente.
- **baseUrl:** usar `||` (no `??`) para el fallback de `NEXT_PUBLIC_APP_URL` — `??` no protege contra strings vacíos y `new URL('')` lanza Invalid URL.

---

## Historial de cambios

### 2026-04-18 — Despliegue Vercel, animaciones y SEO

- [x] **Despliegue en Vercel:** proyecto conectado a `arbendev04/CertCol` en GitHub. Variables de entorno configuradas. Deploy exitoso.
- [x] **Fix Resend build:** `new Resend()` movido dentro de cada función para evitar error de build cuando la env var no existe en tiempo de compilación.
- [x] **Logos renombrados:** `logo.webp` → `logo-claro.webp`, `cert.webp` → `logo-oscuro.webp`. Actualizadas todas las referencias en Navbar, Footer, admin panel y login.
- [x] **Logo dark mode en admin:** panel admin y login ahora usan `logo-oscuro.webp` en dark mode (mismo patrón que Navbar).
- [x] **Animaciones con Motion v12:** componente reutilizable `FadeIn` en `components/ui/FadeIn.tsx`. Aplicado en Hero (título + formulario), WhatIsACID (header + cards + bloque cálculo), HowItWorks (header + pasos escalonados), Benefits (header + cards escalonadas), CtaSection (texto desde derecha, card desde izquierda).
- [x] **SEO completo:**
  - Metadata global mejorada: título con keyword principal, description orientada a conversión, `metadataBase`
  - OG tags completos: `og:image` (`og.webp` 1200×630), `og:url`, `og:siteName`, Twitter card
  - `sitemap.xml` dinámico (`app/sitemap.ts`) — indexa `/`, `/politica-de-datos`, `/terminos`
  - `robots.txt` (`app/robots.ts`) — bloquea `/admin`, `/api/`
  - Schema JSON-LD Organización en layout raíz
  - Schema JSON-LD FAQPage en landing (4 preguntas)
  - `noindex` en `/gracias` y `/admin/login`
  - Canonical tags en páginas legales
  - Fix `Invalid URL`: cambiado `??` por `||` en `baseUrl` para proteger contra strings vacíos

### 2026-04-16 — Supabase, panel admin, Resend y páginas legales (commit f508323)
- [x] **Supabase:** creada tabla `leads` con todos los campos del modelo, RLS habilitado con política de insert pública (sin `to anon` por incompatibilidad con keys nuevas `sb_publishable_`).
- [x] **Panel admin:** reestructurado con route group `(protected)` para evitar redirect loop en Next.js 16 (middleware.ts deprecado). Login en `/admin/login` fuera del layout protegido.
- [x] **Resend:** instalado `@react-email/render`, creadas plantillas `ConfirmacionLead` y `NotificacionAdmin`. Envío paralelo desde `POST /api/leads`. Modo sandbox activo hasta tener dominio.
- [x] **Formulario:** modo de validación cambiado a `onTouched` para mostrar errores al salir del campo.
- [x] **Páginas legales:** `/politica-de-datos` (Ley 1581/2012, 8 secciones) y `/terminos` (9 secciones, ley colombiana).
- [x] **API:** `PATCH /api/leads/[id]` actualiza `updated_at` correctamente.

### 2026-04-15 — Mejoras UI/UX, dark mode y responsividad (commit f996464)
- [x] Dark mode completo en la landing con tokens semánticos.
- [x] Clases utilitarias propias en `globals.css`.
- [x] Responsividad general en todas las secciones.

### 2026-04-09 — Revisión visual y Corrección de Bugs
- [x] Inicializado proyecto Next.js 15 → 16 (App Router).
- [x] Configuración de Tailwind v4 y shadcn/ui.
- [x] Esquema Zod + React Hook Form (`lead.schema.ts`).
- [x] Landing page principal desarrollada.

### 2026-04-08 — Sesión inicial
- [x] Leídos documentos de propuesta y stack tecnológico.
- [x] Creada carpeta `certcol-web/` y `CLAUDE.md`.
- [x] Arquitectura, design system y modelo de datos definidos.

---

## Pendientes / Roadmap

### Completado ✅
- [x] Tabla `leads` en Supabase con RLS configurado
- [x] API Routes: `POST /api/leads`, `GET /api/leads`, `GET/PATCH /api/leads/[id]`
- [x] Panel administrativo: Login, Dashboard, Detalle de lead
- [x] Autenticación admin con Supabase Auth (route group `(protected)`)
- [x] Correo de confirmación al lead + notificación al admin (Resend + React Email)
- [x] Página `/gracias` con diseño completo
- [x] Páginas legales `/politica-de-datos` y `/terminos`
- [x] Export CSV con BOM UTF-8 para Excel
- [x] Despliegue en Vercel
- [x] Animaciones con Motion (FadeIn al scroll en todas las secciones)
- [x] SEO: metadata, OG image, sitemap, robots.txt, schema JSON-LD

### Pendiente
- [ ] **Dominio:** configurar dominio `.co` o `.com.co` en Vercel y actualizar `RESEND_FROM_EMAIL` a `noreply@certcol.co`. Actualizar `NEXT_PUBLIC_APP_URL` en Vercel con el dominio final.

---

## Notas técnicas importantes

- **`variant="outline"` de shadcn/ui** inyecta `bg-background`. Sobre fondos oscuros usar `!bg-transparent`.
- **Inline styles no respetan dark mode.** Usar clases CSS con variante `.dark` en `globals.css` o tokens semánticos de Tailwind.
- **`mesh-gradient-dark`** es siempre azul oscuro — no varía con light/dark. Solo para secciones permanentemente oscuras.
- **Fuente monoespaciada para números:** clase `.data-mono` (JetBrains Mono, tabular-nums).
- **`new Resend(key)` debe ir dentro de cada función**, no en el top-level del módulo.
- **`baseUrl` con `||`**, no `??` — protege contra strings vacíos en env vars de Vercel.
- **Logos:** siempre usar dos `<Image>` con `block dark:hidden` / `hidden dark:block` — no usar `dark:brightness-0 dark:invert` sobre logos de color.

---

## Assets en `public/img/`

| Archivo | Uso |
|---------|-----|
| `logo-claro.webp` | Logo modo light (Navbar, Footer, admin) |
| `logo-oscuro.webp` | Logo modo dark (Navbar, Footer, admin) |
| `favico.webp` | Favicon claro |
| `favico-oscuro.webp` | Favicon oscuro |
| `og.webp` | OG image 1200×630 para redes sociales |

---

## Referencias

- Propuesta comercial: `../Documentos/propuesta-certcol.docx`
- Stack tecnológico: `../Documentos/stack-tecnologico.docx`
- Diseño Stitch: proyecto ID `12730165767746243568`
  - Landing: screen `6b9136dbe4664889b660a63ad6f1903e`
  - Admin Panel: screen `aa68cf37570f477b85a0606c35ad24af`
- Repositorio: `https://github.com/arbendev04/CertCol`
- Deploy: Vercel (conectado a rama `main`)
