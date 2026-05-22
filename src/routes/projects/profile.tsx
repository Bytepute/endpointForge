import ProfilePage from "#/components/pages/profile/profile-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="mx-auto w-full max-w-4xl p-6 sm:p-8">
      <ProfilePage />
    </main>
  )
}
