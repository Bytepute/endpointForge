import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"
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

  return (
    <section className="px-6 py-28">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <Badge variant="secondary">Endpoint Forge</Badge>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          ساخت سریع Mock API
          <br />
          برای توسعه فرانت‌اند
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl">
          Endpoint Forge یک ابزار برای توسعه‌دهندگان فرانت‌اند است که به شما
          اجازه می‌دهد بدون نیاز به بک‌اند واقعی، APIهای مورد نیاز خود را به
          سرعت شبیه‌سازی کنید.
        </p>

        <Button size="lg" onClick={handleCreateProject}>
          ساخت پروژه جدید
        </Button>
      </div>
    </section>
  )
}
