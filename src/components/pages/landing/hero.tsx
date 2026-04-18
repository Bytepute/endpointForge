import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"

export default function Hero() {
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

        <Link to="/projects">
          <Button size="lg">ساخت پروژه جدید</Button>
        </Link>
      </div>
    </section>
  )
}
