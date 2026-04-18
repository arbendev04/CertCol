'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2, Info, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'

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

// ─── Helpers ─────────────────────────────────────────────
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-sm text-red-500 mt-1.5" role="alert" aria-live="polite">
      {message}
    </p>
  )
}

function HelperText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[#424750]/50 mt-1.5 flex items-center gap-1">
      <Info size={11} />
      {children}
    </p>
  )
}

// ─── Configuración de pasos ───────────────────────────────
const STEPS = [
  { label: 'Datos financieros', short: 'Financiero' },
  { label: 'Datos del certificado', short: 'Certificado' },
  { label: 'Datos de contacto', short: 'Contacto' },
]

export function CertForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [valorInversionDisplay, setValorInversionDisplay] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
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

  useEffect(() => {
    if (valorNominal > 0) setValue('valor_nominal', valorNominal)
  }, [valorNominal, setValue])

  // Campos a validar por paso antes de avanzar
  const stepFields: (keyof LeadFormValues)[][] = [
    ['valor_inversion', 'porcentaje_min', 'porcentaje_max'],
    ['nit', 'razon_social', 'anio_inversion', 'nombre_proyecto', 'certificado_emitido'],
    ['nombre_contacto', 'email_contacto', 'habeas_data'],
  ]

  const handleNext = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => s - 1)

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
      window.location.href = '/gracias'
    } catch (err) {
      console.error(err)
      alert('Ocurrió un error al enviar su solicitud. Por favor intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((step) / (STEPS.length - 1)) * 100

  return (
    <div>

        {/* Indicador de pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step ? 'step-dot-done' : i === step ? 'step-dot-current' : 'step-dot-pending'
                  }`}
                >
                  {i < step ? <CheckCircle2 size={14} /> : <span className="data-mono">{i + 1}</span>}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                    i === step ? 'text-on-surface font-semibold' : 'text-[#424750]/50'
                  }`}
                >
                  {s.short}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 sm:w-20 h-px mx-2 ${i < step ? 'step-line-done' : 'step-line-pending'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="h-1 rounded-full bg-on-surface/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 progress-bar-fill"
              style={{ width: `${step === 0 ? 5 : progress}%` }}
            />
          </div>
          <p className="text-right text-xs text-on-surface-variant/50 mt-1.5 font-[family-name:var(--font-mono)]">
            Paso {step + 1} de {STEPS.length}
          </p>
        </div>

        {/* Tarjeta del formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="glass rounded-2xl p-6 sm:p-8 md:p-10"
        >
          <h3 className="text-lg font-bold text-[#003667] mb-6">
            {STEPS[step].label}
          </h3>

          {/* ── PASO 1: Datos financieros ── */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="valor_inversion" className="font-medium mb-2 block text-sm">
                    Valor de inversión <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="valor_inversion"
                    type="text"
                    inputMode="numeric"
                    placeholder="$10.000.000"
                    value={valorInversionDisplay}
                    onChange={(e) => {
                      const num = parseCOPInput(e.target.value)
                      setValorInversionDisplay(num > 0 ? formatCOP(num) : '')
                      setValue('valor_inversion', num, { shouldValidate: true })
                    }}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 data-mono"
                  />
                  <HelperText>Valor original que usted invirtió</HelperText>
                  <FieldError message={errors.valor_inversion?.message} />
                </div>

                <div>
                  <Label className="font-medium mb-2 block text-sm text-[#424750]/70">
                    Valor nominal del CID
                    <span className="ml-2 text-xs font-normal text-[#0A4D8C] bg-[#0A4D8C]/8 px-2 py-0.5 rounded-full">
                      Solo lectura
                    </span>
                  </Label>
                  <Input
                    readOnly
                    value={valorNominal > 0 ? formatCOP(valorNominal) : '—'}
                    className="bg-[#F0EDEC] border-0 text-[#0A4D8C] font-semibold h-12 cursor-default data-mono"
                    aria-label="Valor nominal calculado automáticamente"
                  />
                  <HelperText>Calculado: inversión × 165%</HelperText>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="porcentaje_min" className="font-medium mb-2 block text-sm">
                    % mínimo de venta <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="porcentaje_min"
                      type="number"
                      min={0} max={57} step={0.5}
                      placeholder="Ej: 25"
                      {...register('porcentaje_min', { valueAsNumber: true })}
                      className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 pr-10 data-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#424750]/40 text-sm font-medium data-mono">%</span>
                  </div>
                  <FieldError message={errors.porcentaje_min?.message} />
                </div>

                <div>
                  <Label htmlFor="porcentaje_max" className="font-medium mb-2 block text-sm">
                    % máximo de venta <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="porcentaje_max"
                      type="number"
                      min={0} max={57} step={0.5}
                      placeholder="Máx. 57"
                      {...register('porcentaje_max', { valueAsNumber: true })}
                      className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 pr-10 data-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#424750]/40 text-sm font-medium data-mono">%</span>
                  </div>
                  <HelperText>Tope legal máximo: 57%</HelperText>
                  <FieldError message={errors.porcentaje_max?.message} />
                </div>
              </div>
            </div>
          )}

          {/* ── PASO 2: Datos del certificado ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="nit" className="font-medium mb-2 block text-sm">
                    NIT del inversionista <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nit"
                    type="text"
                    placeholder="900.123.456-7"
                    {...register('nit')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 data-mono"
                  />
                  <HelperText>Incluya el dígito de verificación</HelperText>
                  <FieldError message={errors.nit?.message} />
                </div>

                <div>
                  <Label htmlFor="razon_social" className="font-medium mb-2 block text-sm">
                    Razón social <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="razon_social"
                    type="text"
                    placeholder="Nombre de la empresa"
                    {...register('razon_social')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12"
                  />
                  <FieldError message={errors.razon_social?.message} />
                </div>

                <div>
                  <Label htmlFor="anio_inversion" className="font-medium mb-2 block text-sm">
                    Año de inversión <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="anio_inversion"
                    type="number"
                    placeholder={`Ej: ${new Date().getFullYear() - 1}`}
                    {...register('anio_inversion', { valueAsNumber: true })}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 data-mono"
                  />
                  <FieldError message={errors.anio_inversion?.message} />
                </div>

                <div>
                  <Label htmlFor="nombre_proyecto" className="font-medium mb-2 block text-sm">
                    Nombre del proyecto <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombre_proyecto"
                    type="text"
                    placeholder="Proyecto asociado al CID"
                    {...register('nombre_proyecto')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12"
                  />
                  <FieldError message={errors.nombre_proyecto?.message} />
                </div>
              </div>

              <div>
                <Label className="font-medium mb-3 block text-sm">
                  ¿El certificado ya fue emitido? <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3">
                  {[{ value: true, label: 'Sí, ya fue emitido' }, { value: false, label: 'No, aún no' }].map(
                    ({ value, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setValue('certificado_emitido', value, { shouldValidate: true })}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                          certificadoEmitido === value ? 'toggle-btn-on' : 'toggle-btn-off'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>

              {certificadoEmitido === false && (
                <div className="form-conditional-bg p-4 rounded-xl">
                  <Label htmlFor="fecha_emision" className="font-medium mb-2 block text-sm text-[#003667]">
                    Fecha estimada de emisión <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fecha_emision"
                    type="date"
                    {...register('fecha_emision')}
                    className="bg-surface-container border-0 focus-visible:ring-[#1E90D4] h-12 max-w-xs data-mono"
                  />
                  <HelperText>Fecha aproximada en que se espera emitir</HelperText>
                  <FieldError message={errors.fecha_emision?.message} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="font-medium mb-2 block text-sm">
                    Forma de pago <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(val) =>
                      setValue('condicion_venta', val as 'contado' | 'credito', { shouldValidate: true })
                    }
                    defaultValue="contado"
                  >
                    <SelectTrigger className="bg-[#F6F3F2] border-0 focus:ring-[#0A4D8C] h-12">
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contado">Contado</SelectItem>
                      <SelectItem value="credito">Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium mb-2 block text-sm">
                    ¿Requiere recursos para ejecución? <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-3 mt-1">
                    {[{ value: true, label: 'Sí' }, { value: false, label: 'No' }].map(({ value, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setValue('necesita_recursos', value, { shouldValidate: true })}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                          watch('necesita_recursos') === value ? 'toggle-btn-on' : 'toggle-btn-off'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PASO 3: Datos de contacto ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="nombre_contacto" className="font-medium mb-2 block text-sm">
                    Nombre completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombre_contacto"
                    type="text"
                    placeholder="Su nombre completo"
                    autoComplete="name"
                    {...register('nombre_contacto')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12"
                  />
                  <FieldError message={errors.nombre_contacto?.message} />
                </div>

                <div>
                  <Label htmlFor="email_contacto" className="font-medium mb-2 block text-sm">
                    Correo electrónico <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email_contacto"
                    type="email"
                    inputMode="email"
                    placeholder="correo@empresa.com"
                    autoComplete="email"
                    {...register('email_contacto')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12"
                  />
                  <FieldError message={errors.email_contacto?.message} />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="telefono_contacto" className="font-medium mb-2 block text-sm">
                    Teléfono / WhatsApp
                  </Label>
                  <Input
                    id="telefono_contacto"
                    type="tel"
                    inputMode="tel"
                    placeholder="+57 300 000 0000"
                    autoComplete="tel"
                    {...register('telefono_contacto')}
                    className="bg-[#F6F3F2] border-0 focus-visible:ring-[#0A4D8C] h-12 max-w-xs data-mono"
                  />
                  <HelperText>Opcional — para contacto más rápido</HelperText>
                  <FieldError message={errors.telefono_contacto?.message} />
                </div>
              </div>

              {/* Habeas Data */}
              <div className="p-4 rounded-xl bg-surface-low">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="habeas_data"
                    onCheckedChange={(checked) =>
                      setValue('habeas_data', checked === true, { shouldValidate: true })
                    }
                    className="mt-1 shrink-0 border-[#C2C6D2] data-[state=checked]:bg-[#0A4D8C] data-[state=checked]:border-[#0A4D8C]"
                  />
                  <div>
                    <Label htmlFor="habeas_data" className="text-sm text-[#424750] leading-relaxed cursor-pointer">
                      Acepto la{' '}
                      <a
                        href="/politica-de-datos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A4D8C] underline underline-offset-2 hover:text-[#003667] font-medium"
                      >
                        Política de Tratamiento de Datos Personales
                      </a>
                      {' '}de certCol, conforme a la Ley 1581 de 2012.{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <FieldError message={errors.habeas_data?.message} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Navegación entre pasos ── */}
          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="border-[#C2C6D2]/40 hover:bg-[#F6F3F2] text-[#424750] rounded-xl font-semibold h-12 px-6 transition-all duration-200"
              >
                <ArrowLeft size={16} className="mr-2" />
                Atrás
              </Button>
            )}

            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl font-semibold h-12 transition-all duration-200 hover:scale-[1.01]"
                style={{ boxShadow: '0 4px 40px rgba(10,77,140,0.25)' }}
              >
                Siguiente paso
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl font-semibold h-12 transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ boxShadow: '0 4px 40px rgba(10,77,140,0.25)' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    Enviar solicitud de venta
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          {step === STEPS.length - 1 && (
            <p className="text-center text-xs text-white/40 mt-4">
              Al enviar acepta que certCol se ponga en contacto con usted. Puede revocar este consentimiento en cualquier momento.
            </p>
          )}
        </form>
    </div>
  )
}
