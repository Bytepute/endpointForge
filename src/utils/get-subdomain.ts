export function getSubdomain() {
  const host = window.location.hostname

  // localhost support
  if (host.includes("localhost")) {
    const parts = host.split(".")
    return parts.length > 1 ? parts[0] : null
  }

  const parts = host.split(".")

  if (parts.length > 2) {
    return parts[0]
  }

  return null
}
