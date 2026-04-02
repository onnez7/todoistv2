import { useState } from "react"
import {
  IconActivity,
  IconArchive,
  IconArrowRightCircle,
  IconBulb,
  IconCalendarEvent,
  IconCalendarMonth,
  IconChevronDown,
  IconCopy,
  IconDots,
  IconEdit,
  IconExternalLink,
  IconFileExport,
  IconFileImport,
  IconHeart,
  IconHelpCircle,
  IconLayoutKanban,
  IconLayoutList,
  IconLink,
  IconMail,
  IconMessageCircle,
  IconPackages,
  IconShare3,
  IconSparkles,
  IconSquarePlus,
  IconTemplate,
  IconTrash,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type LayoutMode = "lista" | "painel" | "calendario"

type SelectOption = {
  label: string
  value: string
}

type ProjectAction = {
  badge?: string
  destructive?: boolean
  icon: typeof IconDots
  label: string
  shortcut?: string
}

const layoutModes: {
  icon: typeof IconLayoutList
  label: string
  value: LayoutMode
}[] = [
  { icon: IconLayoutList, label: "Lista", value: "lista" },
  { icon: IconLayoutKanban, label: "Painel", value: "painel" },
  { icon: IconCalendarMonth, label: "Calendario", value: "calendario" },
]

const groupOptions: SelectOption[] = [
  { label: "Nenhum", value: "nenhum" },
  { label: "Data", value: "data" },
  { label: "Data adicionada", value: "data-adicionada" },
  { label: "Prazo", value: "prazo" },
  { label: "Prioridade", value: "prioridade" },
  { label: "Etiqueta", value: "etiqueta" },
]

const sortOptions: SelectOption[] = [
  { label: "Manual", value: "manual" },
  { label: "Nome", value: "nome" },
  { label: "Data", value: "data" },
  { label: "Data adicionada", value: "data-adicionada" },
  { label: "Prazo", value: "prazo" },
  { label: "Prioridade", value: "prioridade" },
]

const dateOptions: SelectOption[] = [
  { label: "Todos", value: "todos" },
  { label: "Hoje", value: "hoje" },
  { label: "Esta semana", value: "esta-semana" },
  { label: "Proximos 7 dias", value: "proximos-7-dias" },
  { label: "Este mes", value: "este-mes" },
  { label: "Proximos 30 dias", value: "proximos-30-dias" },
  { label: "Sem vencimento", value: "sem-vencimento" },
]

const priorityOptions: SelectOption[] = [
  { label: "Todos", value: "todos" },
  { label: "Alta", value: "alta" },
  { label: "Media", value: "media" },
  { label: "Baixa", value: "baixa" },
]

const projectActionGroups: ProjectAction[][] = [
  [
    { icon: IconEdit, label: "Editar" },
    { icon: IconHeart, label: "Adicionar aos favoritos" },
    { icon: IconArrowRightCircle, label: "Mover" },
    { icon: IconCopy, label: "Duplicar" },
    { icon: IconSquarePlus, label: "Adicionar secao", shortcut: "S" },
  ],
  [
    { icon: IconLink, label: "Copiar link para o projeto" },
    { icon: IconExternalLink, label: "Abrir em nova janela", shortcut: "Ctrl+N" },
  ],
  [
    { icon: IconTemplate, label: "Salvar como modelo" },
    { icon: IconPackages, label: "Navegar pelos modelos" },
  ],
  [
    { icon: IconFileImport, label: "Importar de CSV" },
    { icon: IconFileExport, label: "Exportar como CSV" },
  ],
  [
    { icon: IconMail, label: "Enviar por e-mail tarefas para este projeto" },
    { icon: IconCalendarEvent, label: "Feed do calendario do projeto" },
  ],
  [{ icon: IconActivity, label: "Visualizar atividade" }],
  [
    { icon: IconBulb, label: "Add conversation starters" },
    {
      badge: "BETA",
      icon: IconSparkles,
      label: "Suggest tasks with Task Assist",
    },
  ],
  [
    { icon: IconArchive, label: "Arquivar" },
    { destructive: true, icon: IconTrash, label: "Excluir" },
  ],
]

type LayoutSelectRowProps = {
  label: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  value: string
}

function LayoutSelectRow({
  label,
  onValueChange,
  options,
  value,
}: LayoutSelectRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-foreground">{label}</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-9 w-40 justify-between rounded-lg bg-background px-3 text-sm shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ProjectMenuItem({ action }: { action: ProjectAction }) {
  const Icon = action.icon

  return (
    <DropdownMenuItem
      variant={action.destructive ? "destructive" : "default"}
      className="gap-2 px-2 py-2"
    >
      <Icon className="size-4" />
      <span className="min-w-0 flex-1 truncate">{action.label}</span>
      {action.badge ? (
        <Badge className="h-4 rounded-sm bg-amber-500/15 px-1.5 text-[10px] text-amber-600 dark:text-amber-300">
          {action.badge}
        </Badge>
      ) : null}
      {action.shortcut ? <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut> : null}
    </DropdownMenuItem>
  )
}

export function SiteHeader() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("lista")
  const [showCompleted, setShowCompleted] = useState(false)
  const [groupBy, setGroupBy] = useState("nenhum")
  const [sortBy, setSortBy] = useState("manual")
  const [dateFilter, setDateFilter] = useState("todos")
  const [priorityFilter, setPriorityFilter] = useState("todos")

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2" />
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

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden data-[state=open]:bg-muted sm:flex"
                aria-label="Visualizar layout"
              >
                <IconLayoutList />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-80 rounded-2xl p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">Layout</p>
                <Button variant="ghost" size="icon-xs" aria-label="Ajuda do layout">
                  <IconHelpCircle />
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border bg-muted/50 p-1">
                {layoutModes.map((mode) => {
                  const Icon = mode.icon
                  const isActive = layoutMode === mode.value

                  return (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setLayoutMode(mode.value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                        isActive
                          ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                          : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                      <span>{mode.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Tarefas concluidas</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showCompleted}
                  onClick={() => setShowCompleted((current) => !current)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                    showCompleted ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "block size-5 rounded-full bg-background shadow-sm transition-transform",
                      showCompleted ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <section className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Classificar</span>
                    <IconChevronDown className="size-4 text-muted-foreground" />
                  </div>
                  <LayoutSelectRow
                    label="Agrupar"
                    value={groupBy}
                    onValueChange={setGroupBy}
                    options={groupOptions}
                  />
                  <LayoutSelectRow
                    label="Classificar"
                    value={sortBy}
                    onValueChange={setSortBy}
                    options={sortOptions}
                  />
                </section>

                <section className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Filtro</span>
                    <IconChevronDown className="size-4 text-muted-foreground" />
                  </div>
                  <LayoutSelectRow
                    label="Data"
                    value={dateFilter}
                    onValueChange={setDateFilter}
                    options={dateOptions}
                  />
                  <LayoutSelectRow
                    label="Prioridade"
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                    options={priorityOptions}
                  />
                </section>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex"
            aria-label="Abrir comentarios"
          >
            <IconMessageCircle />
          </Button>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden data-[state=open]:bg-muted sm:flex"
                aria-label="Mais opcoes"
              >
                <IconDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-80 rounded-2xl p-1.5"
            >
              {projectActionGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.map((action) => (
                    <ProjectMenuItem key={action.label} action={action} />
                  ))}
                  {groupIndex < projectActionGroups.length - 1 ? (
                    <DropdownMenuSeparator />
                  ) : null}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
