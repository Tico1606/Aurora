<h1 align="center">
  Aurora
</h1>

<div align="center">
    <img alt="Made by Tico1606" src="https://img.shields.io/badge/made%20by-Tico1606-blueviolet">
    <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/Tico1606/Ai-Solutions">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Tico1606/Ai-Solutions">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Tico1606/Ai-Solutions?style=social">
</div>

## 🖥️ Sobre

**Aurora** é uma plataforma web de gestão de clientes, desenvolvida para o desafio técnico da AI Solutions. Ela centraliza autenticação, um dashboard administrativo, CRUD completo de clientes e configurações de conta em uma experiência única, com controle de acesso por papel (`admin` / `client`).

O objetivo do projeto foi praticar uma aplicação full-stack completa em **Next.js**, usando **Supabase** para autenticação e persistência, e **Resend** para e-mails transacionais (confirmação de cadastro e redefinição de senha).

---

## ✨ Funcionalidades

- [x] Home pública com apresentação da plataforma
- [x] Login e logout com sessão via `Supabase Auth`
- [x] Cadastro de conta com confirmação por email (token próprio)
- [x] Recuperação de senha com rate limit e token próprio
- [x] Dashboard privado com indicadores administrativos
- [x] Gestão administrativa de clientes (criar, listar, editar, excluir)
- [x] Perfil do usuário logado (editar dados e trocar senha)
- [x] Controle de acesso por papel (`admin` vê tudo, `client` só vê o próprio perfil)

---

## ⚙️ Arquitetura

### 🛠️ Tecnologias e ferramentas

Este projeto foi desenvolvido usando:

- **[Next.js](https://nextjs.org/)** (App Router) como framework full-stack
- **[React](https://react.dev/)** e **[TypeScript](https://www.typescriptlang.org/)** para a UI com tipagem segura
- **[Tailwind CSS](https://tailwindcss.com/)** + **[shadcn](https://ui.shadcn.com/)** para o design system
- **[Zod](https://zod.dev/)** para validação de variáveis de ambiente
- **[Supabase](https://supabase.com/)** (`Auth` + `Postgres`) como backend gerenciado
- **[Resend](https://resend.com/)** para envio de e-mails transacionais
- **[Vitest](https://vitest.dev/)**, Testing Library e `jsdom` para os testes
- **[Biome](https://biomejs.dev/)** para formatação e lint

> Para mais detalhes sobre a arquitetura, decisões e convenções, veja [`documentation/architecture.md`](documentation/architecture.md).
> Para dependências e versões exatas, veja o [`package.json`](package.json).

---

## 🚀 Como rodar a aplicação

### 🔧 Pré-requisitos

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)
- Um projeto no [Supabase](https://supabase.com/) (URL + chaves de API)
- Uma conta no [Resend](https://resend.com/) (para envio de e-mails)

### 📟 Rodando o projeto

```bash
# Clone este repositório
git clone https://github.com/Tico1606/Ai-Solutions.git

# Entre na pasta do projeto
cd Ai-Solutions

# Instale as dependências
bun install

# Copie o .env de exemplo e preencha com suas credenciais
cp .env.example .env

# Aplique as migrations no seu projeto Supabase
bun run migrate

# (Opcional) Popule o banco com usuários de teste
bun run seed

# Rode a aplicação em modo de desenvolvimento
bun run dev
```

A aplicação sobe em `http://localhost:3000`.

---

## 🔑 Variáveis de Ambiente

Preencha o `.env` com base no [`.env.example`](.env.example):

| Variável | Descrição |
| --- | --- |
| `NODE_ENV` | Ambiente de execução (`development`, `test` ou `production`) |
| `PORT` | Porta local do servidor Next.js |
| `NEXT_PUBLIC_APP_URL` | URL pública da aplicação (usada nos links de email) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública (anon) do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de service role do Supabase (uso server-side) |
| `RESEND_API_KEY` | Chave de API do Resend |
| `RESEND_FROM_EMAIL` | Email remetente usado nos disparos transacionais |

---

## 🧪 Comandos

```bash
bun run dev            # sobe o servidor de desenvolvimento
bun run build          # gera o build de produção
bun run start          # roda o build de produção

bun run typecheck      # checa os tipos com tsc
bun run test           # roda a suíte de testes (Vitest)
bun run test:coverage  # roda os testes com cobertura

bun run migrate        # aplica as migrations no Supabase
bun run seed:auth      # popula apenas os usuários de teste no Supabase Auth
bun run seed           # aplica migrations + seed de usuários de teste
bun run reset          # reseta o banco e reaplica o seed de auth
```

---

## 📁 Estrutura

```txt
src/
  app/          # rotas e layouts (App Router)
  ui/           # page views, componentes e design system (shadcn)
  server/       # server actions e leitura de usuário autenticado
  lib/          # auth (tokens, email, rate limit) e clients Supabase
  constants/    # rotas, env privado e público
  types/        # tipos compartilhados
supabase/
  migrations/   # schema SQL versionado
scripts/
  seed-auth.ts  # script de seed de usuários de teste
documentation/
  architecture.md                        # decisões arquiteturais
  POP-Desafio-Tecnico-Candidatos.pdf      # desafio técnico oficial
```
