const isDev = import.meta.env.DEV

const APP_DOMAIN =
  import.meta.env.VITE_APP_DOMAIN || import.meta.env.VITE_DEV_DOMAIN

const APP_PROTOCOL = import.meta.env.VITE_APP_PROTOCOL || undefined
const APP_PORT = import.meta.env.VITE_APP_PORT || undefined
const DEV_PORT = "3000"

function getCurrentProtocol() {
  if (typeof window === "undefined") {
    return isDev ? "http" : "https"
  }

  return window.location.protocol.replace(":", "")
}

function getCurrentPort() {
  if (typeof window === "undefined") {
    return isDev ? DEV_PORT : ""
  }

  return window.location.port
}

function getRootDomainFromHostname(hostname: string) {
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    return "localhost"
  }

  const parts = hostname.split(".")

  if (parts.length <= 2) {
    return hostname
  }

  return parts.slice(1).join(".")
}

function getAppDomain() {
  return APP_DOMAIN ?? getRootDomainFromHostname(getCurrentHostname())
}

function getAppProtocol() {
  return APP_PROTOCOL ?? getCurrentProtocol()
}

function getAppPort() {
  return APP_PORT ?? getCurrentPort()
}

function withPort(url: string) {
  const port = getAppPort()

  return port ? `${url}:${port}` : url
}

export function getTenantBaseUrl(username: string) {
  return withPort(`${getAppProtocol()}://${username}.${getAppDomain()}`)
}

export function getTenantProjectsUrl(username: string) {
  return `${getTenantBaseUrl(username)}/projects`
}

export function redirectToTenant(username: string) {
  window.location.replace(getTenantProjectsUrl(username))
}

export function redirectToRoot() {
  const rootUrl = withPort(`${getAppProtocol()}://${getAppDomain()}`)

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
