import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { LayoutDashboard, LogOut, HelpCircle } from 'lucide-react'
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
    <div className="min-h-dvh bg-[#F0EDEC] flex">

      {/* ── Sidebar ── */}
      <aside
        className="w-64 shrink-0 sticky top-0 h-dvh flex flex-col bg-white/65 backdrop-blur-[24px]"
        style={{ borderRight: '1px solid rgba(194, 198, 210, 0.15)', boxShadow: '4px 0 40px rgba(10, 77, 140, 0.04)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid rgba(194, 198, 210, 0.12)' }}>
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/img/logo.webp" alt="certCol" width={150} height={45} className="h-[42px] w-auto" />
            <span className="text-[10px] font-semibold text-[#424750]/50 bg-[#F0EDEC] px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)] uppercase tracking-wider">
              Admin
            </span>
          </Link>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] font-semibold text-[#424750]/40 uppercase tracking-[0.12em] px-3 mb-3 font-[family-name:var(--font-mono)]">
            Principal
          </p>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#003667] bg-[#0A4D8C]/8 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0A4D8C] flex items-center justify-center shrink-0">
              <LayoutDashboard size={14} className="text-white" />
            </div>
            Dashboard
          </Link>
        </nav>

        {/* Footer del sidebar */}
        <div className="px-3 pb-4 space-y-1" style={{ borderTop: '1px solid rgba(194, 198, 210, 0.12)' }}>
          <div className="pt-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#424750]/60 hover:text-[#003667] hover:bg-[#F0EDEC] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F0EDEC] flex items-center justify-center shrink-0">
                <HelpCircle size={14} className="text-[#424750]/50" />
              </div>
              Ver landing
            </Link>

            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#424750]/60 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#F0EDEC] flex items-center justify-center shrink-0">
                  <LogOut size={14} className="text-[#424750]/50" />
                </div>
                Cerrar sesión
              </button>
            </form>
          </div>

          {/* Info de usuario */}
          <div
            className="mt-2 mx-0 p-3 rounded-xl bg-[#F6F3F2]"
            style={{ border: '1px solid rgba(194, 198, 210, 0.2)' }}
          >
            <p className="text-xs font-medium text-[#003667] truncate">{user.email}</p>
            <p className="text-[10px] text-[#424750]/40 mt-0.5 font-[family-name:var(--font-mono)]">Administrador</p>
          </div>
        </div>
      </aside>

      {/* ── Contenido principal ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 sticky top-0 z-40 bg-white/70 backdrop-blur-[20px] flex items-center px-8 justify-between"
          style={{ borderBottom: '1px solid rgba(194, 198, 210, 0.12)' }}
        >
          <div>
            <h1 className="text-sm font-semibold text-[#003667]">Panel de administración</h1>
            <p className="text-xs text-[#424750]/40 font-[family-name:var(--font-mono)]">certCol — CID Colombia</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00C896]" />
              <span className="text-xs text-[#424750]/50 dark:text-[#C2C6D2]/50">Sistema activo</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          {children}
        </main>
      </div>

    </div>
  )
}
