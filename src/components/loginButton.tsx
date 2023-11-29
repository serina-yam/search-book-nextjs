'use client'
import { Button } from '@nextui-org/react'
import { LogIn } from 'lucide-react'
import useAuth from '@/hooks/useAuth'

const LoginButton = () => {
  const { signInWithGithub, error } = useAuth()

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
