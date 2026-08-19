'use client'

import {
  ArrowUpRight,
  Home as HomeIcon,
  LayoutDashboard,
  ListChecks,
  LogIn,
  Settings,
  Sparkles,
  UserCog,
  UserPlus,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { BrandMark } from '@/ui/global/widgets/components/brand-mark'
import { Badge } from '@/ui/shadcn/components/badge'
import { Button } from '@/ui/shadcn/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import { Separator } from '@/ui/shadcn/components/separator'

const languageOptions = [{ label: 'PT' }, { label: 'EN' }] as const

const pageCopy = {
  PT: {
    header: {
      login: 'Login',
      loginHref: '/login',
      nav: [
        { label: 'Recursos', href: '#servicos' },
        { label: 'Dashboard', href: '#area-exclusiva-do-cliente' },
      ],
    },
    hero: {
      badge: 'Plataforma web com Supabase',
      title: 'Gestão de clientes simples, segura e pronta para evoluir.',
      description:
        'A Aurora centraliza login, dashboard, cadastro de clientes e configurações de conta em uma experiência direta para operações pequenas e médias.',
      differentiators: [
        'Autenticação por email e senha para proteger a área interna.',
        'CRUD completo de clientes com nome, contato, status e data de cadastro.',
        'Configurações para o usuário logado editar nome, email e senha.',
      ],
    },
    workflowCard: {
      badge: 'Fluxo principal',
      eyebrow: 'Home -> Login -> Dashboard',
      title: 'Tudo organizado no caminho esperado do desafio técnico.',
      description:
        'O usuário conhece a plataforma, entra com credenciais e acessa as ferramentas privadas de gestão.',
      steps: [
        {
          title: 'Entrar',
          description: 'Autenticação com Supabase Auth usando email e senha.',
        },
        {
          title: 'Gerenciar clientes',
          description: 'Cadastrar, listar, editar e excluir clientes no dashboard.',
        },
        {
          title: 'Atualizar conta',
          description: 'Editar nome, email e senha na tela de configurações.',
        },
      ],
    },
    servicesSection: {
      badge: 'Recursos essenciais',
      title: 'O mínimo completo para uma plataforma funcional de gestão.',
      description:
        'A interface prioriza clareza, estados simples e operações reais conectadas ao banco Supabase.',
      items: [
        {
          title: 'Home pública',
          description:
            'Apresentação breve do sistema com chamada para acessar a área de login.',
        },
        {
          title: 'Login seguro',
          description:
            'Entrada e saída de usuários com sessão protegida por Supabase Auth.',
        },
        {
          title: 'Dashboard privado',
          description: 'Área visível somente para usuários autenticados.',
        },
        {
          title: 'Cadastro de clientes',
          description:
            'Formulário para criar clientes com dados essenciais de contato e status.',
        },
        {
          title: 'Lista e edição',
          description: 'Tabela com a base cadastrada, ações de edição e exclusão.',
        },
        {
          title: 'Configurações',
          description: 'Tela para o usuário logado manter os próprios dados atualizados.',
        },
      ],
    },
    clientArea: {
      badge: 'Área exclusiva',
      title: 'Dashboard focado no que o desafio pede.',
      description:
        'A área privada concentra indicadores simples, gestão de clientes e configurações da conta.',
      items: [
        {
          title: 'Clientes em um só lugar',
          description:
            'Visualize contatos, acompanhe status e mantenha o cadastro organizado.',
        },
        {
          title: 'Operações diretas',
          description: 'Ações de criar, editar e excluir sem camadas desnecessárias.',
        },
        {
          title: 'Conta atualizada',
          description:
            'Dados do usuário logado ficam acessíveis na tela de configurações.',
        },
      ],
    },
    quote: {
      badges: ['Autenticação', 'Clientes', 'Configurações'],
      text: '"A Aurora foi desenhada para demonstrar um fluxo completo: acesso seguro, dados persistidos e operações reais de gestão."',
      author: 'Aurora',
      role: 'Desafio Técnico',
    },
    footer: {
      description:
        'Plataforma web para login, dashboard, CRUD de clientes e configurações de usuário.',
      precision: 'Funcionalidade real, escopo claro e base pronta para evoluir.',
      columns: [
        {
          title: 'Produto',
          links: [
            { label: 'Recursos', href: '#servicos' },
            { label: 'Dashboard', href: '#area-exclusiva-do-cliente' },
            { label: 'Login', href: '/login' },
          ],
        },
        {
          title: 'Desafio',
          links: [
            { label: 'Supabase Auth', href: 'https://supabase.com/auth' },
            { label: 'Cloudflare Pages', href: 'https://pages.cloudflare.com/' },
            { label: 'Next.js', href: 'https://nextjs.org/' },
          ],
        },
        {
          title: 'Redes sociais',
          links: [
            { label: 'GitHub', href: 'https://github.com/' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
            { label: 'Site', href: '/' },
          ],
        },
      ],
      copyright: '© 2026 Aurora. Gestão de clientes com simplicidade.',
    },
  },
  EN: {
    header: {
      login: 'Login',
      loginHref: '/login',
      nav: [
        { label: 'Features', href: '#servicos' },
        { label: 'Dashboard', href: '#area-exclusiva-do-cliente' },
      ],
    },
    hero: {
      badge: 'Web platform with Supabase',
      title: 'Simple and secure customer management ready to evolve.',
      description:
        'Aurora centralizes login, dashboard, customer records and account settings in a direct experience for small and medium operations.',
      differentiators: [
        'Email and password authentication to protect the private area.',
        'Complete customer CRUD with name, contact, status and creation date.',
        'Settings for the signed-in user to edit name, email and password.',
      ],
    },
    workflowCard: {
      badge: 'Main flow',
      eyebrow: 'Home -> Login -> Dashboard',
      title: 'Everything organized around the technical challenge flow.',
      description:
        'Users understand the platform, sign in with credentials and access private management tools.',
      steps: [
        {
          title: 'Sign in',
          description: 'Authentication with Supabase Auth using email and password.',
        },
        {
          title: 'Manage customers',
          description: 'Create, list, edit and delete customers in the dashboard.',
        },
        {
          title: 'Update account',
          description: 'Edit name, email and password in the settings screen.',
        },
      ],
    },
    servicesSection: {
      badge: 'Essential features',
      title: 'The complete minimum for a functional management platform.',
      description:
        'The interface prioritizes clarity, simple states and real operations connected to Supabase.',
      items: [
        {
          title: 'Public home',
          description: 'Brief system presentation with a call to access the login area.',
        },
        {
          title: 'Secure login',
          description: 'User sign-in and sign-out with Supabase Auth sessions.',
        },
        {
          title: 'Private dashboard',
          description: 'Area visible only to authenticated users.',
        },
        {
          title: 'Customer registration',
          description: 'Form to create customers with essential contact and status data.',
        },
        {
          title: 'List and edit',
          description: 'Table with customer records, edit actions and deletion.',
        },
        {
          title: 'Settings',
          description: 'Screen for the signed-in user to keep account data updated.',
        },
      ],
    },
    clientArea: {
      badge: 'Private area',
      title: 'Dashboard focused on what the challenge requires.',
      description:
        'The private area concentrates simple indicators, customer management and account settings.',
      items: [
        {
          title: 'Customers in one place',
          description: 'View contacts, track status and keep records organized.',
        },
        {
          title: 'Direct operations',
          description: 'Create, edit and delete without unnecessary layers.',
        },
        {
          title: 'Updated account',
          description: 'Signed-in user data is available in the settings screen.',
        },
      ],
    },
    quote: {
      badges: ['Authentication', 'Customers', 'Settings'],
      text: '"Aurora was designed to demonstrate a complete flow: secure access, persisted data and real management operations."',
      author: 'Aurora',
      role: 'Technical Challenge',
    },
    footer: {
      description: 'Web platform for login, dashboard, customer CRUD and user settings.',
      precision: 'Real functionality, clear scope and a base ready to evolve.',
      columns: [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '#servicos' },
            { label: 'Dashboard', href: '#area-exclusiva-do-cliente' },
            { label: 'Login', href: '/login' },
          ],
        },
        {
          title: 'Challenge',
          links: [
            { label: 'Supabase Auth', href: 'https://supabase.com/auth' },
            { label: 'Cloudflare Pages', href: 'https://pages.cloudflare.com/' },
            { label: 'Next.js', href: 'https://nextjs.org/' },
          ],
        },
        {
          title: 'Social media',
          links: [
            { label: 'GitHub', href: 'https://github.com/' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
            { label: 'Website', href: '/' },
          ],
        },
      ],
      copyright: '© 2026 Aurora. Simple customer management.',
    },
  },
} as const

