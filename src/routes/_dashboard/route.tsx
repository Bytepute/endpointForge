import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"
import { getSubdomain, redirectToRoot } from "#/utils/tenant"
import { redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/projects")({
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState()
    const subdomain = getSubdomain()

    if (!subdomain) {
      redirectToRoot()
      return
    }

    if (!accessToken) {
      throw redirect({ to: "/" })
    }
  },
  component: DashboardRoot,
})

function DashboardRoot() {
  return <Outlet />
}
