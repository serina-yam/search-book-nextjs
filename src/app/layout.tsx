'use client'

import '../styles/global.css'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import styles from '@/app/layout.module.css'
import LogoutButton from '@/components/LogoutButton'
import supabase from '@/lib/supabase'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null) // ログイン状態を管理
  // const [error, setError] = useState('') // エラー状況を管理

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })

    // リスナーの解除
    return () => authData.subscription.unsubscribe()
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            'search books!'
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
      </head>
      <body className={styles.container}>
        {children}
      </body>
    </html>
  )
}
