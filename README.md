# AI Solutions

Aplicacao web em `Next.js` para o desafio tecnico da AI Solutions.

## Escopo

- Home publica
- Login, logout e dashboard privado
- Cadastro com confirmacao por email
- Recuperacao de senha com rate limit
- Gestao admin de usuarios
- Gestao admin de clientes
- Perfil para o usuario editar nome, email, telefone e senha

## Stack

- `Next.js` App Router
- `React`
- `TypeScript`
- `Tailwind CSS`
- `shadcn`
- `Supabase Auth`
- `Supabase Database`
- `Resend`
- `Vitest`, Testing Library e `jsdom`

## Estrutura

```txt
src/
  app/
  lib/
  server/
  ui/
supabase/
  migrations/
documentation/
  POP-Desafio-Tecnico-Candidatos.pdf
web_example/
  referencia visual e estrutural
```

## Como Rodar

```bash
bun install
bun run dev
```

## Variaveis De Ambiente

Preencha `.env` com base em `.env.example`.

## Comandos

```bash
bun run dev
bun run typecheck
bun run test
bun run build
```
