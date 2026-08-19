import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { verifyEmailAction } from '@/server/actions/auth/verify-email-action'
import { BrandMark } from '@/ui/global/widgets/components/brand-mark'
import { Button } from '@/ui/shadcn/components/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/shadcn/components/card'

type Props = {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const token = params.token ?? ''
  const result = token ? await verifyEmailAction(token) : { ok: false, message: 'Link de confirmação inválido.' }

  return (
    <div
      className='flex min-h-screen items-center justify-center px-4 text-white'
      style={{
        background: 'linear-gradient(180deg, #0D2F4B 0%, #0A273F 50%, #071B2E 100%)',
      }}
    >
      <div className='animate-page-slide-down flex w-full max-w-md flex-col items-center'>
        <div className='mb-6 flex items-center justify-center gap-2.5'>
          <BrandMark className='size-8' />
          <span className='text-base font-semibold tracking-[0.14em] text-white'>
            AURORA
          </span>
        </div>

        <Card className='w-full border border-white/10 bg-white/5 text-white shadow-2xl shadow-black/30 backdrop-blur'>
          <CardHeader className='text-center'>
            <CardTitle>{result.ok ? 'Conta ativada' : 'Não foi possível ativar a conta'}</CardTitle>
          </CardHeader>
          <CardContent className='text-center text-sm text-[#C8CED3]'>
            {result.ok ? 'Sua conta foi confirmada com sucesso. Agora você já pode entrar na plataforma.' : result.message}
          </CardContent>
          <CardFooter>
            <Button asChild type='button' className='w-full'>
              <Link href={ROUTES.auth.login}>Ir para o login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
