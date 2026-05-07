import { createContext, useContext } from "react"

type SidebarContextValue = {
  currentPath: string
  activeProjectId?: string
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export const SidebarProvider = SidebarContext.Provider

export const useSidebarContext = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx)
    throw new Error("useSidebarContext must be used within SidebarProvider")
  return ctx
}
