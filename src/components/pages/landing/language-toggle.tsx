import {
  ToggleGroup,
  ToggleGroupItem,
} from "#/components/ui/toggle-group"
import { useLandingI18n } from "./landing-i18n"

export default function LandingLanguageToggle() {
  const { language, setLanguage } = useLandingI18n()

  return (
    <ToggleGroup
      type="single"
      value={language}
      onValueChange={(value) => {
        if (value === "fa" || value === "en") {
          setLanguage(value)
        }
      }}
      aria-label="Language"
      size="sm"
    >
      <ToggleGroupItem value="fa" aria-label="Persian">
        FA
      </ToggleGroupItem>
      <span className="px-1 text-xs text-muted-foreground/60" aria-hidden="true">
        |
      </span>
      <ToggleGroupItem value="en" aria-label="English">
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
