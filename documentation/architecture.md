# Arquitetura - Aurora

Documento baseline da aplicação `Aurora`. Use este arquivo para registrar decisões que afetam a base como um todo: auth, persistência, contrato das server actions e convenções reutilizáveis.

## Visão Geral

O projeto é uma aplicação única em `Next.js` (App Router), sem separação entre app de frontend e API própria. A camada de servidor vive dentro do mesmo código-base, como **Server Actions**, e conversa diretamente com o `Supabase` (Postgres + Auth) e com o `Resend` (e-mail transacional).

| Camada | Localização | Responsabilidade |
| --- | --- | --- |
| Rotas e Layouts | `src/app` | App Router: páginas, layouts públicos/privados/auth |
| UI | `src/ui` | Page views, componentes de feature, design system (`shadcn`) |
| Server Actions | `src/server/actions` | Regras de negócio server-side por contexto (auth, customers, dashboard, users) |
| Auth/Infra | `src/lib` | Tokens, verificação, rate limit, e-mails, clients Supabase |
| Banco | `supabase/migrations` | Schema Postgres versionado, aplicado via Supabase CLI |

## Fluxos Consolidados

- autenticação por email e senha, com sessão via cookies (`@supabase/ssr`)
- cadastro de conta com confirmação de email por token próprio
- recuperação de senha com rate limit e token próprio
- dashboard privado com indicadores administrativos
- gestão administrativa de clientes (CRUD completo)
- perfil do usuário logado (dados pessoais e senha)

## Referências Técnicas

- `TypeScript`
- `Next.js` (App Router)
- `React`
- `Tailwind CSS` + `shadcn`/`radix-ui`
- `Zod`
- `Supabase` (`Auth` + `Postgres`, via `@supabase/ssr` e `@supabase/supabase-js`)
- `Resend`
- `Vitest`, Testing Library e `jsdom`
- `Biome` (formatação e lint)

## Decisões Arquiteturais Atuais

- **Persistência:** `Supabase Postgres`. Migrations versionadas em `supabase/migrations`, aplicadas com `bunx supabase db push`. A tabela `profiles` guarda `role` (`admin` | `client`) e `status` (`active` | `inactive` | `pending`) além dos dados nativos de auth do Supabase.
- **Autenticação:** `Supabase Auth` gerencia credenciais e sessão (cookies `httpOnly` via `@supabase/ssr`). Confirmação de email e redefinição de senha **não** usam o fluxo de email padrão do Supabase — usam tokens próprios (`email_verification_tokens`, `password_reset_tokens`) com envio via `Resend` (`src/lib/auth/emails.ts`, `verification.ts`, `password-reset.ts`).
- **Autorização:** rotas privadas são protegidas no server component `src/app/(private)/layout.tsx` (redireciona usuário não autenticado para `/login`). Ações administrativas usam `assertAdmin()` (`src/server/actions/utils/assert-admin.ts`). A sidebar (`app-sidebar`) também oculta itens por `role` no client, mas isso é só UX — a checagem que garante segurança é sempre a do server action.
- **Sem `middleware.ts`:** a guarda de autenticação é feita no layout server component, não em Next.js Middleware.
- **Validação:** variáveis de ambiente (públicas e privadas) são validadas com `Zod` (`src/constants/env.ts`, `public-env.ts`) e derrubam o boot se inválidas. Formulários validam campo a campo nos hooks de cada page view (sem schema Zod compartilhado até o momento).
- **Rate limit:** pedidos de verificação/reset de email passam por `src/lib/auth/rate-limit.ts` antes de disparar um novo envio.
- **TDD onde fizer sentido:** testes cobrem contexts, page views e componentes globais reutilizáveis; não é exigido para specs, prompts ou documentação.

## Fluxo Esperado

```txt
User Action
  -> Next.js App Route
  -> Page
  -> Page View
  -> Componentes / Hooks
  -> Server Action ('use server')
  -> Supabase Auth / Postgres, ou Resend (email)
  -> Resposta { ok, message?, body? }
  -> UI feedback (toast, form error, redirect)
```

## Contrato das Server Actions

Toda server action nova deve deixar explícito:

- nome e contexto (`src/server/actions/<contexto>/<nome>-action.ts`)
- auth exigida (usuário autenticado? role admin?)
- input: shape e validação esperada
- resposta de sucesso: `{ ok: true, body?, message? }`
- resposta de erro: `{ ok: false, message }` (sem `throw` para o caller tratar)
- estados de UI impactados (loading, toast de sucesso/erro, redirect)
- efeitos colaterais (email disparado, token gerado, linha criada/atualizada)

## Camadas de Referência

- `src/app`: rotas, layouts e grupos de rota (`(public)`, `(auth)`, `(private)`) do App Router
- `src/ui/<contexto>/pages`: page views por contexto (`home`, `auth`, `dashboard`, `customers`, `profile`)
- `src/ui/global/widgets/layouts`: layouts compartilhados (`root-layout`, `auth-layout`, `private-layout`)
- `src/ui/global/widgets/components`: componentes globais reutilizáveis (`app-sidebar`, `modal`, `dropdown`, `brand-mark`)
- `src/ui/shadcn`: componentes base do design system
- `src/server/actions/<contexto>`: server actions por domínio
- `src/server/auth`: leitura do usuário autenticado (`get-current-user`)
- `src/lib/auth`: tokens, verificação de email, reset de senha, rate limit, templates de email
- `src/lib/supabase`: clients Supabase (`browser`, `server`, `admin`)
- `src/constants`: rotas (`routes.ts`), env privado (`env.ts`) e público (`public-env.ts`)
- `src/types`: tipos compartilhados entre camadas
- `supabase/migrations`: schema SQL versionado

## Convenção de Testes

- todo arquivo `*.test.*` fica dentro de uma pasta `tests/` no mesmo contexto do código testado
- exemplo: `src/ui/auth/pages/login/tests/<nome>.test.tsx`
- outros exemplos reais: `src/ui/auth/contexts/auth-context/tests`, `src/ui/global/widgets/components/modal/tests`, `src/ui/shadcn/components/tests`

## Relação com Documentação

- desafio técnico oficial: `documentation/POP-Desafio-Tecnico-Candidatos.pdf`
- prompts operacionais: `documentation/prompts`
- arquitetura da aplicação: este arquivo (`documentation/architecture.md`)

## Quando Atualizar Este Documento

Atualize este arquivo quando houver:

- mudança estrutural em pastas, camadas ou convenções
- novo padrão de auth, permissão, sessão ou cookies
- nova estratégia de persistência, migration ou integração externa
- mudança no contrato das server actions ou nas respostas de erro/sucesso
- mudança na convenção de testes
