'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export function Countdown() {
  const [seconds, setSeconds] = useState(6)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval)
          window.location.replace('/')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C2C6D2]/40 hover:bg-surface-container text-sm font-medium text-on-surface/70 hover:text-on-surface transition-colors"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </a>
      <p className="text-xs text-on-surface/40">
        Redirigiendo automáticamente en {seconds} segundos…
      </p>
    </div>
  )
}
