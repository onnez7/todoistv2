import {
  IconDots,
  IconLayoutList,
  IconMessageCircle,
  IconShare3,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 "
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Meus projetos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Pessoal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <IconShare3 data-icon="inline-start" />
            Compartilhar
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex"
            aria-label="Visualizar lista"
          >
            <IconLayoutList />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex"
            aria-label="Abrir comentários"
          >
            <IconMessageCircle />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex"
            aria-label="Mais opções"
          >
            <IconDots />
          </Button>
        </div>
      </div>
    </header>
  )
}
