'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/ui/shadcn/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { useLoginPage } from './use-login-page'

export const LoginPageView = () => {
  const {
    email,
    formErrors,
    handleSubmit,
    isPasswordVisible,
    isSubmitting,
    password,
    setEmail,
    setFormErrors,
    setIsPasswordVisible,
    setPassword,
  } = useLoginPage()

  return (
    <Card className='mx-auto w-full ring-0 p-4 scale-102 bg-transparent shadow-none'>
      <CardHeader className='px-0 pb-6'>
        <CardTitle className='text-center text-2xl font-semibold text-white md:text-3xl'>
          Login
        </CardTitle>
      </CardHeader>

      <CardContent className='px-0'>
        <form className='flex flex-col gap-4 md:gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6'>
            {formErrors.form && (
              <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300'>
                {formErrors.form}
              </div>
            )}

            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='email'
                className='text-sm font-medium text-[#C8CED3] md:text-base'
              >
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                className='h-11 rounded-xl'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)

                  if (formErrors.email) {
                    setFormErrors((current) => ({
                      ...current,
                      email: undefined,
                    }))
                  }
                }}
              />
              {formErrors.email && (
                <span className='text-sm text-rose-400'>{formErrors.email}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='password'
                className='text-sm font-medium text-[#C8CED3] md:text-base'
              >
                Senha
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Senha'
                  className='h-11 rounded-xl pr-12'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)

                    if (formErrors.password) {
                      setFormErrors((current) => ({
                        ...current,
                        password: undefined,
                      }))
                    }
                  }}
                />
                <button
                  type='button'
                  onClick={() => setIsPasswordVisible((current) => !current)}
                  aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={isPasswordVisible}
                  className='absolute right-2 top-1/2 -translate-y-1/2 rounded px-1 text-[#C8CED3] transition hover:text-[#0073C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0073C3]/30 cursor-pointer'
                >
                  {isPasswordVisible ? (
                    <Eye className='h-4 w-4' />
                  ) : (
                    <EyeOff className='h-4 w-4' />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <span className='text-sm text-rose-400'>{formErrors.password}</span>
              )}
            </div>
          </div>

          <Button
            type='submit'
            className='h-11 w-full cursor-pointer rounded-xl font-semibold'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className='flex flex-col gap-3 text-center text-sm text-[#C8CED3]'>
            <Link
              href={ROUTES.auth.forgotPassword}
              className='font-medium text-[#4FB4F2] hover:underline'
            >
              Esqueci minha senha
            </Link>
            <p>
              Ainda nao tem conta?{' '}
              <Link
                href={ROUTES.auth.register}
                className='font-semibold text-[#4FB4F2] hover:underline'
              >
                Criar conta
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
