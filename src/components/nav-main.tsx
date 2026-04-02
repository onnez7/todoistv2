"use client"

import {
  IconChevronRight,
  IconCirclePlusFilled,
  IconWaveSine,
  type Icon,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavMainItem = {
  title: string
  url: string
  icon?: Icon
  image?: string
  isActive?: boolean
  className?: string
  items?: {
    title: string
    url: string
    icon?: Icon
    image?: string
    isActive?: boolean
    items?: NavMainItem["items"]
  }[]
}

export function NavMain({
  items,
}: {
  items: NavMainItem[]
}) {
  const renderItemVisual = (
    item: Pick<NavMainItem, "icon" | "image" | "title">
  ) => {
    if (item.image) {
      return (
        <img
          src={item.image}
          alt=""
          className="size-4 rounded-sm object-cover"
          aria-hidden="true"
        />
      )
    }

    if (item.icon) {
      const Icon = item.icon
      return <Icon />
    }

    return null
  }

  const renderSubItems = (subItems: NonNullable<NavMainItem["items"]>) => {
    return subItems.map((subItem) => {
      const hasNestedItems = Boolean(subItem.items?.length)

      if (!hasNestedItems) {
        return (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild className="w-full">
              <a href={subItem.url}>
                {renderItemVisual(subItem)}
                <span>{subItem.title}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        )
      }

      return (
        <Collapsible
          key={subItem.title}
          asChild
          defaultOpen={subItem.isActive}
          className="group/collapsible"
        >
          <SidebarMenuSubItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuSubButton
                isActive={subItem.isActive}
                className="w-full"
              >
                {renderItemVisual(subItem)}
                <span>{subItem.title}</span>
                <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="mr-0 px-0">
                {renderSubItems(subItem.items ?? [])}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuSubItem>
        </Collapsible>
      )
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Adicionar tarefa"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <IconCirclePlusFilled />
              <span>Adicionar tarefa</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconWaveSine />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const hasSubItems = Boolean(item.items?.length)

            if (!hasSubItems) {
              return (
                <SidebarMenuItem key={item.title} className={item.className}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.isActive}
                  >
                    <a href={item.url}>
                      {renderItemVisual(item)}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem className={item.className}>
                  <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                      {renderItemVisual(item)}
                      <span>{item.title}</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mr-0 px-0">
                      {renderSubItems(item.items ?? [])}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
