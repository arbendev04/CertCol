'use client'

import dynamic from 'next/dynamic'

const Sidebar = dynamic(
  () => import('@/components/admin/Sidebar').then((m) => m.Sidebar),
  { ssr: false }
)

export function SidebarWrapper({ userEmail }: { userEmail: string }) {
  return <Sidebar userEmail={userEmail} />
}