const serviceIcons = [
  HomeIcon,
  Users,
  LayoutDashboard,
  UserPlus,
  ListChecks,
  Settings,
] as const
const workflowIcons = [LogIn, Users, UserCog] as const

export const HomePageView = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<(typeof languageOptions)[number]['label']>('PT')

  const copy = pageCopy[selectedLanguage]

  return (
    <main
      className='min-h-screen overflow-x-hidden text-white'
      style={{
        background: 'linear-gradient(180deg, #0D2F4B 0%, #0A273F 50%, #071B2E 100%)',
      }}
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-168 bg-[radial-gradient(circle_at_top_left,rgba(0,115,195,0.22),transparent_24%),radial-gradient(circle_at_85%_10%,rgba(245,164,56,0.14),transparent_22%)]' />

      <header className='animate-page-slide-down sticky top-0 z-40 border-b border-white/10 bg-[#071B2E]/85 backdrop-blur-xl'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4'>
          <Link href='/' className='flex items-center gap-3'>
            <BrandMark className='size-9' />
            <span className='text-lg font-semibold tracking-[0.14em] text-white'>
              AURORA
            </span>
          </Link>

          <nav className='hidden items-center gap-6 text-sm text-[#C8CED3] md:flex'>
            {copy.header.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='transition hover:text-white'
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <Button
              asChild
              className='bg-[#0073C3] text-white hover:brightness-110 active:brightness-95 px-3'
              size='sm'
            >
              <Link href={copy.header.loginHref}>{copy.header.login}</Link>
            </Button>

            <div className='inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 p-1'>
              {languageOptions.map(({ label }) => {
                const isActive = label === selectedLanguage

                return (
                  <button
                    key={label}
                    type='button'
                    onClick={() => setSelectedLanguage(label)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition sm:text-sm cursor-pointer ${
                      isActive
                        ? 'bg-[#0073C3] text-white shadow-sm'
                        : 'text-[#C8CED3] hover:text-white'
                    }`}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      <div className='relative animate-page-slide-down-delayed'>
        <div className='mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div className='space-y-12'>
            <Badge
              variant='outline'
              className='border-[#0073C3]/40 bg-[#0073C3]/15 px-3 py-1 text-[#4FB4F2]'
            >
              {copy.hero.badge}
            </Badge>

            <div className='space-y-5'>
              <h1 className='max-w-3xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl'>
                {copy.hero.title}
              </h1>
              <p className='max-w-2xl text-base leading-7 text-[#C8CED3] sm:text-lg'>
                {copy.hero.description}
              </p>
            </div>

            <div id='diferenciais' className='grid gap-3 sm:grid-cols-3'>
              {copy.hero.differentiators.map((item) => (
                <div
                  key={item}
                  className='rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-[#C8CED3] shadow-sm backdrop-blur'
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className='border border-white/10 bg-[#0A273F]/80 text-white shadow-xl shadow-black/30 backdrop-blur'>
            <CardHeader className='gap-4'>
              <div className='flex items-center justify-between gap-3'>
                <Badge className='bg-[#F5A438]/15 text-[#F5A438] hover:bg-[#F5A438]/15'>
                  {copy.workflowCard.badge}
                </Badge>
                <span className='text-xs uppercase tracking-[0.28em] text-[#C8CED3]/70'>
                  {copy.workflowCard.eyebrow}
                </span>
              </div>
              <CardTitle className='text-2xl text-white'>
                {copy.workflowCard.title}
              </CardTitle>
              <CardDescription className='text-base leading-7 text-[#C8CED3]'>
                {copy.workflowCard.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5'>
              {copy.workflowCard.steps.map(({ title, description }, index) => {
                const Icon = workflowIcons[index]

                return (
                  <div key={title} className='space-y-5'>
                    <div className='flex gap-4'>
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border text-white ${
                          index % 2 === 0
                            ? 'border-[#0073C3]/30 bg-[#0073C3]'
                            : 'border-[#F5A438]/30 bg-[#F5A438]'
                        }`}
                      >
                        <Icon className='size-5' />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#C8CED3]/70'>
                          {selectedLanguage === 'PT' ? 'Etapa' : 'Step'} {index + 1}
                        </p>
                        <p className='text-lg font-medium text-white'>{title}</p>
                        <p className='text-sm leading-6 text-[#C8CED3]'>{description}</p>
                      </div>
                    </div>
                    {index < copy.workflowCard.steps.length - 1 ? (
                      <Separator className='bg-white/10' />
                    ) : null}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div id='servicos' className='-scroll-mt-18 bg-[#071B2E] py-8 md:py-14'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mb-10 flex max-w-3xl flex-col gap-4'>
            <Badge
              variant='outline'
              className='w-fit border-[#0073C3]/40 bg-[#0073C3]/15 px-3 py-1 text-[#4FB4F2]'
            >
              {copy.servicesSection.badge}
            </Badge>
            <h2 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
              {copy.servicesSection.title}
            </h2>
            <p className='text-base leading-7 text-[#C8CED3]'>
              {copy.servicesSection.description}
            </p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {copy.servicesSection.items.map(({ title, description }, index) => {
              const Icon = serviceIcons[index]

              return (
                <Card
                  key={title}
                  className={`border bg-white/5 text-white backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    index % 2 === 0
                      ? 'border-white/10 hover:border-[#0073C3]/40 hover:bg-[#0073C3]/10'
                      : 'border-white/10 hover:border-[#F5A438]/40 hover:bg-[#F5A438]/10'
                  }`}
                >
                  <CardHeader className='gap-4'>
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl border text-white ${
                        index % 2 === 0
                          ? 'border-[#0073C3]/30 bg-[#0073C3]'
                          : 'border-[#F5A438]/30 bg-[#F5A438]'
                      }`}
                    >
                      <Icon className='size-5' />
                    </div>
                    <div className='space-y-2'>
                      <CardTitle className='text-xl text-white'>{title}</CardTitle>
                      <CardDescription className='text-sm leading-6 text-[#C8CED3]'>
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <div id='area-exclusiva-do-cliente' className='-scroll-mt-18 py-8 md:py-14'>
        <div className='mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.95fr_1.05fr]'>
          <Card className='border border-white/10 bg-[#0A273F]/80 text-white backdrop-blur'>
            <CardHeader className='space-y-4'>
              <Badge
                variant='outline'
                className='w-fit border-[#0073C3]/40 bg-[#0073C3]/15 px-3 py-1 text-[#4FB4F2]'
              >
                {copy.clientArea.badge}
              </Badge>
              <CardTitle className='text-3xl text-white'>
                {copy.clientArea.title}
              </CardTitle>
              <CardDescription className='text-base leading-7 text-[#C8CED3]'>
                {copy.clientArea.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className='grid gap-4 sm:grid-cols-2'>
            <Card className='border border-white/10 bg-[#0073C3]/10 text-white backdrop-blur'>
              <CardHeader>
                <CardTitle className='text-lg text-white'>
                  {copy.clientArea.items[0].title}
                </CardTitle>
                <CardDescription className='leading-6 text-[#C8CED3]'>
                  {copy.clientArea.items[0].description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border border-white/10 bg-[#F5A438]/10 text-white backdrop-blur'>
              <CardHeader>
                <CardTitle className='text-lg text-white'>
                  {copy.clientArea.items[1].title}
                </CardTitle>
                <CardDescription className='leading-6 text-[#C8CED3]'>
                  {copy.clientArea.items[1].description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border border-white/10 bg-white/5 text-white backdrop-blur sm:col-span-2'>
              <CardHeader>
                <CardTitle className='text-lg text-white'>
                  {copy.clientArea.items[2].title}
                </CardTitle>
                <CardDescription className='leading-6 text-[#C8CED3]'>
                  {copy.clientArea.items[2].description}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      <div className='py-8 md:py-16'>
        <div className='mx-auto max-w-7xl px-6'>
          <Card className='border border-white/10 bg-[#0A273F]/60 text-white backdrop-blur'>
            <CardContent className='grid gap-8 pt-6 lg:grid-cols-[1fr_auto] lg:items-end'>
              <div className='space-y-6'>
                <div className='flex flex-wrap gap-3'>
                  {copy.quote.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant='outline'
                      className='w-fit border-[#0073C3]/40 bg-[#0073C3]/15 px-3 py-1 text-[#4FB4F2]'
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <blockquote className='max-w-4xl text-2xl leading-10 font-medium text-balance text-white sm:text-3xl'>
                  {copy.quote.text}
                </blockquote>

                <div>
                  <p className='text-lg font-semibold text-white'>{copy.quote.author}</p>
                  <p className='text-sm text-[#C8CED3]'>{copy.quote.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className='relative overflow-hidden border-t border-white/10 bg-[#050F1C]'>
        <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0073C3]/60 to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_12%_20%,rgba(0,115,195,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(245,164,56,0.14),transparent_18%)]' />

        <div className='mx-auto max-w-7xl px-6 py-14'>
          <div className='grid gap-12 lg:grid-cols-[1.2fr_1.8fr]'>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <BrandMark className='size-12 shrink-0' />

                <div className='space-y-2'>
                  <p className='text-lg font-semibold tracking-[0.22em] text-white'>
                    AURORA
                  </p>
                  <p className='max-w-md text-sm leading-7 text-[#C8CED3] sm:text-base'>
                    {copy.footer.description}
                  </p>
                </div>
              </div>

              <div className='inline-flex items-center gap-3 rounded-full border border-[#F5A438]/25 bg-white/5 px-4 py-2 text-sm text-[#C8CED3] shadow-sm backdrop-blur'>
                <Sparkles className='size-4 text-[#F5A438]' />
                <span>{copy.footer.precision}</span>
              </div>
            </div>

            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {copy.footer.columns.map((column) => (
                <div key={column.title} className='space-y-4'>
                  <p className='text-lg font-semibold text-white'>{column.title}</p>
                  <div className='space-y-3 text-sm text-[#C8CED3]'>
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className='group flex w-fit items-center gap-2 transition hover:text-white'
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className='size-3.5 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100' />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#C8CED3]/80 md:flex-row md:items-center md:justify-between'>
            <p>{copy.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
