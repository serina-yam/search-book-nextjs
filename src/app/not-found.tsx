'use client'

import Image from 'next/image'
import Link from 'next/link'
import NotFoundImagePath from '../../public/images/books404.svg'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'

export default function NotFound() {
  return (
    <Layout>
      <NavigationBar />
      <main>
        <div className={utilStyles.headingMd}>
          <div className={`${utilStyles.container} flex flex-col items-center`}>
            <div className="flex flex-col text-center">
              <div className="flex flex-auto shrink-0 flex-col flex-nowrap items-center">
                <div>
                  <h2 className="text-6xl">Not Found</h2>
                  <p>
                    お探しのページはURLが間違っているか、
                    <br />
                    削除された可能性があります。
                  </p>
                </div>
                <Image src={NotFoundImagePath} alt="Not Found Image" width={270} className="mt-6" />
              </div>
            </div>
            <Link href="/" className="mt-6">
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
