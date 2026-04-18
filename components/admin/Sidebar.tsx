'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface SidebarProps {
  userEmail: string
}

function SidebarContent({ userEmail, onClose }: { userEmail: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-outline-variant/15">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
          <Image
            src="/img/logo-claro.webp"
            alt="certCol"
            width={130}
            height={40}
            className="h-9 w-auto block dark:hidden"
          />
          <Image
            src="/img/logo-oscuro.webp"
            alt="certCol"
            width={130}
            height={40}
            className="h-9 w-auto hidden dark:block"
          />
          <span className="text-[10px] font-semibold text-on-surface-variant/50 bg-surface-container px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)] uppercase tracking-wider">
            Admin
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-container transition-colors lg:hidden">
            <X size={18} className="text-on-surface/60" />
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[10px] font-semibold text-on-surface-variant/40 uppercase tracking-[0.12em] px-3 mb-3 font-[family-name:var(--font-mono)]">
          Principal
        </p>
        <Link
          href="/admin"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#003667] dark:text-brand-primary bg-[#0A4D8C]/8 dark:bg-brand-primary/10 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg icon-bg-primary flex items-center justify-center shrink-0">
            <LayoutDashboard size={14} className="icon-primary" />
          </div>
          Dashboard
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1 border-t border-outline-variant/15 pt-3">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
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

        <div className="mt-2 p-3 rounded-xl bg-surface-container border border-outline-variant/15">
          <p className="text-xs font-medium text-[#003667] dark:text-brand-primary truncate">{userEmail}</p>
          <p className="text-[10px] text-on-surface-variant/40 mt-0.5 font-[family-name:var(--font-mono)]">Administrador</p>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ userEmail }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-60 shrink-0 sticky top-0 h-dvh flex-col glass border-r border-outline-variant/20">
        <SidebarContent userEmail={userEmail} />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 h-14 glass border-b border-outline-variant/15 flex items-center justify-between px-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-surface-container transition-colors"
          aria-label="Abrir menú"
        >
          <Menu size={20} className="text-on-surface/70" />
        </button>

        <Link href="/admin">
          <Image
            src="/img/logo-claro.webp"
            alt="certCol"
            width={100}
            height={32}
            className="h-7 w-auto block dark:hidden"
          />
          <Image
            src="/img/logo-oscuro.webp"
            alt="certCol"
            width={100}
            height={32}
            className="h-7 w-auto hidden dark:block"
          />
        </Link>

        <ThemeToggle />
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Drawer */}
          <aside
            className="relative w-72 h-full glass border-r border-outline-variant/20 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent userEmail={userEmail} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  )
}
