'use client'
import useAuth from '@/hooks/useAuth'

const LoginButton = () => {
  const { signInWithGithub, error } = useAuth()

  return (
    <div>
      <button onClick={signInWithGithub}>Githubでサインインする</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginButton
