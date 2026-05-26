import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Server, Code, Zap } from "lucide-react"
import { useLandingI18n } from "./landing-i18n"

export default function Features() {
  const { text } = useLandingI18n()
  const features = [
    {
      icon: Server,
      title: text.features.mockServerTitle,
      description: text.features.mockServerDescription,
    },
    {
      icon: Code,
      title: text.features.endpointsTitle,
      description: text.features.endpointsDescription,
    },
    {
      icon: Zap,
      title: text.features.speedTitle,
      description: text.features.speedDescription,
    },
  ]

  return (
    <section id="features" className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <h2 className="text-3xl font-bold text-center">{text.features.title}</h2>

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
