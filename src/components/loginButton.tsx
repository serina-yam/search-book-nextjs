'use client'

import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/authProvider'

const LoginButton = () => {
  const contextValue = useAuth()
  const error = contextValue?.error

  return (
    <div>
      <Link href={`/login`} className="ml-6 flex">
        <LogIn className="mr-2" />
        Login
      </Link>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginButton
