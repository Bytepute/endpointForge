import { Outlet, createRootRoute, redirect } from "@tanstack/react-router"

import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanstackQueryProvider from "#/providers/tanstack-query-provider"
import { Toaster } from "sonner"
import NotFound from "#/components/pages/not-found/not-found"
import AuthSessionBoundary from "#/components/auth/auth-session-boundary"

import { getSubdomain } from "#/utils/get-subdomain"
import { useAuthStore } from "#/stores/auth-store"

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const subdomain = getSubdomain()

    const { accessToken, username, isAuthReady } = useAuthStore.getState()

    const isLanding = location.pathname === "/"

    if (!isAuthReady) return

    // user visits:
    // mamad.localhost:3000
    if (subdomain) {
      if (!accessToken) {
        throw redirect({
          to: "/",
        })
      }

      // prevent loading landing page
      if (isLanding) {
        throw redirect({
          to: "/projects",
        })
      }
    }

    // logged in user enters root site
    // localhost:3000
    if (!subdomain && accessToken && username && isLanding) {
      const domain = import.meta.env.DEV
        ? `${username}.localhost:3000`
        : `${username}.endpointforge.ir`

      window.location.href = `http://${domain}/projects`
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
