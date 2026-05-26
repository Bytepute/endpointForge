import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"
import { useLandingI18n } from "./landing-i18n"
import { useAuthStore } from "#/stores/auth-store"

export default function Hero() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
  const setRegisterModal = useAuthStore((state) => state.setRegisterModal)

  const handleCreateProject = () => {
    if (!isLoggedIn) {
      setRegisterModal(true)
      return
    }

    navigate({ to: "/projects" })
  }

  const { text } = useLandingI18n()

  return (
    <section className="px-6 py-28">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <Badge variant="secondary">{text.hero.badge}</Badge>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {text.hero.title}
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl">
          {text.hero.description}
        </p>

        <Button size="lg" onClick={handleCreateProject}>
          {text.hero.cta}
        </Button>
      </div>
    </section>
  )
}
