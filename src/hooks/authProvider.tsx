'use client'

import { Session } from '@supabase/supabase-js'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import supabase from '@/lib/supabase'
import BookInfo from '@/types/bookInfo'

type AuthContextType = {
  session: Session | null
  error: string
  loading: boolean
  setLoading: any
  login: ({ email, password }: { email: string; password: string }) => Promise<void>
  // signup: ({ displayName, email, password }: { displayName: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  profileFromSession: {
    id: string
    fullName: string
    userName: string
    avatarUrl: string
  }
  signInWithGithub: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  searchWord: string
  setSearchWord: (word: string) => void
  result: BookInfo[]
  setResult: (result: BookInfo[]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth

  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [searchWord, setSearchWord] = useState<string>('')
  const [result, setResult] = useState<BookInfo[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const {
        data: { session },
      } = await auth.getSession()
      if (mounted) {
        if (session) {
          setSession(session)
        }
        setLoading(false)
      }
    })()
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (_event === 'SIGNED_OUT') {
        setSession(null)
      }
    })
    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [auth])

  const login = async ({ email, password }: { email: string; password: string }) => {
    
    try {
      const { error } = await auth.signInWithPassword({ email: email, password: password })
      if (error) {
        setError(error.message)
      }
    } catch (error) {
      console.error('ログインに失敗しました。', error)
    }
  }

  // const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    
  //   try {
  //     const { error } = await auth.addUsers({ name: name, email: email, password: password })
  //     if (error) {
  //       setError(error.message)
  //     }
  //   } catch (error) {
  //     console.error('登録に失敗しました。', error)
  //   }
  // }

  const logout = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) {
        setError(error.message)
      }
    } catch (error) {
      console.error('ログアウトに失敗しました。', error)
    }
  }

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
      if (error) {
        setError(error.message)
      }
    } catch (error) {
      console.error('GitHubとの連携に失敗しました。', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) {
        setError(error.message)
      }
    } catch (error) {
      console.error('Googleとの連携に失敗しました。', error)
    }
  }

  const profileFromSession = session
    ? {
        id: session?.user?.user_metadata.provider_id || 0,
        fullName: session?.user?.user_metadata.full_name || '',
        userName: session?.user?.user_metadata.user_name || '',
        avatarUrl: session?.user?.user_metadata.avatar_url || '',
      }
    : {
        id: 0,
        fullName: '',
        userName: '',
        avatarUrl: '',
      }

  const contextValue: AuthContextType = {
    session,
    loading,
    setLoading,
    // signup,
    login,
    logout,
    error,
    profileFromSession,
    signInWithGithub,
    signInWithGoogle,
    searchWord,
    setSearchWord,
    result,
    setResult,
  }

  return <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
