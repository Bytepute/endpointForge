import ThemeToggle from "#/components/theme-toggle"
import { useScrollToSection } from "#/hooks/use-scroll-to-section"
import { Button } from "@/components/ui/button"

export default function LandingHeader() {
  const scrollToSection = useScrollToSection()
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/70">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <p className="font-bold text-xl">endpointForge</p>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Button onClick={() => scrollToSection("features")} variant={"link"}>
            امکانات
          </Button>
          <Button
            onClick={() => scrollToSection("how-it-works")}
            variant={"link"}
          >
            نحوه کار
          </Button>
          <Button onClick={() => scrollToSection("donate")} variant={"link"}>
            حمایت از پروژه
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/*TODO: Enable when feature becomes available*/}
          {/*<Button variant="outline">ورود</Button>

          <Button size="sm">ثبت‌نام</Button>*/}
        </div>
      </div>
    </header>
  )
}
