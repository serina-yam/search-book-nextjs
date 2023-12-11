'use client'
import Image from 'next/image'
import Link from 'next/link'
import ServerErrorImagePath from '../../public/images/books500.svg'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Layout>
      <NavigationBar />
      <main>
        <div className={utilStyles.headingMd}>
          <div className={`${utilStyles.container} flex flex-col items-center`} >
              <div className="flex flex-col text-center">
                <div className="flex flex-auto shrink-0 flex-col flex-nowrap items-center">
                  <div>
                    <h2 className="text-6xl">Server Error</h2>
                    <div>
                      <p>サーバーエラーが発生しました。</p>
                      <p>サーバーの問題でお探しのページを表示できません。</p>
                      <p>恐れ入りますが再度時間を置いてアクセスしてください。</p>
                    </div>
                  </div>
                  <Image src={ServerErrorImagePath} alt="Server Error Image" width={270} className='mt-6'/>
                </div>
              </div>
              <button className='cursor-pointer' onClick={() => reset()}>Try again</button>
              <Link href="/" className='mt-6'>ホームに戻る</Link>
            </div>
        </div>
      </main>
    </Layout>
  )
}
