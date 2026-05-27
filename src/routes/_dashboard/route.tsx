import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { getSubdomain } from "#/utils/get-subdomain"
import { useAuthStore } from "#/stores/auth-store"

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
      window.location.href = "http://localhost:3000"

      return
    }
  },

  component: DashboardRoot,
})

function DashboardRoot() {
  return <Outlet />
}
