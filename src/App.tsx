import type { CSSProperties } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "sonner"


const appLayoutStyle = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 12)",
} as CSSProperties

function App() {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider style={appLayoutStyle}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-right" />
    </TooltipProvider>
  )
}

export default App
