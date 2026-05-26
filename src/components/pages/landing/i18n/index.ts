import { en } from "./en"
import { fa } from "./fa"

export const landingCopy = {
  en,
  fa,
} as const

export type LandingLanguage = keyof typeof landingCopy
export type LandingCopy = (typeof landingCopy)[LandingLanguage]
