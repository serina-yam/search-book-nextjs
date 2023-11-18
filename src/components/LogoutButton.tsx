'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase'


const LogoutButton = () => {
  const supabase = createClientComponentClient<Database>();
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
