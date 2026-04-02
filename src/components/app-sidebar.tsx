"use client"

import * as React from "react"
import {
  IconCalendar,
  IconCalendarWeek,
  IconCategoryPlus,
  IconChartHistogram,
  IconClock,
  IconFocus2,
  IconFolder,
  IconHelp,
  IconInbox,
  IconInnerShadowTop,
  IconListCheck,
  IconStar,
  IconTargetArrow,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Roni Damaceno",
    email: "roni@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Entrada",
      url: "#",
      icon: IconInbox,
    },
    {
      title: "Hoje",
      url: "#",
      icon: IconCalendar,
    },
    {
      title: "Em breve",
      url: "#",
      icon: IconCalendarWeek,
    },
    {
      title: "Filtros",
      url: "#",
      icon: IconCategoryPlus,
    },
    {
      title: "Relatorios",
      url: "#",
      icon: IconChartHistogram,
    },
    {
      title: "Favoritos",
      url: "#",
      icon: IconStar,
      className: "mt-4",
      isActive: true,
      items: [
        {
          title: "Exbir tudo",
          url: "#",
          icon: IconListCheck,
        },
        {
          title: "Sem data de vencimento",
          url: "#",
          icon: IconClock,
        },
        {
          title: "Sem Prioridade",
          url: "#",
          icon: IconTargetArrow,
        },
        {
          title: "Tarefa recorrente",
          url: "#",
          icon: IconCalendarWeek,
        },
      ],
    },
    {
      title: "Meus projetos",
      url: "#",
      icon: IconFolder,
      items: [
        {
          title: "Pessoal",
          url: "#",
          icon: IconInbox,
        },
        {
          title: "Estudos",
          url: "#",
          icon: IconFocus2,
        },
      ],
    },
    {
      title: "Orizn Studio",
      url: "#",
      icon: IconFolder,
      items: [
        {
          title: "Comercial",
          url: "#",
          icon: IconTargetArrow,
        },
        {
          title: "Estudos",
          url: "#",
          icon: IconFocus2,
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ajuda e recursos",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Todoist</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
