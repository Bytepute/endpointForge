import { useLandingI18n } from "./landing-i18n"

export default function LandingFooter() {
  const { text, isRtl } = useLandingI18n()

  return (
    <footer className="w-full border-t py-20 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Right Section */}
          <div
            className={`space-y-3 text-center ${isRtl ? "md:text-right" : "md:text-left"} max-w-md`}
          >
            <p className="text-sm text-muted-foreground">
              {text.footer.madeBy}
            </p>

            <p className="text-sm text-muted-foreground">
              {text.footer.description}
            </p>

            <p className="text-xs text-muted-foreground pt-2">
              © {new Date().getFullYear()} Bytepute
            </p>
          </div>

          {/* Left Section */}
          <div className="space-y-4 text-center ">
            <p className="text-lg font-semibold text-foreground">
              {text.footer.developers}
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              <a
                href="https://github.com/AliZoghi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition"
              >
                Ali Zoghi
              </a>

              <a
                href="https://github.com/MrAghaei"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition"
              >
                Mohammad Aghaei
              </a>

              <a
                href="https://github.com/AmirAbaris"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition"
              >
                Amir Abaris
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
