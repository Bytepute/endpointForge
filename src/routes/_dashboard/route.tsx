import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { useAuthStore } from "#/stores/auth-store"
import { getSubdomain } from "#/utils/tenant"

export const Route = createFileRoute("/_dashboard/projects")({
  beforeLoad: () => {
    const subdomain = getSubdomain()

    const { accessToken, isAuthReady } = useAuthStore.getState()

    if (!isAuthReady) return

    if (!subdomain) {
      throw redirect({
        to: "/",
      })
    }

    if (!accessToken) {
      window.location.href = import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://endpointforge.ir"
      return
    }
  },

  component: DashboardRoot,
})

function DashboardRoot() {
  return <Outlet />
}
