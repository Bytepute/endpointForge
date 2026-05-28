const isDev = import.meta.env.DEV

const APP_DOMAIN = isDev
  ? import.meta.env.VITE_DEV_DOMAIN //
  : import.meta.env.VITE_APP_DOMAIN

const PROTOCOL = isDev ? "http" : "https"

const DEV_PORT = "3000"

export function getTenantBaseUrl(username: string) {
  if (isDev) {
    return `${PROTOCOL}://${username}.${APP_DOMAIN}:${DEV_PORT}`
  }

  return `${PROTOCOL}://${username}.${APP_DOMAIN}`
}

export function getTenantProjectsUrl(username: string) {
  return `${getTenantBaseUrl(username)}/projects`
}

export function redirectToTenant(username: string) {
  window.location.replace(getTenantProjectsUrl(username))
}

export function redirectToRoot() {
  const rootUrl = isDev
    ? `${PROTOCOL}://${APP_DOMAIN}:${DEV_PORT}`
    : `https://${APP_DOMAIN}`

  window.location.replace(rootUrl)
}

export function getCurrentHostname() {
  return window.location.hostname
}

export function getSubdomain() {
  const host = getCurrentHostname()

  const parts = host.split(".")

  if (host.includes("localhost") || host.includes("lvh.me")) {
    return parts.length > 2 ? parts[0] : null
  }

  return parts.length > 2 ? parts[0] : null
}
