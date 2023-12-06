'use client'
import { Button } from '@nextui-org/react'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/hooks/authProvider'

const LoginButton = () => {
  const contextValue = useAuth()
  const signInWithGithub = contextValue?.signInWithGithub
  const error = contextValue?.error

  return (
    <div>
      <Button onClick={signInWithGithub} color="primary" variant="bordered" startContent={<LogIn />}>
        Login with GitHub
      </Button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginButton
