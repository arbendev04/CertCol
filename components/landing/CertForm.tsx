'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2, Info } from 'lucide-react'

import { leadSchema, type LeadFormValues } from '@/lib/validations/lead.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ─── Helpers de formato ──────────────────────────────────
function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function parseCOPInput(raw: string): number {
  const clean = raw.replace(/[^0-9]/g, '')
  return parseInt(clean, 10) || 0
}

// ─── Campo de error ──────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-sm text-red-500 mt-1" role="alert" aria-live="polite">
      {message}
    </p>
  )
}

// ─── Helper text ─────────────────────────────────────────
function HelperText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-on-surface/45 mt-1 flex items-center gap-1">
      <Info size={11} />
      {children}
    </p>
  )
}

export function CertForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [valorInversionDisplay, setValorInversionDisplay] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      condicion_venta: 'contado',
      certificado_emitido: true,
      necesita_recursos: false,
      habeas_data: false,
    },
  })

  const valorInversion = watch('valor_inversion')
  const certificadoEmitido = watch('certificado_emitido')
  const valorNominal = valorInversion ? Math.round(valorInversion * 1.65) : 0

  // Sincronizar valor nominal (solo lectura)
  useEffect(() => {
    if (valorNominal > 0) {
      setValue('valor_nominal', valorNominal)
    }
  }, [valorNominal, setValue])

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, valor_nominal: valorNominal }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Error al enviar el formulario')
      }

      router.push('/gracias')
    } catch (err) {
      console.error(err)
      alert('Ocurrió un error al enviar su solicitud. Por favor intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="formulario" className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-[#00C896] uppercase tracking-widest mb-4">
            Registre su certificado
          </p>
          <h2 className="text-4xl font-bold text-[#003667] mb-4">
            Inicie el proceso de venta
          </h2>
          <p className="text-on-surface/60 leading-relaxed">
            Complete el formulario con los datos de su Certificado de Inversión para el
            Desarrollo. Nuestro equipo se pondrá en contacto en menos de 24 horas.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-surface-bright rounded-2xl p-8 md:p-10 ambient-shadow-lg"
          noValidate
        >
          {/* ── SECCIÓN 1: Datos financieros ── */}
          <fieldset className="mb-10">
            <legend className="text-lg font-bold text-[#003667] mb-6 pb-3 border-b border-surface-container w-full">
              Datos financieros del certificado
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Valor de inversión */}
              <div>
                <Label htmlFor="valor_inversion" className="font-medium mb-2 block">
                  Valor de inversión <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="valor_inversion"
                  type="text"
                  inputMode="numeric"
                  placeholder="$10.000.000"
                  value={valorInversionDisplay}
                  onChange={(e) => {
                    const raw = e.target.value
                    const num = parseCOPInput(raw)
                    setValorInversionDisplay(num > 0 ? formatCOP(num) : '')
                    setValue('valor_inversion', num, { shouldValidate: true })
                  }}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                  aria-describedby="valor_inversion_helper"
                />
                <HelperText>Valor original que usted invirtió</HelperText>
                <FieldError message={errors.valor_inversion?.message} />
              </div>

              {/* Valor nominal (solo lectura) */}
              <div>
                <Label className="font-medium mb-2 block text-on-surface/60">
                  Valor nominal del CID
                  <span className="ml-2 text-xs font-normal text-[#0A4D8C] bg-[#0A4D8C]/8 px-2 py-0.5 rounded-full">
                    Solo lectura
                  </span>
                </Label>
                <Input
                  readOnly
                  value={valorNominal > 0 ? formatCOP(valorNominal) : '—'}
                  className="bg-surface-container border-0 text-[#0A4D8C] font-semibold h-12 cursor-default"
                  aria-label="Valor nominal calculado automáticamente"
                />
                <HelperText>Calculado automáticamente: inversión × 165%</HelperText>
              </div>
            </div>
          </fieldset>

          {/* ── SECCIÓN 2: Expectativas de venta ── */}
          <fieldset className="mb-10">
            <legend className="text-lg font-bold text-[#003667] mb-6 pb-3 border-b border-surface-container w-full">
              Expectativas de venta
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="porcentaje_min" className="font-medium mb-2 block">
                  Porcentaje mínimo de venta <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="porcentaje_min"
                    type="number"
                    min={0}
                    max={39}
                    step={0.5}
                    placeholder="Ej: 25"
                    {...register('porcentaje_min', { valueAsNumber: true })}
                    className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 text-sm font-medium">
                    %
                  </span>
                </div>
                <FieldError message={errors.porcentaje_min?.message} />
              </div>

              <div>
                <Label htmlFor="porcentaje_max" className="font-medium mb-2 block">
                  Porcentaje máximo de venta <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="porcentaje_max"
                    type="number"
                    min={0}
                    max={39}
                    step={0.5}
                    placeholder="Máx. 39"
                    {...register('porcentaje_max', { valueAsNumber: true })}
                    className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 text-sm font-medium">
                    %
                  </span>
                </div>
                <HelperText>Tope legal máximo: 39%</HelperText>
                <FieldError message={errors.porcentaje_max?.message} />
              </div>
            </div>
          </fieldset>

          {/* ── SECCIÓN 3: Datos del certificado ── */}
          <fieldset className="mb-10">
            <legend className="text-lg font-bold text-[#003667] mb-6 pb-3 border-b border-surface-container w-full">
              Datos del certificado
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nit" className="font-medium mb-2 block">
                  NIT del inversionista <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nit"
                  type="text"
                  placeholder="900.123.456-7"
                  {...register('nit')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <HelperText>Incluya el dígito de verificación (ej: 123456789-1)</HelperText>
                <FieldError message={errors.nit?.message} />
              </div>

              <div>
                <Label htmlFor="razon_social" className="font-medium mb-2 block">
                  Razón social <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="razon_social"
                  type="text"
                  placeholder="Nombre de la empresa o persona"
                  {...register('razon_social')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <FieldError message={errors.razon_social?.message} />
              </div>

              <div>
                <Label htmlFor="anio_inversion" className="font-medium mb-2 block">
                  Año de inversión <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="anio_inversion"
                  type="number"
                  placeholder={`Ej: ${new Date().getFullYear() - 1}`}
                  {...register('anio_inversion', { valueAsNumber: true })}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <FieldError message={errors.anio_inversion?.message} />
              </div>

              <div>
                <Label htmlFor="nombre_proyecto" className="font-medium mb-2 block">
                  Nombre del proyecto <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombre_proyecto"
                  type="text"
                  placeholder="Proyecto asociado al CID"
                  {...register('nombre_proyecto')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <FieldError message={errors.nombre_proyecto?.message} />
              </div>
            </div>

            {/* Estado del certificado */}
            <div className="mt-6">
              <Label className="font-medium mb-3 block">
                ¿El certificado ya fue emitido? <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-4">
                {[
                  { value: true, label: 'Sí, ya fue emitido' },
                  { value: false, label: 'No, aún no ha sido emitido' },
                ].map(({ value, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setValue('certificado_emitido', value, { shouldValidate: true })
                    }
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      certificadoEmitido === value
                        ? 'bg-[#0A4D8C] text-white ambient-shadow'
                        : 'bg-surface-low text-on-surface/60 hover:bg-surface-container'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <FieldError message={errors.certificado_emitido?.message} />
            </div>

            {/* Fecha estimada — condicional */}
            {certificadoEmitido === false && (
              <div className="mt-6 p-4 bg-[#1E90D4]/5 rounded-xl border border-[#1E90D4]/15">
                <Label htmlFor="fecha_emision" className="font-medium mb-2 block text-[#003667]">
                  Fecha estimada de emisión <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fecha_emision"
                  type="date"
                  {...register('fecha_emision')}
                  className="bg-white border-0 focus-visible:ring-[#1E90D4] h-12 max-w-xs"
                />
                <HelperText>Fecha aproximada en que se espera emitir el certificado</HelperText>
                <FieldError message={errors.fecha_emision?.message} />
              </div>
            )}
          </fieldset>

          {/* ── SECCIÓN 4: Condiciones de venta ── */}
          <fieldset className="mb-10">
            <legend className="text-lg font-bold text-[#003667] mb-6 pb-3 border-b border-surface-container w-full">
              Condiciones de venta
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-medium mb-3 block">
                  Forma de pago <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(val) =>
                    setValue('condicion_venta', val as 'contado' | 'credito', {
                      shouldValidate: true,
                    })
                  }
                  defaultValue="contado"
                >
                  <SelectTrigger className="bg-surface-low border-0 focus:ring-[#0A4D8C] h-12">
                    <SelectValue placeholder="Seleccione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contado">Contado</SelectItem>
                    <SelectItem value="credito">Crédito</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError message={errors.condicion_venta?.message} />
              </div>

              <div>
                <Label className="font-medium mb-3 block">
                  ¿Requiere recursos para ejecución? <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-4">
                  {[
                    { value: true, label: 'Sí' },
                    { value: false, label: 'No' },
                  ].map(({ value, label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setValue('necesita_recursos', value, { shouldValidate: true })
                      }
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        watch('necesita_recursos') === value
                          ? 'bg-[#0A4D8C] text-white ambient-shadow'
                          : 'bg-surface-low text-on-surface/60 hover:bg-surface-container'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* ── SECCIÓN 5: Datos de contacto ── */}
          <fieldset className="mb-10">
            <legend className="text-lg font-bold text-[#003667] mb-6 pb-3 border-b border-surface-container w-full">
              Datos de contacto
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nombre_contacto" className="font-medium mb-2 block">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombre_contacto"
                  type="text"
                  placeholder="Su nombre completo"
                  autoComplete="name"
                  {...register('nombre_contacto')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <FieldError message={errors.nombre_contacto?.message} />
              </div>

              <div>
                <Label htmlFor="email_contacto" className="font-medium mb-2 block">
                  Correo electrónico <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email_contacto"
                  type="email"
                  inputMode="email"
                  placeholder="correo@empresa.com"
                  autoComplete="email"
                  {...register('email_contacto')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
                />
                <FieldError message={errors.email_contacto?.message} />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="telefono_contacto" className="font-medium mb-2 block">
                  Teléfono / WhatsApp
                </Label>
                <Input
                  id="telefono_contacto"
                  type="tel"
                  inputMode="tel"
                  placeholder="+57 300 000 0000"
                  autoComplete="tel"
                  {...register('telefono_contacto')}
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12 max-w-xs"
                />
                <HelperText>Opcional — para contacto más rápido</HelperText>
                <FieldError message={errors.telefono_contacto?.message} />
              </div>
            </div>
          </fieldset>

          {/* ── Habeas Data ── */}
          <div className="mb-8 p-5 bg-surface-low rounded-xl">
            <div className="flex items-start gap-3">
              <Checkbox
                id="habeas_data"
                onCheckedChange={(checked) =>
                  setValue('habeas_data', checked === true, { shouldValidate: true })
                }
                className="mt-0.5 border-[#C2C6D2] data-[state=checked]:bg-[#0A4D8C] data-[state=checked]:border-[#0A4D8C]"
              />
              <div>
                <Label
                  htmlFor="habeas_data"
                  className="text-sm text-on-surface/70 leading-relaxed cursor-pointer"
                >
                  Acepto la{' '}
                  <a
                    href="/politica-de-datos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A4D8C] underline underline-offset-2 hover:text-[#003667]"
                  >
                    Política de Tratamiento de Datos Personales
                  </a>{' '}
                  de certCol, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.{' '}
                  <span className="text-red-500">*</span>
                </Label>
                <FieldError message={errors.habeas_data?.message} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl font-semibold text-base h-14 transition-all duration-200 hover:scale-[1.01] ambient-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Enviando solicitud...
              </>
            ) : (
              'Enviar solicitud de venta'
            )}
          </Button>

          <p className="text-center text-xs text-on-surface/40 mt-4">
            Al enviar este formulario acepta que certCol se ponga en contacto con usted.
            Puede revocar este consentimiento en cualquier momento.
          </p>
        </form>
      </div>
    </section>
  )
}
