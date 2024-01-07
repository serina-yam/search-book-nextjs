import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/authProvider'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      if (!session && !loading) {
        router.push('/login')
        return
      }
    })()
  }, [loading, router, session])
  return <>{session && children}</>
}

export default ProtectedRoute
