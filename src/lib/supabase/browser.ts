'use client'

import { createBrowserClient } from '@supabase/ssr'
import { publicEnv } from '@/constants/public-env'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createSupabaseBrowserClient() {
  if (!client) {
    client = createBrowserClient(
      publicEnv.NEXT_PUBLIC_SUPABASE_URL,
      publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    )
  }

  return client
}
