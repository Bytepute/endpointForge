import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Server, Code, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Server,
      title: "ساخت Mock Server",
      description:
        "با چند کلیک یک پروژه بسازید که endpoint‌های تعریف شده شما را روی سرور ما اجرا می‌کند. (‌localhost بزودی)",
    },
    {
      icon: Code,
      title: "مدیریت Endpoint ها",
      description:
        "متد، مسیر، status code و پاسخ JSON را برای هر endpoint تعریف و مدیریت کنید.",
    },
    {
      icon: Zap,
      title: "توسعه سریع",
      description: "فرانت‌اند را بدون انتظار برای آماده شدن بک‌اند توسعه دهید.",
    },
  ]

  return (
    <section id="features" className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <h2 className="text-3xl font-bold text-center">امکانات اصلی</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon

          return (
            <Card key={i}>
              <CardHeader>
                <Icon />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
