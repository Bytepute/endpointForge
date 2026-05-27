export function getSubdomain() {
  if (typeof window === "undefined") {
    return null
  }

  const host = window.location.hostname

  if (host.includes("localhost")) {
    const parts = host.split(".")
    return parts.length > 1 ? parts[0] : null
  }

  const parts = host.split(".")

  return parts.length > 2 ? parts[0] : null
}
