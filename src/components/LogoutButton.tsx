'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/supabase'


const LogoutButton = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  // const supabase = () => client;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error
    }
    // location.reload()
  }
  return <button onClick={handleSignOut}>ログアウト</button>
}

export default LogoutButton;
