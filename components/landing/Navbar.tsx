'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#que-es', label: '¿Qué es un CID?' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#formulario', label: 'Registrar CID' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="certCol"
            width={120}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-on-surface/70 hover:text-brand-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            render={<Link href="#formulario" />}
            size="sm"
            className="bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-lg px-5 font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            Registrar mi CID
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-outline-variant/20 px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-on-surface/80 hover:text-brand-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button
              render={<Link href="#formulario" onClick={() => setOpen(false)} />}
              className="mt-2 bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-lg font-semibold"
            >
                Registrar mi CID
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
