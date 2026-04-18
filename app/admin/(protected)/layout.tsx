import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { LayoutDashboard, LogOut, ExternalLink } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-dvh bg-surface-container flex">

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 sticky top-0 h-dvh flex flex-col glass border-r border-outline-variant/20">

        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-outline-variant/15">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/img/logo.webp"
              alt="certCol"
              width={130}
              height={40}
              className="h-9 w-auto block dark:hidden"
            />
            <Image
              src="/img/cert.webp"
              alt="certCol"
              width={130}
              height={40}
              className="h-9 w-auto hidden dark:block"
            />
            <span className="text-[10px] font-semibold text-on-surface-variant/50 bg-surface-container px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)] uppercase tracking-wider">
              Admin
            </span>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] font-semibold text-on-surface-variant/40 uppercase tracking-[0.12em] px-3 mb-3 font-[family-name:var(--font-mono)]">
            Principal
          </p>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#003667] dark:text-brand-primary bg-[#0A4D8C]/8 dark:bg-brand-primary/10 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg icon-bg-primary flex items-center justify-center shrink-0">
              <LayoutDashboard size={14} className="icon-primary" />
            </div>
            Dashboard
          </Link>
        </nav>

        {/* Footer del sidebar */}
        <div className="px-3 pb-4 space-y-1 border-t border-outline-variant/15 pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
              <ExternalLink size={14} className="text-on-surface-variant/50" />
            </div>
            Ver landing
          </Link>

          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant/60 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                <LogOut size={14} className="text-on-surface-variant/50" />
              </div>
              Cerrar sesión
            </button>
          </form>

          {/* Info usuario */}
          <div className="mt-2 p-3 rounded-xl bg-surface-container border border-outline-variant/15">
            <p className="text-xs font-medium text-[#003667] dark:text-brand-primary truncate">{user.email}</p>
            <p className="text-[10px] text-on-surface-variant/40 mt-0.5 font-[family-name:var(--font-mono)]">Administrador</p>
          </div>
        </div>
      </aside>

      {/* ── Contenido principal ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-16 sticky top-0 z-40 glass border-b border-outline-variant/15 flex items-center px-8 justify-between">
          <div>
            <h1 className="text-sm font-semibold text-[#003667] dark:text-brand-primary">Panel de administración</h1>
            <p className="text-xs text-on-surface-variant/40 font-[family-name:var(--font-mono)]">certCol — CID Colombia</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00C896]" />
              <span className="text-xs text-on-surface-variant/50">Sistema activo</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 px-6 py-8 lg:px-8">
          {children}
        </main>
      </div>

    </div>
  )
}
