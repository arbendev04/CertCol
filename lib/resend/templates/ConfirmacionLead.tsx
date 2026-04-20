import {
  Body, Container, Head, Heading, Hr, Html,
  Preview, Section, Text, Row, Column,
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
    nombre_contacto: string
    razon_social: string
    valor_inversion: number
    valor_nominal: number
    porcentaje_min: number
    porcentaje_max: number
  }
}

export function ConfirmacionLead({ data }: Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Recibimos tu solicitud de venta de CID — certCol</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>certCol</Heading>
            <Text style={tagline}>Certificados de Inversión para el Desarrollo</Text>
          </Section>

          {/* Saludo */}
          <Section style={content}>
            <Heading as="h2" style={h2}>
              Hola, {data.nombre_contacto}
            </Heading>
            <Text style={paragraph}>
              Recibimos tu solicitud de venta del CID de <strong>{data.razon_social}</strong>.
              Nuestro equipo revisará la información y se pondrá en contacto contigo
              en las próximas 24 a 48 horas hábiles.
            </Text>

            {/* Resumen */}
            <Section style={card}>
              <Text style={cardTitle}>Resumen de tu solicitud</Text>
              <Hr style={divider} />
              <Row>
                <Column style={labelCol}>
                  <Text style={label}>Valor de inversión</Text>
                </Column>
                <Column style={valueCol}>
                  <Text style={value}>{formatCOP(data.valor_inversion)}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={labelCol}>
                  <Text style={label}>Valor nominal del CID</Text>
                </Column>
                <Column style={valueCol}>
                  <Text style={{ ...value, color: '#0A4D8C', fontWeight: '700' }}>
                    {formatCOP(data.valor_nominal)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column style={labelCol}>
                  <Text style={label}>Rango de venta</Text>
                </Column>
                <Column style={valueCol}>
                  <Text style={value}>
                    {data.porcentaje_min}% – {data.porcentaje_max}%
                  </Text>
                </Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              Ante cualquier duda escribe a <strong>contacto@certcol.co</strong>
            </Text>
            <Text style={paragraph}>
              Gracias por confiar en certCol.
            </Text>
            <Text style={{ ...paragraph, marginTop: 0 }}>
              <strong>El equipo de certCol</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              certCol · Medellín, Colombia
            </Text>
            <Text style={footerText}>
              Este correo fue enviado porque completaste el formulario en certcol.co
            </Text>
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
  backgroundColor: '#0A4D8C',
  borderRadius: '16px 16px 0 0',
  padding: '32px 40px',
  textAlign: 'center' as const,
}

const logo = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  letterSpacing: '-0.5px',
}

const tagline = {
  color: 'rgba(255,255,255,0.65)',
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
  margin: '0 0 16px',
}

const paragraph = {
  color: '#424750',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const card = {
  backgroundColor: '#F6F3F2',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '24px 0',
}

const cardTitle = {
  color: '#003667',
  fontSize: '13px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  margin: '0 0 12px',
}

const divider = { borderColor: '#E8E4E2', margin: '0 0 16px' }

const labelCol = { width: '55%' }
const valueCol = { width: '45%' }

const label = {
  color: '#8A8F98',
  fontSize: '13px',
  margin: '4px 0',
}

const value = {
  color: '#1C1B1B',
  fontSize: '14px',
  fontWeight: '600',
  margin: '4px 0',
  textAlign: 'right' as const,
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
