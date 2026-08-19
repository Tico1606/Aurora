'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { ROUTES } from '@/constants/routes'
import { AppSidebar } from '@/ui/global/widgets/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/ui/shadcn/components/sidebar'

const PAGE_TITLES: Record<string, string> = {
  [ROUTES.private.dashboard]: 'Dashboard',
  [ROUTES.private.customers]: 'Clientes',
  [ROUTES.private.profile]: 'Perfil',
}

export function PrivateLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const pageTitle = PAGE_TITLES[pathname] ?? 'Painel'

  return (
    <SidebarProvider
      allowDesktopToggle={false}
      style={
        {
          '--sidebar-width': '17rem',
        } as React.CSSProperties
      }
    >
      <div className='flex min-h-screen w-full bg-[#071B2E]'>
        <AppSidebar />

        <SidebarInset className='flex flex-1 flex-col bg-background'>
          <header className='flex h-16 items-center gap-3 border-b border-white/10 bg-[#071B2E] px-4 text-white md:px-6'>
            <SidebarTrigger className='cursor-pointer text-white hover:bg-white/10 hover:text-white md:hidden' />
            <div className='text-base font-medium'>{pageTitle}</div>
          </header>

          <main
            key={pathname}
            className='animate-page-slide-down flex-1 overflow-y-auto p-4 md:p-6'
          >
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
