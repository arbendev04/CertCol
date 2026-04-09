import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { LayoutDashboard, LogOut } from 'lucide-react'

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
    <div className="min-h-dvh bg-surface-container flex flex-col">
      {/* Header admin */}
      <header className="bg-surface-bright border-b border-surface-high sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="certCol"
              width={100}
              height={30}
              className="h-7 w-auto"
            />
            <span className="text-xs font-medium text-on-surface/40 bg-surface-container px-2 py-1 rounded-full">
              Admin
            </span>
          </div>

          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-on-surface/60 hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-on-surface/60 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
