'use client'

import { LayoutDashboard, LogOut, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useAuthContext } from '@/ui/auth/contexts/auth-context/hooks/use-auth-context'
import { BrandMark } from '@/ui/global/widgets/components/brand-mark'
import { Button } from '@/ui/shadcn/components/button'
import { Separator } from '@/ui/shadcn/components/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui/shadcn/components/sidebar'
import { cn } from '@/ui/shadcn/utils/utils'

const adminItems = [
  { href: ROUTES.private.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.private.customers, label: 'Clientes', icon: UserRound },
  { href: ROUTES.private.profile, label: 'Perfil', icon: Settings },
]

const userItems = [{ href: ROUTES.private.profile, label: 'Perfil', icon: Settings }]

export function AppSidebarView() {
  const pathname = usePathname()
  const { logout, user } = useAuthContext()
  const { isMobile, setOpenMobile } = useSidebar()
  const items = user?.role === 'admin' ? adminItems : userItems

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className='border-white/10 bg-[#071B2E] text-white' collapsible='offcanvas'>
      <SidebarHeader className='border-b border-white/10 bg-[#071B2E] px-5 py-5'>
        <Link
          href={ROUTES.private.profile}
          onClick={handleNavigate}
          className='inline-flex w-fit items-center gap-2.5'
        >
          <BrandMark className='size-8' />
          <span className='text-sm font-semibold tracking-[0.14em] text-white'>
            AURORA
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className='gap-6 bg-[#071B2E] p-4'>
        <div className='rounded-2xl border border-border bg-card p-4 text-white shadow-sm'>
          <p className='text-sm text-[#C8CED3]'>Conta</p>
          <p className='mt-1 font-semibold text-white'>{user?.name}</p>
          <p className='text-sm text-[#C8CED3]'>{user?.email}</p>
        </div>

        <div className='space-y-1'>
          <SidebarMenu>
            {items.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)

              return (
                <div key={item.href}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        'h-11 rounded-xl px-4 text-sm font-medium text-[#C8CED3] hover:bg-white/10 hover:text-white data-[active=true]:bg-[#0073C3] data-[active=true]:text-white [&_svg]:text-[#C8CED3] [&_span]:text-[#C8CED3] hover:[&_svg]:text-white hover:[&_span]:text-white data-[active=true]:[&_svg]:text-white data-[active=true]:[&_span]:text-white',
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigate}
                        className='text-[#C8CED3]'
                      >
                        <Icon className='h-4 w-4' />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {index < items.length - 1 && (
                    <Separator className='my-3 h-px bg-white/10' />
                  )}
                </div>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className='border-t border-white/10 bg-[#071B2E] p-4'>
        <Button
          type='button'
          variant='ghost'
          className='w-full cursor-pointer justify-start border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white'
          onClick={() => void logout()}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
