import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SidebarWrapper } from '@/components/admin/SidebarWrapper'
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

      <SidebarWrapper userEmail={user.email ?? ''} />

      {/* ── Contenido principal ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar — solo desktop */}
        <header className="hidden lg:flex h-16 sticky top-0 z-40 glass border-b border-outline-variant/15 items-center px-8 justify-between">
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

        <main className="flex-1 px-4 py-6 pt-20 lg:pt-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

    </div>
  )
}
