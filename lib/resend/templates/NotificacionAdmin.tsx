import {
  Body, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column, Link,
} from '@react-email/components'

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

interface Props {
  data: {
    id: string
    nombre_contacto: string
    email_contacto: string
    telefono_contacto?: string
    razon_social: string
    nit: string
    anio_inversion: number
    nombre_proyecto: string
    certificado_emitido: boolean
    fecha_emision?: string | null
    condicion_venta: 'contado' | 'credito'
    necesita_recursos: boolean
    valor_inversion: number
    valor_nominal: number
    porcentaje_min: number
    porcentaje_max: number
  }
  savedToDb: boolean
}

interface DetailRow {
  label: string
  val: string
  highlight?: boolean
}

function buildRows(data: Props['data']): DetailRow[] {
  return [
    { label: 'Valor de inversión', val: formatCOP(data.valor_inversion) },
    { label: 'Valor nominal CID', val: formatCOP(data.valor_nominal), highlight: true },
    { label: 'Rango de venta', val: `${data.porcentaje_min}% – ${data.porcentaje_max}%` },
    { label: 'NIT', val: data.nit },
    { label: 'Año de inversión', val: String(data.anio_inversion) },
    { label: 'Proyecto', val: data.nombre_proyecto },
    { label: 'Certificado emitido', val: data.certificado_emitido ? 'Sí' : 'No' },
    ...(data.fecha_emision ? [{ label: 'Fecha estimada de emisión', val: data.fecha_emision }] : []),
    { label: 'Condición de venta', val: data.condicion_venta === 'contado' ? 'Contado' : 'Crédito' },
    { label: 'Necesita recursos', val: data.necesita_recursos ? 'Sí' : 'No' },
    { label: 'Contacto', val: data.nombre_contacto },
    { label: 'Email', val: data.email_contacto },
    ...(data.telefono_contacto ? [{ label: 'Celular', val: data.telefono_contacto }] : []),
  ]
}

export function NotificacionAdmin({ data, savedToDb }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const leadUrl = `${appUrl}/admin/leads/${data.id}`

  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo lead: {data.razon_social} — {formatCOP(data.valor_nominal)}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>certCol Admin</Heading>
            <Text style={tagline}>Nuevo lead recibido</Text>
          </Section>

          {/* Contenido */}
          <Section style={content}>
            <Heading as="h2" style={h2}>
              {data.razon_social}
            </Heading>

            {!savedToDb && (
              <Section style={warning}>
                <Text style={warningTitle}>Este lead NO quedó guardado en la base de datos</Text>
                <Text style={warningText}>
                  La base de datos no estaba disponible al recibir el formulario. Este correo es la
                  única copia: regístralo manualmente cuando la base de datos esté activa.
                </Text>
              </Section>
            )}

            <Section style={card}>
              <Text style={cardTitle}>Datos del lead</Text>
              <Hr style={divider} />

              {buildRows(data).map(({ label, val, highlight }) => (
                <Row key={label}>
                  <Column style={labelCol}>
                    <Text style={labelStyle}>{label}</Text>
                  </Column>
                  <Column style={valueCol}>
                    <Text style={highlight ? highlightValue : valueStyle}>{val}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {savedToDb && (
              <Section style={{ textAlign: 'center' as const, margin: '24px 0' }}>
                <Link href={leadUrl} style={button}>
                  Ver detalle en el panel →
                </Link>
              </Section>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>certCol · Panel administrativo</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ─── Estilos ──────────────────────────────────────────────
const body = {
  backgroundColor: '#F6F3F2',
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
}

const header = {
  backgroundColor: '#003667',
  borderRadius: '16px 16px 0 0',
  padding: '32px 40px',
  textAlign: 'center' as const,
}

const logo = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
}

const tagline = {
  color: 'rgba(255,255,255,0.6)',
  fontSize: '13px',
  margin: '4px 0 0',
}

const content = {
  backgroundColor: '#ffffff',
  padding: '40px',
}

const h2 = {
  color: '#003667',
  fontSize: '22px',
  fontWeight: '700',
  margin: '0 0 20px',
}

const card = {
  backgroundColor: '#F6F3F2',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 24px',
}

const cardTitle = {
  color: '#003667',
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  margin: '0 0 12px',
}

const divider = { borderColor: '#E8E4E2', margin: '0 0 16px' }

const warning = {
  backgroundColor: '#FFF4E5',
  borderRadius: '12px',
  padding: '16px 24px',
  margin: '0 0 24px',
}

const warningTitle = {
  color: '#9A4B00',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 6px',
}

const warningText = {
  color: '#5C3A12',
  fontSize: '13px',
  margin: '0',
}

const labelCol = { width: '45%' }
const valueCol = { width: '55%' }

const labelStyle = {
  color: '#8A8F98',
  fontSize: '13px',
  margin: '4px 0',
}

const valueStyle = {
  color: '#1C1B1B',
  fontSize: '13px',
  fontWeight: '600',
  margin: '4px 0',
  textAlign: 'right' as const,
}

const highlightValue = {
  ...valueStyle,
  color: '#0A4D8C',
  fontSize: '15px',
}

const button = {
  backgroundColor: '#0A4D8C',
  borderRadius: '10px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 28px',
  textDecoration: 'none',
}

const footer = {
  backgroundColor: '#F0EDEC',
  borderRadius: '0 0 16px 16px',
  padding: '20px 40px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#8A8F98',
  fontSize: '12px',
  margin: '4px 0',
}
