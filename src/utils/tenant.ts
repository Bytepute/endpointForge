const isDev = import.meta.env.DEV

const APP_DOMAIN = isDev
  ? import.meta.env.VITE_DEV_DOMAIN
  : import.meta.env.VITE_APP_DOMAIN

const PROTOCOL = isDev ? "http" : "https"

export function getTenantBaseUrl(username: string) {
  return `${PROTOCOL}://${username}.${APP_DOMAIN}`
}

export function getTenantProjectsUrl(username: string) {
  return `${getTenantBaseUrl(username)}/projects`
}

export function redirectToTenant(username: string) {
  window.location.replace(getTenantProjectsUrl(username))
}

export function redirectToRoot() {
  const rootUrl = isDev ? "http://localhost:3000" : `https://${APP_DOMAIN}`

  window.location.replace(rootUrl)
}

export function getCurrentHostname() {
  return window.location.hostname
}

export function getSubdomain() {
  const host = getCurrentHostname()

  if (host.includes("localhost")) {
    const parts = host.split(".")

    return parts.length > 1 ? parts[0] : null
  }

  const parts = host.split(".")

  return parts.length > 2 ? parts[0] : null
}
