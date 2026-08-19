'use client'

import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/ui/shadcn/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { useResetPasswordPage } from './use-reset-password-page'

export const ResetPasswordPageView = () => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    message,
    error,
    submit,
  } = useResetPasswordPage()

  return (
    <Card className='mx-auto w-full bg-transparent p-4 shadow-none ring-0 scale-102'>
      <CardHeader className='px-0 pb-6'>
        <CardTitle className='text-center text-2xl font-semibold text-white md:text-3xl'>
          Redefinir senha
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 px-0'>
        <div className='space-y-2'>
          <Label htmlFor='new-password' className='text-[#C8CED3]'>
            Nova senha
          </Label>
          <Input
            id='new-password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='confirm-new-password' className='text-[#C8CED3]'>
            Confirmar nova senha
          </Label>
          <Input
            id='confirm-new-password'
            type='password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        {error && (
          <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300'>
            {error}
          </div>
        )}
        {message && (
          <div className='rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300'>
            {message}
          </div>
        )}
        <Button
          type='button'
          className='w-full cursor-pointer'
          disabled={isSubmitting}
          onClick={() => void submit()}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar nova senha'}
        </Button>
      </CardContent>
      <CardFooter className='justify-center px-0 pb-0 pt-6 text-sm text-[#C8CED3]'>
        <Link
          href={ROUTES.auth.login}
          className='font-semibold text-[#4FB4F2] hover:underline'
        >
          Ir para o login
        </Link>
      </CardFooter>
    </Card>
  )
}
