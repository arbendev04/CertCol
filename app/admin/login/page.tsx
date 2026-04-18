'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Correo o contraseña incorrectos. Verifique sus datos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-dvh mesh-gradient flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/img/logo-claro.webp"
            alt="certCol"
            width={140}
            height={42}
            className="h-10 w-auto mx-auto mb-3 block dark:hidden"
            priority
          />
          <Image
            src="/img/logo-oscuro.webp"
            alt="certCol"
            width={140}
            height={42}
            className="h-10 w-auto mx-auto mb-3 hidden dark:block"
            priority
          />
          <p className="text-on-surface/50 text-sm">Panel administrativo</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 ambient-shadow-lg">
          <h1 className="text-2xl font-bold text-[#003667] mb-6">Iniciar sesión</h1>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="email" className="font-medium mb-2 block">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@certcol.co"
                className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-medium mb-2 block">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-surface-low border-0 focus-visible:ring-[#0A4D8C] h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 hover:text-on-surface/70 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-3" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl h-12 font-semibold transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-on-surface/35 mt-6">
          Acceso restringido a personal autorizado de certCol
        </p>
      </div>
    </main>
  )
}
