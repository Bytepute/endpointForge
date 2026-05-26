import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useLandingI18n } from "./landing-i18n"

export default function HowItWorks() {
  const { text } = useLandingI18n()
  const steps = [
    {
      title: text.howItWorks.projectTitle,
      description: text.howItWorks.projectDescription,
    },
    {
      title: text.howItWorks.controllerTitle,
      description: text.howItWorks.controllerDescription,
    },
    {
      title: text.howItWorks.endpointTitle,
      description: text.howItWorks.endpointDescription,
    },
  ]

  return (
    <section
      id="how-it-works"
      className="max-w-4xl mx-auto px-6 py-20 space-y-10"
    >
      <h2 className="text-3xl font-bold text-center">
        {text.howItWorks.title}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground">
              {step.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
