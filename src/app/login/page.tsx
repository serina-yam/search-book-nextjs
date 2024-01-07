'use client'

import { Button } from '@nextui-org/react'
import { Github, Chrome } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import { useAuth } from '@/hooks/authProvider'

export default function Login() {
  const contextValue = useAuth()
  const signInWithGithub = contextValue?.signInWithGithub
  const signInWithGoogle = contextValue?.signInWithGoogle
  const session = contextValue?.session
  const login = contextValue?.login
  // const signup = contextValue?.signup

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [aud, setAud] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ displayName: String; email: string; password: string }>()

  const router = useRouter()
  if (session) {
    // TODO mypage/[userId]に飛ばす
    // const aud: string | undefined = supabase.auth.getUser().then((a) => a.data.user?.aud)

    // if (aud !== undefined) {
    //   setAud(aud)
    //   router.push('/mypage/' + aud)
    // }
    router.push('/mypage')
  }
  const doLogin = async () => {
    // TODO mypage/[userId]に飛ばす
    await login({ email: email, password: password }).then(() => router.push('/mypage'))
  }

  // const doRegister =  async () => {
  //   await signup({ displayName: displayName,  email: email, password: password }).then(() => router.push('/mypage'))
  // }

  return (
    <Layout>
      <NavigationBar />
      <div className="mt-24 flex justify-center">
        <form className="flex w-1/4 flex-col items-center rounded bg-slate-100 px-8 py-6 shadow-md">
          <h1 className="mb-12 text-xl">Welcom Back!</h1>
          <Button onClick={signInWithGithub}  className="mb-2 rounded-xl bg-zinc-700 px-4 py-2 text-white" startContent={<Github />}>
            Log in with GitHub
          </Button>
          <Button onClick={signInWithGoogle} className="rounded-xl bg-red-500 px-4 py-2 text-white" startContent={<Chrome />}>
            Log in with Google
          </Button>

          {/* <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">表示名</label>
            <input
              {...register('displayName', { required: true })}
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            {errors.displayName && errors.displayName.message}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">メールアドレス</label>
            <input
              {...register('email', { required: true })}
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && errors.email.message}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">パスワード</label>
            <input
              {...register('password', { required: true })}
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && errors.password.message}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
            >
              戻る
            </Button>
            <Button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              onClick={()=>{
                doLogin()
              }}
            >
              送信
            </Button>
          </div>
          <div className="mt-4 flex justify-end text-blue-700">
            <Button
                style={{ width: 220 }}
                // 登録ボタンがクリックされたとき関数が実行されるようにする
                onClick={()=>{
                  doRegister()
                }}
              >
              登録
            </Button>
          </div> */}
        </form>
      </div>
    </Layout>
  )
}
