import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function Donate() {
  return (
    <section
      id="donate"
      className="max-w-4xl mx-auto px-6 py-12 text-center space-y-6"
    >
      <Heart className="mx-auto text-red-500" size={40} />

      <h2 className="text-3xl font-bold">حمایت از پروژه</h2>

      <p className="text-muted-foreground">
        Endpoint Forge یک پروژه مستقل است. اگر این ابزار برای شما مفید بوده
        می‌توانید با حمایت مالی به ادامه توسعه آن کمک کنید.
      </p>

      <Button size="lg">حمایت مالی</Button>
    </section>
  )
}
