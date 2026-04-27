import { Button } from "#/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <section className="min-h-dvh flex items-center justify-center max-w-md mx-auto px-6 py-24">
      <Card className="text-center py-10">
        <CardHeader className="flex flex-col items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <CardTitle className="text-2xl font-bold">
            404 – Page Not Found
          </CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground text-sm leading-6">
          <p>
            The page you are looking for doesn’t exist or might have been
            removed.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-primary hover:underline font-medium"
          >
            <Button>Go back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
