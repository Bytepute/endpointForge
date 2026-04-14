import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-sidebar">
      <nav className="page-wrap flex flex-wrap justify-between items-center max-w-4xl  gap-x-3 gap-y-2 py-3 sm:py-4">
        <h1 className="text-primary">endpointForge</h1>
        <ThemeToggle />
      </nav>
    </header>
  )
}
