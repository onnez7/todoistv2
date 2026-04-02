"use client"

import * as React from "react"
import {
  IconCalendar,
  IconCalendarWeek,
  IconCategoryPlus,
  IconChartHistogram,
  IconHelp,
  IconInbox,
  IconInnerShadowTop,
  IconSearch,
  IconDroplet,
  IconHash,
  IconFolder,
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

function createSidebarImage(label: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="${background}" />
      <text
        x="16"
        y="20"
        text-anchor="middle"
        font-family="Inter, Arial, sans-serif"
        font-size="12"
        font-weight="700"
        fill="white"
      >
        ${label}
      </text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const meusProjetosImage = createSidebarImage("MP", "#4f46e5")
const oriznStudioImage = createSidebarImage("OS", "#0f766e")

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
      className: "mt-4",
      isActive: true,
      items: [
        {
          title: "Exbir tudo",
          url: "#",
          icon: IconDroplet,
        },
        {
          title: "Sem data de vencimento",
          url: "#",
          icon: IconDroplet,
        },
        {
          title: "Sem Prioridade",
          url: "#",
          icon: IconDroplet,
        },
        {
          title: "Tarefa recorrente",
          url: "#",
          icon: IconDroplet,
        },
      ],
    },
    {
      title: "Meus projetos",
      url: "#",
      image: meusProjetosImage,
      items: [
        {
          title: "Pessoal",
          url: "#",
          icon: IconHash,
        },
        {
          title: "Estudos",
          url: "#",
          icon: IconHash,
        },
      ],
    },
    {
      title: "Orizn Studio",
      url: "#",
      image: oriznStudioImage,
      items: [
        {
          title: "Comercial",
          url: "#",
          icon: IconFolder,
          isActive: true,
          items: [
            {
              title: "Propostas",
              url: "#",
              icon: IconHash,
            },
            {
              title: "Clientes",
              url: "#",
              icon: IconHash,
            },
          ],
        },
        {
          title: "Estudos",
          url: "#",
          icon: IconFolder,
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
    {
      title: "Ajuda e recursos",
      url: "#",
      icon: IconHelp,
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
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
