import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { landingCopy, type LandingCopy, type LandingLanguage } from "./i18n"

type Direction = "ltr" | "rtl"

const STORAGE_KEY = "endpoint-forge-landing-language"
const DEFAULT_LANGUAGE: LandingLanguage = "en"

type LandingI18nValue = {
  language: LandingLanguage
  direction: Direction
  isRtl: boolean
  text: LandingCopy
  setLanguage: (language: LandingLanguage) => void
  toggleLanguage: () => void
}

const LandingI18nContext = createContext<LandingI18nValue | null>(null)

function getInitialLanguage(): LandingLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === "fa" || stored === "en" ? stored : DEFAULT_LANGUAGE
}

export function LandingI18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage)
  const direction: Direction = language === "fa" ? "rtl" : "ltr"

  useEffect(() => {
    const previousLang = document.documentElement.lang
    const previousDir = document.documentElement.dir

    document.documentElement.lang = language
    document.documentElement.dir = direction
    window.localStorage.setItem(STORAGE_KEY, language)

    return () => {
      document.documentElement.lang = previousLang || "en"
      document.documentElement.dir = previousDir || "ltr"
    }
  }, [direction, language])

  const value = useMemo<LandingI18nValue>(
    () => ({
      language,
      direction,
      isRtl: direction === "rtl",
      text: landingCopy[language],
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "fa" ? "en" : "fa")),
    }),
    [direction, language],
  )

  return (
    <LandingI18nContext.Provider value={value}>
      {children}
    </LandingI18nContext.Provider>
  )
}

export function useLandingI18n() {
  const value = useContext(LandingI18nContext)

  if (!value) {
    throw new Error("useLandingI18n must be used inside LandingI18nProvider")
  }

  return value
}
