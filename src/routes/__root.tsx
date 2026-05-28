import { Outlet, createRootRoute } from "@tanstack/react-router"

import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanstackQueryProvider from "#/providers/tanstack-query-provider"

import { Toaster } from "sonner"

import NotFound from "#/components/pages/not-found/not-found"
import AuthSessionBoundary from "#/components/auth/auth-session-boundary"

import { useAuthStore } from "#/stores/auth-store"

import { getSubdomain, redirectToTenant } from "#/utils/tenant"
import { bootstrapAuthFn } from "#/utils/auth-helpers"

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    await bootstrapAuthFn()

    const { accessToken, username } = useAuthStore.getState()
    const subdomain = getSubdomain()
    const isLanding = location.pathname === "/"

    // logged-in user on root domain
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
