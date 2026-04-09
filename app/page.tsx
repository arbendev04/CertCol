import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { WhatIsACID } from '@/components/landing/WhatIsACID'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Benefits } from '@/components/landing/Benefits'
import { CertForm } from '@/components/landing/CertForm'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsACID />
        <HowItWorks />
        <Benefits />
        <CertForm />
      </main>
      <Footer />
    </>
  )
}
