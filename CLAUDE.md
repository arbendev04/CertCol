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
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhatIsACID.tsx
│   │   ├── Benefits.tsx
│   │   ├── CertForm.tsx            # Formulario principal
│   │   └── Footer.tsx
│   ├── admin/
│   │   ├── LeadsTable.tsx
│   │   ├── LeadDetail.tsx
│   │   └── ExportButton.tsx
│   └── ui/                         # Componentes shadcn/ui
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
    └── (logos, favicons)
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

### 2026-04-08 — Sesión inicial
- [x] Leídos documentos: `propuesta-certcol.docx` y `stack-tecnologico.docx`
- [x] Consultado proyecto CertCol en Stitch MCP (ID: `12730165767746243568`)
- [x] Creada carpeta `certcol-web/`
- [x] Creado `CLAUDE.md` con arquitectura, design system y modelo de datos
- [ ] Inicializar proyecto Next.js 15
- [ ] Configurar Tailwind v4 + design tokens del sistema Stitch
- [ ] Instalar y configurar shadcn/ui
- [ ] Crear esquema Zod del formulario
- [ ] Desarrollar landing page (Hero, WhatIsACID, HowItWorks, Benefits, Form, Footer)
- [ ] Desarrollar panel administrativo (Login, Dashboard, Detalle)
- [ ] Configurar Supabase (cliente + tipos)
- [ ] Configurar Resend (plantillas de correo)

---

## Assets disponibles

Ubicados en `../Recursos/`:
- `certcollogo.png` — logo principal (fondo claro)
- `logo_oscuro.png` — logo para fondos oscuros
- `favico.png` — favicon claro
- `favico_oscuro.png` — favicon oscuro

---

## Referencias

- Propuesta comercial: `../Documentos/propuesta-certcol.docx`
- Stack tecnológico: `../Documentos/stack-tecnologico.docx`
- Diseño Stitch: proyecto ID `12730165767746243568`
  - Landing: screen `6b9136dbe4664889b660a63ad6f1903e`
  - Admin Panel: screen `aa68cf37570f477b85a0606c35ad24af`
