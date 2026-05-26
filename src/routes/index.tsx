import Donate from "#/components/pages/landing/donate"
import Features from "#/components/pages/landing/features"
import Hero from "#/components/pages/landing/hero"
import HowItWorks from "#/components/pages/landing/how-it-works"
import {
  LandingI18nProvider,
  useLandingI18n,
} from "#/components/pages/landing/landing-i18n"
import LandingFooter from "#/components/pages/landing/landing-footer"
import LandingHeader from "#/components/pages/landing/landing-header"
import { cn } from "#/lib/utils"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <LandingI18nProvider>
      <LandingPage />
    </LandingI18nProvider>
  )
}

function LandingPage() {
  const { direction, isRtl } = useLandingI18n()

  return (
    <div
      className={cn(
        "min-h-dvh bg-background",
        isRtl ? "text-right" : "text-left",
      )}
      dir={direction}
    >
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Donate />
      <LandingFooter />
    </div>
  )
}
