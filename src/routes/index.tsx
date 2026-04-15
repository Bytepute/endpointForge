import Donate from '#/components/pages/landing/donate'
import Features from '#/components/pages/landing/features'
import Hero from '#/components/pages/landing/hero'
import HowItWorks from '#/components/pages/landing/how-it-works'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-dvh bg-background text-right" dir="rtl">
      <Hero />
      <Features />
      <HowItWorks />
      <Donate />
    </div>
  )
}
