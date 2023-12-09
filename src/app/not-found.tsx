'use client'

import Image from 'next/image'
import Link from 'next/link'
import NotFoundImagePath from '../../public/images/books404.svg'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'


// TODO エラー画面デザインする
export default function NotFound() {
  return (
    <Layout>
      <NavigationBar />
      <main>
        <div className={utilStyles.headingMd}>
          <div className={`${utilStyles.container} flex flex-col items-center`} >
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              <div className="flex flex-auto shrink-0 flex-col flex-nowrap pr-0 pt-0 sm:pr-12 sm:pt-4">
                <h2 className="text-6xl">Not Found</h2>
                <div>
                  <p>お探しのページが見つかりません。</p>
                  <p>Could not find requested resource</p>
                </div>
              </div>
              <Image src={NotFoundImagePath} alt="Not Found Image" width={270} className='mt-6'/>
            </div>
            <Link href="/" className='mt-6'>ホームに戻る</Link>
          </div>
        </div>
        
      </main>
    </Layout>
  )
}
