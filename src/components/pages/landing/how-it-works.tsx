import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      title: "۱. ایجاد پروژه",
      description:
        "ابتدا یک پروژه ایجاد کنید تا endpoint های مربوط به آن را مدیریت کنید.",
    },
    {
      title: "۲. ایجاد Controller",
      description: "مسیر پایه API مثل /users یا /products را تعریف کنید.",
    },
    {
      title: "۳. تعریف Endpoint",
      description:
        "متد و پاسخ JSON را تعریف کنید و بلافاصله از API استفاده کنید.",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="max-w-4xl mx-auto px-6 py-20 space-y-10"
    >
      <h2 className="text-3xl font-bold text-center">نحوه کار</h2>

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
