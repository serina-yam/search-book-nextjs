'use client'

import '../styles/global.css'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import styles from '@/app/layout.module.css'
import supabase from '@/lib/supabase'

export default function Layout({ children }: { children: React.ReactNode }) {
  // const [session, setSession] = useState<Session | null>(null) // ログイン状態を管理

  // useEffect(() => {
  //   // ログイン状態の変化を監視
  //   const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {setSession(session)})

  //   // リスナーの解除
  //   return () => authData.subscription.unsubscribe()
  // }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Let's search for books" />
      </head>
      <body className={styles.container}>{children}</body>
    </html>
  )
}
