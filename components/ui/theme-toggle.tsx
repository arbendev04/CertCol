'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-[1.08]"
      style={{
        background: isDark ? 'rgba(165, 200, 255, 0.12)' : 'rgba(10, 77, 140, 0.08)',
        border: '1px solid ' + (isDark ? 'rgba(165, 200, 255, 0.15)' : 'rgba(194, 198, 210, 0.25)'),
      }}
    >
      {isDark ? (
        <Sun size={16} style={{ color: '#A5C8FF' }} />
      ) : (
        <Moon size={16} style={{ color: '#0A4D8C' }} />
      )}
    </button>
  )
}
