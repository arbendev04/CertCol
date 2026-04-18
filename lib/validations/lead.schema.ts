import { z } from 'zod'

// ─── Esquema principal del formulario ────────────────────
export const leadSchema = z
  .object({
    // Datos financieros
    valor_inversion: z
      .number({ message: 'El valor de inversión es obligatorio' })
      .positive('Debe ser un valor positivo')
      .min(1_000_000, 'El valor mínimo es $1.000.000 COP'),

    valor_nominal: z
      .number()
      .positive()
      .optional(), // Calculado automáticamente: valor_inversion * 1.65

    // Expectativas de venta
    porcentaje_min: z
      .number({ message: 'El porcentaje mínimo es obligatorio' })
      .min(0, 'Debe ser mayor o igual a 0')
      .max(57, 'El porcentaje no puede superar el 57%'),

    porcentaje_max: z
      .number({ message: 'El porcentaje máximo es obligatorio' })
      .min(0, 'Debe ser mayor o igual a 0')
      .max(57, 'El porcentaje no puede superar el 57%'),

    // Datos de validación del título
    nit: z
      .string({ message: 'El NIT es obligatorio' })
      .min(1, 'El NIT es obligatorio'),

    razon_social: z
      .string({ message: 'La razón social es obligatoria' })
      .min(2, 'La razón social debe tener al menos 2 caracteres')
      .max(200, 'Máximo 200 caracteres'),

    anio_inversion: z
      .number({ message: 'El año de inversión es obligatorio' })
      .int('Debe ser un año entero')
      .min(2000, 'El año debe ser posterior al 2000')
      .max(new Date().getFullYear() + 10, `El año no puede ser mayor a ${new Date().getFullYear() + 10}`),

    nombre_proyecto: z
      .string({ message: 'El nombre del proyecto es obligatorio' })
      .min(2, 'Mínimo 2 caracteres')
      .max(300, 'Máximo 300 caracteres'),

    // Estado del certificado
    certificado_emitido: z.boolean({
      message: 'Indique si el certificado fue emitido',
    }),

    fecha_emision: z
      .string()
      .optional()
      .nullable(), // Solo requerido si certificado_emitido = false

    // Condiciones de venta
    condicion_venta: z.enum(['contado', 'credito'], {
      message: 'Seleccione la condición de venta',
    }),

    necesita_recursos: z.boolean({
      message: 'Indique si necesita recursos para ejecución',
    }),

    // Datos de contacto
    nombre_contacto: z
      .string({ message: 'Su nombre es obligatorio' })
      .min(2, 'Mínimo 2 caracteres')
      .max(100, 'Máximo 100 caracteres'),

    email_contacto: z
      .string({ message: 'El correo electrónico es obligatorio' })
      .email('Ingrese un correo electrónico válido'),

    telefono_contacto: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^(\+57)?[0-9]{10}$/.test(val.replace(/\s/g, '')),
        { message: 'Ingrese un número de teléfono colombiano válido (10 dígitos)' }
      ),

    // Habeas Data — Ley 1581 de 2012
    habeas_data: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Debe aceptar la política de tratamiento de datos personales para continuar',
      }),
  })
  .refine(
    (data) => data.porcentaje_min <= data.porcentaje_max,
    {
      message: 'El porcentaje mínimo no puede ser mayor al máximo',
      path: ['porcentaje_min'],
    }
  )
  .refine(
    (data) => {
      // Si el certificado NO fue emitido, la fecha estimada es obligatoria
      if (data.certificado_emitido === false) {
        return !!data.fecha_emision
      }
      return true
    },
    {
      message: 'Ingrese la fecha estimada de emisión del certificado',
      path: ['fecha_emision'],
    }
  )

export type LeadFormValues = z.infer<typeof leadSchema>

export const leadServerSchema = leadSchema
