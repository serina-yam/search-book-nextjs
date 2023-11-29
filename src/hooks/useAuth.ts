import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import { addAccount } from '@/lib/supabaseFunctions'

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null) // ログイン状態を管理
  const [error, setError] = useState('') // エラー状況を管理

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
      addAccount(session?.user?.user_metadata.provider_id, session?.user?.user_metadata.full_name)
    })

    // リスナーの解除
    return () => authData.subscription.unsubscribe()
  }, [])

  // GitHubでサインイン
  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
      if (error) {
        setError(error.message)
        return
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === 'string') {
        setError(error)
      } else {
        console.error('GitHubとの連携に失敗しました。')
      }
    }
  }

  // ログインユーザーのプロフィール取得: GitHub
  const profileFromGithub: {
    id: number
    fullName: string
    userName: string
    avatarUrl: string
  } = {
    id: session?.user?.user_metadata.provider_id,
    fullName: session?.user?.user_metadata.full_name,
    userName: session?.user?.user_metadata.user_name,
    avatarUrl: session?.user?.user_metadata.avatar_url,
  }

  // サインアウト
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    session,
    error,
    profileFromGithub,
    signInWithGithub,
    signOut,
  }
}

export default useAuth
