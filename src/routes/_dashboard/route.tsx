import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"
import { getSubdomain, redirectToRoot } from "#/utils/tenant"

export const Route = createFileRoute("/_dashboard/projects")({
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState()
    const subdomain = getSubdomain()

    if (!subdomain) {
      redirectToRoot()
      return
    }

    if (!accessToken) {
      redirectToRoot()
      return
    }
  },
  component: DashboardRoot,
})

function DashboardRoot() {
  return <Outlet />
}
