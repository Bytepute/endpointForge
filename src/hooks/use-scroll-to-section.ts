import { useRouter } from "@tanstack/react-router"

export function useScrollToSection() {
  const router = useRouter()
  function scrollToSection(id: string, offset: number = 80) {
    router.navigate({ to: "/", hash: id })

    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
      }
    }, 0)
  }

  return scrollToSection
}
