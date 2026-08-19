import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/constants'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, options, value } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Ignorado quando chamado em server components sem permissão de escrita.
          }
        },
      },
    },
  )
}
