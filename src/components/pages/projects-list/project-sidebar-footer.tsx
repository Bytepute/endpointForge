import SidebarUserMenu from "./sidebar-user-menu"

export default function ProjectSidebarFooter() {
  return (
    <div className="space-y-2">
      <SidebarUserMenu />
      <p className="px-2 text-xs text-muted-foreground">Endpoint Forge v1.0</p>
    </div>
  )
}
