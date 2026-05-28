import { Outlet, createRootRoute, redirect } from "@tanstack/react-router"

import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanstackQueryProvider from "#/providers/tanstack-query-provider"
import { Toaster } from "sonner"
import NotFound from "#/components/pages/not-found/not-found"
import AuthSessionBoundary from "#/components/auth/auth-session-boundary"

import { useAuthStore } from "#/stores/auth-store"
import { getSubdomain, redirectToTenant } from "#/utils/tenant"

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const subdomain = getSubdomain()

    const { accessToken, username, isAuthReady } = useAuthStore.getState()

    const isLanding = location.pathname === "/"

    // auth still bootstrapping
    if (!isAuthReady) {
      return
    }

    if (subdomain && isAuthReady && !accessToken) {
      window.location.href = import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://endpointforge.ir"

      return
    }

    if (!subdomain && accessToken && username && isLanding) {
      redirectToTenant(username)
    }
  },

  component: Root,

  notFoundComponent: NotFound,
})

function Root() {
  return (
    <TanstackQueryProvider>
      <AuthSessionBoundary />

      <Outlet />

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />

      <Toaster />
    </TanstackQueryProvider>
  )
}
