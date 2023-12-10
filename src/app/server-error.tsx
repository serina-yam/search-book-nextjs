'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServerErrorImagePath from '../../public/images/books500.svg'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'


// TODO エラー画面デザインする
export default function ServerError() {
  return (
    <Layout>
      <NavigationBar />
      <main>
        <div className={utilStyles.headingMd}>
          <div className={`${utilStyles.container} flex flex-col items-center`} >
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              <div className="flex flex-auto shrink-0 flex-col flex-nowrap pr-0 pt-0 sm:pr-12 sm:pt-4">
                <h2 className="text-6xl">Server Error</h2>
                <div>
                  <p>サーバーエラーが発生しました。</p>
                  <p>サーバーの問題でお探しのページを表示できません。</p>
                  <p>恐れ入りますが再度時間を置いてアクセスしてください。</p>
                </div>
              </div>
              <Image src={ServerErrorImagePath} alt="Server Error Image" width={270} className='mt-6'/>
            </div>
            <Link href="/" className='mt-6'>ホームに戻る</Link>
          </div>
        </div>
        
      </main>
    </Layout>
  )
}
