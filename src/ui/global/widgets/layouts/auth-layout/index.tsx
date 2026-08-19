'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { ROUTES } from '@/constants/routes'
import { BrandMark } from '@/ui/global/widgets/components/brand-mark'
import { Button } from '@/ui/shadcn/components/button'

export function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const shouldShowBackButton = pathname === ROUTES.auth.login

  return (
    <div
      className='relative flex min-h-screen w-full items-center justify-center overflow-y-auto px-4 py-6 text-white'
      style={{
        background: 'linear-gradient(180deg, #0D2F4B 0%, #0A273F 50%, #071B2E 100%)',
      }}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,115,195,0.22),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(245,164,56,0.14),transparent_18%)]' />

      {shouldShowBackButton && (
        <Button
          variant='outline'
          size='icon'
          className='absolute left-4 top-4 z-20 h-10 w-10 rounded-full cursor-pointer border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:left-6 sm:top-6'
          aria-label='Voltar para home'
          asChild
        >
          <Link href={ROUTES.public.home}>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </Button>
      )}

      <div
        key={pathname}
        className='animate-page-slide-down relative z-10 flex w-full max-w-md flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/5 px-6 py-6 text-white shadow-2xl shadow-black/30 backdrop-blur sm:px-8'
      >
        <div className='mb-4 flex items-center justify-center gap-2.5'>
          <BrandMark className='size-8' />
          <span className='text-base font-semibold tracking-[0.14em] text-white'>
            AURORA
          </span>
        </div>

        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}
