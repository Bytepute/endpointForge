import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useLandingI18n } from "./landing-i18n"

export default function Donate() {
  const { text } = useLandingI18n()

  return (
    <section
      id="donate"
      className="max-w-4xl mx-auto px-6 py-12 text-center space-y-6"
    >
      <Heart className="mx-auto text-red-500" size={40} />

      <h2 className="text-3xl font-bold">{text.donate.title}</h2>

      <p className="text-muted-foreground">
        {text.donate.description}
      </p>

      <a
        href="https://daramet.com/bytepute"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="lg">{text.donate.cta}</Button>
      </a>
    </section>
  )
}
